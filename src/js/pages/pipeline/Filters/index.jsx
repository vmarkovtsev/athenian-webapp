import React, { useReducer, useRef, useEffect } from 'react'
import moment from 'moment'

import { useAuth0 } from 'js/context/Auth0'
import { useUserContext } from 'js/context/User'
import { useDataContext } from 'js/context/Data'
import FiltersContext from 'js/context/Filters'

import TopFilter from 'js/components/pipeline/TopFilter'

import MultiSelect from 'js/components/ui/filters/MultiSelect'
import DateInterval, { EOD, YEAR_AGO, TWO_WEEKS_AGO } from 'js/components/ui/filters/DateInterval'

import { getRepos, getContributors, getTeams } from 'js/services/api'
import { dateTime, github } from 'js/services/format'

import { useMountEffect } from 'js/hooks'

import { filterReducer, defaultFilter, mapContribsToTeam } from './filterReducer'
import { setRepos, setTeams, setReady, setDateInterval, setContribs, setSelectedRepos } from './actions'

const allowedDateInterval = {
  from: moment(YEAR_AGO).startOf('day').valueOf(),
  to: moment(EOD).endOf('day').valueOf()
}

const defaultDateInterval = {
  from: moment(TWO_WEEKS_AGO).startOf('day').valueOf(),
  to: moment(EOD).endOf('day').valueOf()
}

export default function Filters({ children }) {
  const { getTokenSilently } = useAuth0()
  const tokenRef = useRef(null)

  const { user: { defaultAccount: { id: accountID, repos: contextRepos }} } = useUserContext()
  const { reset: resetData, setGlobal: setGlobalData } = useDataContext()
  const [filterData, dispatchFilter] = useReducer(
    filterReducer,
    { ...defaultFilter, dateInterval: defaultDateInterval }
  )

  useEffect(() => {
    (async () => {
      tokenRef.current = await getTokenSilently()

      const [repos, contribs, teams] = await Promise.all([
        getReposForFilter(tokenRef.current, accountID, filterData.dateInterval, contextRepos),
        getContribsForFilter(tokenRef.current, accountID, filterData.dateInterval, contextRepos),
        getTeamsForFilter(tokenRef.current, accountID)
      ])

      setGlobalData(
        ['filter.repos', 'filter.contribs', 'filter.teams'],
        [repos, contribs, teams]
      )

      dispatchFilter(setRepos(repos))
      dispatchFilter(setSelectedRepos(repos))

      dispatchFilter(setContribs(contribs))
      dispatchFilter(setTeams(teams))
      dispatchFilter(setReady(true))
    })()
  }, [])

  const onDateIntervalChange = async selectedDateInterval => {
    dispatchFilter(setReady(false))
    resetData()
    
    const updatedRepos = await getReposForFilter(
      tokenRef.current, accountID, selectedDateInterval
    )
    const updatedContribs = await getContribsForFilter(
      tokenRef.current, accountID, selectedDateInterval, updatedRepos
    )

    setGlobalData(
      ['filter.repos', 'filter.contribs'],
      [updatedRepos, updatedContribs]
    )

    dispatchFilter(setDateInterval(selectedDateInterval))

    dispatchFilter(setRepos(updatedRepos))
    dispatchFilter(setContribs(updatedContribs))
    dispatchFilter(setReady(true))
  }

  const onReposApplyChange = async (selectedRepos, dateInterval) => {
    dispatchFilter(setReady(false))
    resetData()
  
    selectedRepos = selectedRepos.length > 0 ? selectedRepos : contextRepos
    dateInterval = dateInterval || filterData.dateInterval
  
    setGlobalData('filter.repos', selectedRepos)
    dispatchFilter(setSelectedRepos(selectedRepos))
  
    const selectedContribs = await getContribsForFilter(
      tokenRef.current, accountID, dateInterval, selectedRepos
    )

    setGlobalData('filter.contribs', selectedContribs)
    dispatchFilter(setReady(true))
  }

  const onContribsChange = async selectedContribs => {
    dispatchFilter(setReady(false))
    resetData()
    
    dispatchFilter(setContribs(selectedContribs))
    setGlobalData(
      ['filter.repos', 'filter.contribs'],
      [filterData.repos.data, selectedContribs]
    )
    dispatchFilter(setReady(true))
  }
  
  const usersLabelFormat = ({ name, login, avatar }) => {
    const gituser = github.userName(login)
    const user = gituser || 'ANONYMOUS'
    return (
      <div className="align-items-center filter-dropdown-option">
        <img src={avatar} alt={name} className="mr-2 filter-dropdown-option-img" /> 
        { name && <span className="filter-dropdown-option-name mr-1">{name}</span> }
        { user && user !== name && <span className="filter-dropdown-option-user filter-dropdown-option-name mr-2">{user}</span> }
      </div>
    )
  }
  const reposLabelFormat = repo => (github.repoName(repo) || 'UNKNOWN')
  const getOptionValueRepos = val => val
  const getOptionValueUsers = val => `${val.name} ${val.login}`

  const reposOptions = [...filterData.repos.data]

  const teamsOptions = mapContribsToTeam(
    filterData.contribs.data,
    filterData.teams.data
  )

  const onSelectRepo = selectedOptions =>
    dispatchFilter(setSelectedRepos(selectedOptions))

  const reposValue = filterData.repos.data.filter(repo =>
    ~filterData.repos.selected.indexOf(repo)
  )

  return (
    <FiltersContext
      ready={filterData.ready}
      repositories={filterData.repos.data}
      contributors={filterData.contribs.data}
      dateInterval={filterData.dateInterval}
    >
      <TopFilter
        reposFilter={
          <MultiSelect
            label="Repositories"
            className="filter"
            name="repositories"
            noDataMsg="There are no repositories for the date interval filter"
            isLoading={filterData.repos.ready}
            getOptionLabel={reposLabelFormat}
            getOptionValue={getOptionValueRepos}
            options={reposOptions}
            onApply={onReposApplyChange}
            onChange={onSelectRepo}
            value={reposValue}
          />
        }
        contribsFilter={
          <MultiSelect
            label="Users"
            className="filter"
            name="users"
            noDataMsg="There are no users for the date interval and repositories filters"
            isLoading={filterData.teams.ready}
            getOptionLabel={usersLabelFormat}
            getOptionValue={getOptionValueUsers}
            options={teamsOptions}
            onApply={onContribsChange}
            value={filterData.teams.data}
          />
        }
        dateIntervalFilter={
          <DateInterval
            minDate={allowedDateInterval.from}
            maxDate={allowedDateInterval.to}
            initialFrom={defaultDateInterval.from}
            initialTo={defaultDateInterval.to}
            onChange={onDateIntervalChange}
          />
        }
      />
      {children}
    </FiltersContext >
  )
}

const getDataForFilter = async (dataName, dataFetcherFn, token, accountID, dateInterval, inRepos = []) => {
  try {
    return await dataFetcherFn(
      token,
      accountID,
      dateTime.ymd(dateInterval.from),
      dateTime.ymd(dateInterval.to),
      inRepos,
    )
  } catch (err) {
    console.error(`could not fetch ${dataName} to filter`, err)
    return []
  }
}

const getReposForFilter = (token, accountID, dateInterval, inRepos) => getDataForFilter(
  'repositories', getRepos, token, accountID, dateInterval, inRepos)

const getContribsForFilter = (token, accountID, dateInterval, inRepos) => getDataForFilter(
  'contributors', getContributors, token, accountID, dateInterval, inRepos)

const getTeamsForFilter = (token, accountID) => getTeams(token, accountID)
