import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { useAuth0 } from 'js/context/Auth0'
import { useUserContext } from 'js/context/User'
import { useDataContext } from 'js/context/Data'
import FiltersContext from 'js/context/Filters'

import TopFilter from 'js/components/pipeline/TopFilter'

import MultiSelect from 'js/components/ui/filters/MultiSelect'
import DateInterval, { EOD, YEAR_AGO, TWO_WEEKS_AGO } from 'js/components/ui/filters/DateInterval'

import { getRepos, getContributors } from 'js/services/api'
import { dateTime, github } from 'js/services/format'

import { useMountEffect } from 'js/hooks'

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
  const { user } = useUserContext()
  const { reset: resetData, setGlobal: setGlobalData } = useDataContext()

  const [readyState, setReadyState] = useState(false)

  const [reposReadyState, setReposReadyState] = useState(false)
  const [allReposState, setAllReposState] = useState([])
  const [filteredReposState, setFilteredReposState] = useState([])

  const [contribsReadyState, setContribsReadyState] = useState(false)
  const [allContribsState, setAllContribsState] = useState([])
  const [filteredContribsState, setFilteredContribsState] = useState([])

  const [filteredDateIntervalState, setFilteredDateIntervalState] = useState(defaultDateInterval)
  
  const [reposSelectState, setReposSelectState] = useState([])
  const [usersSelectState, setUsersSelectState] = useState([])

  useEffect(() => {
    setReposSelectState(allReposState)
  }, [allReposState])

  useEffect(() => {
    setUsersSelectState(allContribsState)
  }, [allContribsState])

  const context = {
    account: user.defaultAccount.id,
    dateInterval: defaultDateInterval,
    repos: user.defaultReposet.repos
  }

  const reposSetters = {
    ready: setReposReadyState,
    all: setAllReposState,
    filtered: setFilteredReposState
  }

  const contribsSetters = {
    ready: setContribsReadyState,
    all: setAllContribsState,
    filtered: setFilteredContribsState
  }

  useMountEffect(() => {
    (async () => {
      const token = await getTokenSilently()
      const initialRepos = await updateReposFilter({...context, token, setters: reposSetters})
      setGlobalData('filter.repos', Promise.resolve(initialRepos))
      const initialContribs = await updateContribsFilter({...context, token, setters: contribsSetters})
      setGlobalData('filter.contribs', Promise.resolve(initialContribs))
      setReadyState(true)
    })()
  })

  const onDateIntervalChange = async (selectedDateInterval) => {
    setReadyState(false)
    resetData()
    console.info('DateInterval selection changed',
      dateTime.ymd(selectedDateInterval.from), dateTime.ymd(selectedDateInterval.to)
    )

    setFilteredDateIntervalState(selectedDateInterval)

    const token = await getTokenSilently()
    const updatedRepos = await updateReposFilter({
      ...context, token, dateInterval: selectedDateInterval, setters: reposSetters
    })

    const updatedContribs = await updateContribsFilter({
      ...context, token, repos: updatedRepos, dateInterval: selectedDateInterval, setters: contribsSetters
    })

    setGlobalData('filter.repos', Promise.resolve(updatedRepos))
    setGlobalData('filter.contribs', Promise.resolve(updatedContribs))
    setReadyState(true)
  }

  const onReposChange = async (selectedRepos, dateInterval) => {
    setReadyState(false)
    resetData()
    console.info('Repositories selection changed', selectedRepos)
    selectedRepos = selectedRepos.length > 0 ? selectedRepos : context.repos
    dateInterval = dateInterval || filteredDateIntervalState

    setFilteredReposState(selectedRepos)
    setGlobalData('filter.repos', Promise.resolve(selectedRepos))

    const token = await getTokenSilently()
    const selectedContribs = await updateContribsFilter({
      ...context, token, dateInterval, repos: selectedRepos,
      setters: contribsSetters
    })

    setGlobalData('filter.contribs', Promise.resolve(selectedContribs))
    setReadyState(true)
  }

  const onContribsChange = async (selectedContribs) => {
    setReadyState(false)
    resetData()
    console.info('Contributors selection changed', selectedContribs)
    setFilteredContribsState(selectedContribs)
    setGlobalData('filter.repos', Promise.resolve(filteredReposState))
    setGlobalData('filter.contribs', Promise.resolve(selectedContribs))
    setReadyState(true)
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
  const getOptionValue = val => val
  const getOptionValueUsers = val => `${val.name} ${val.login}`

  return (
    <FiltersContext
      ready={readyState}
      repositories={filteredReposState}
      contributors={filteredContribsState}
      dateInterval={filteredDateIntervalState}
    >
      <TopFilter
        reposFilter={
          <MultiSelect
            label="Repositories"
            className="filter"
            name="repositories"
            noDataMsg="There are no repositories for the date interval filter"
            isLoading={reposReadyState}
            getOptionLabel={reposLabelFormat}
            getOptionValue={getOptionValue}
            options={allReposState}
            onApply={onReposChange}
            value={reposSelectState}
            onChange={setReposSelectState}
          />
        }
        contribsFilter={
          <MultiSelect
            label="Users"
            className="filter"
            name="users"
            noDataMsg="There are no users for the date interval and repositories filters"
            isLoading={contribsReadyState}
            getOptionLabel={usersLabelFormat}
            getOptionValue={getOptionValueUsers}
            // options={allContribsState}
            options={[{
              label: 'Dogs',
              options: [
                { name: 'Lessy', avatar: 'https://placedog.net/80/80', login: 'github.com/navassouza'},
                { name: 'Lindsay', avatar: 'https://placedog.net/80/80', login: 'github.com/navassouza'}
              ]
            }, {
              label: 'Cats',
              options: [
                { name: 'Kitty', avatar: 'https://placekitten.com/80/80', login: 'github.com/navassouza'},
                { name: 'Kat', avatar: 'https://placekitten.com/80/80', login: 'github.com/navassouza'}
              ]
            }, {
              label: 'Team Web development',
              options: [
                { name: 'Tiger', avatar: 'https://placekitten.com/80/80', login: 'github.com/navassouza'},
                { name: 'Lepard', avatar: 'https://placekitten.com/80/80', login: 'github.com/navassouza'}
              ]
            }]}
            onApply={onContribsChange}
            value={usersSelectState}
            onChange={setUsersSelectState}
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

const updateFilter = async ({token, account, dateInterval, repos, setters, getter}) => {
  setters.ready(false)

  const updatedValues = await getter(token, account, dateInterval, repos)

  setters.all(updatedValues)
  setters.filtered(updatedValues)
  setters.ready(true)

  return updatedValues
}

const updateReposFilter = async ({token, account, dateInterval, repos, setters}) => {
  console.log('Updating repos filter', dateInterval, repos)
  const updatedRepos = await updateFilter(
      {token, account, dateInterval, repos, setters, getter: getReposForFilter})
  console.log('Updated repos filter', updatedRepos)
  return updatedRepos
}

const updateContribsFilter = async ({token, account, dateInterval, repos, setters}) => {
  console.log('Updating contribs filter', dateInterval, repos)
  const updatedContribs = await updateFilter(
      {token, account, dateInterval, repos, setters, getter: getContribsForFilter})
  console.log('Updated contribs filter', updatedContribs)
  return updatedContribs
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
