import React, { useReducer, useRef, useCallback, useState } from 'react'
import moment from 'moment'

import { useAuth0 } from 'js/context/Auth0'
import { useUserContext } from 'js/context/User'
import { useDataContext } from 'js/context/Data'
import FiltersContext from 'js/context/Filters'

import TopFilter from 'js/components/pipeline/TopFilter'

import MultiSelect from 'js/components/ui/filters/MultiSelect'
import { usersLabelFormat } from 'js/components/ui/filters/MultiSelect/CustomComponents'
import DateInterval, { EOD, YEAR_AGO, TWO_WEEKS_AGO } from 'js/components/ui/filters/DateInterval'

import { getRepos, getContributors, getTeams, buildApi } from 'js/services/api'
import { dateTime, github } from 'js/services/format'

import { useMountEffect } from 'js/hooks'

import { filterReducer, defaultFilter, mapContribsToTeam } from './filterReducer'
import {
  init,
  setReady,
  setDateInterval,
  setContribs,
  setTeams,
  setSelectedRepos,
  setSelectedContribs,
  setAppliedRepos,
  setAppliedContribs,
  setExcludeInactive,
} from './actions'

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
  const [excludeInactive, setExclude] = useState(true)

  useMountEffect(() => {
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

      dispatchFilter(init({ repos, contribs, teams, ready: true }))
    })()
  })

  const onDateIntervalChange = async selectedDateInterval => {
    dispatchFilter(setReady(false))
    resetData()
    
    const [updatedRepos, updatedTeams] = await Promise.all([
      getReposForFilter(tokenRef.current, accountID, selectedDateInterval),
      getTeamsForFilter(tokenRef.current, accountID)
    ])

    const updatedContribs = await getContribsForFilter(
      tokenRef.current, accountID, selectedDateInterval, updatedRepos
    )

    // TODO: Find a different approach to Teams
    setGlobalData(
      ['filter.repos', 'filter.contribs', 'filter.teams'],
      [updatedRepos, updatedContribs, updatedTeams]
    )

    dispatchFilter(setExcludeInactive(excludeInactive))
    dispatchFilter(setDateInterval(selectedDateInterval))
    dispatchFilter(init({
      repos: updatedRepos, contribs: updatedContribs, teams: updatedTeams, ready: true
    }))
  }

  const onReposApplyChange = useCallback(async (selectedRepos, dateInterval) => {
    dispatchFilter(setReady(false))
    resetData()
  
    selectedRepos = selectedRepos.length > 0 ? selectedRepos : contextRepos
    dateInterval = dateInterval || filterData.dateInterval

    const [contribs, teams] = await Promise.all([
      getContribsForFilter(tokenRef.current, accountID, dateInterval, selectedRepos),
      getTeamsForFilter(tokenRef.current, accountID)
    ])

    setGlobalData(
      ['filter.contribs', 'filter.teams', 'filter.repos'],
      [contribs, teams, selectedRepos]
    )
    
    dispatchFilter(setAppliedRepos(selectedRepos))

    dispatchFilter(setContribs(contribs))
    dispatchFilter(setSelectedContribs(contribs))

    dispatchFilter(setTeams(teams))
    dispatchFilter(setReady(true))
  }, [accountID, contextRepos, filterData.dateInterval, resetData, setGlobalData])

  const onContribsApplyChange = useCallback(async selectedContribs => {
    dispatchFilter(setReady(false))
    resetData()
    
    const teams = await getTeamsForFilter(tokenRef.current, accountID)

    setGlobalData(
      ['filter.repos', 'filter.contribs', 'filter.teams'],
      [filterData.repos.data, selectedContribs, teams]
    )
    
    dispatchFilter(setAppliedContribs(selectedContribs))

    dispatchFilter(setSelectedContribs(selectedContribs))
    dispatchFilter(setTeams(teams))
    dispatchFilter(setReady(true))
  }, [accountID, filterData.repos.data, resetData, setGlobalData])
  
  const reposLabelFormat = repo => (github.repoName(repo) || 'UNKNOWN')
  const getOptionValueRepos = val => val
  const getOptionValueUsers = val => `${val.id} ${val.name} ${val.login}`

  const reposOptions = [...filterData.repos.data]

  const teamsOptions = mapContribsToTeam(
    filterData.contribs.data,
    filterData.teams.data
  )

  const onSelectRepo = selectedOptions => {
    dispatchFilter(setSelectedRepos(selectedOptions))
  }

  const onSelectContrib = (selectedContrib, ...rest) => {
    dispatchFilter(setSelectedContribs(selectedContrib))
  }
  
  const reposValue = filterData.repos.data.filter(repo =>
    ~filterData.repos.selected.indexOf(repo)
  )

  const contribsValue = filterData.contribs.data.filter(c =>
    filterData.contribs.selected.find(e => e.login === c.login)
  )

  const onExcludeInactive = () =>
    setExclude(!excludeInactive)

  return (
    <FiltersContext
      ready={filterData.ready}
      repositories={filterData.repos.applied}
      contributors={filterData.contribs.applied}
      dateInterval={filterData.dateInterval}
      excludeInactive={filterData.excludeInactive}
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
            onApply={onContribsApplyChange}
            value={contribsValue}
            onChange={onSelectContrib}
          />
        }
        dateIntervalFilter={
          <DateInterval
            minDate={allowedDateInterval.from}
            maxDate={allowedDateInterval.to}
            initialFrom={defaultDateInterval.from}
            initialTo={defaultDateInterval.to}
            onChange={onDateIntervalChange}
            onExcludeInactive={onExcludeInactive}
            isExcludeInactive={excludeInactive}
          />
        }
      />
      {children}
    </FiltersContext >
  )
}

const getDataForFilter = async (dataName, dataFetcherFn, token, accountID, dateInterval, inRepos = []) =>
  dataFetcherFn(
    token,
    accountID,
    dateTime.ymd(dateInterval.from),
    dateTime.ymd(dateInterval.to),
    inRepos,
  )

const getReposForFilter = (token, accountID, dateInterval, inRepos) => getDataForFilter(
  'repositories', getRepos, token, accountID, dateInterval, inRepos)

const getContribsForFilter = (token, accountID, dateInterval, inRepos) => getDataForFilter(
  'contributors', getContributors, token, accountID, dateInterval, inRepos)

const getTeamsForFilter = (token, accountID) => getTeams(buildApi(token), accountID)
