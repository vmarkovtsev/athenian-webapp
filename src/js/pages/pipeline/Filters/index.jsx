import React, { useReducer, useRef, useCallback, useState } from 'react'
import moment from 'moment'
import _ from 'lodash'

import { useAuth0 } from 'js/context/Auth0'
import { useUserContext } from 'js/context/User'
import { useDataContext } from 'js/context/Data'
import FiltersContext from 'js/context/Filters'

import TopFilter from 'js/components/pipeline/TopFilter'

import { RepositoriesMultiSelect, UsersMultiSelect } from 'js/components/ui/filters/MultiSelect'
import DateInterval, { EOD, YEAR_AGO, TWO_WEEKS_AGO } from 'js/components/ui/filters/DateInterval'

import { getRepos, getContributors, getTeams, buildApi } from 'js/services/api'
import { dateTime } from 'js/services/format'

import { useMountEffect } from 'js/hooks'

import { filterReducer, defaultFilter } from './filterReducer'
import {
  init,
  setReady,
  setDateInterval,
  setContribs,
  setRepos,
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

  const { user: { defaultAccount: { id: accountID, repos: contextRepos }}, isDemo } = useUserContext()
  const { reset: resetData, setGlobal: setGlobalData } = useDataContext()
  const [filterData, dispatchFilter] = useReducer(
    filterReducer,
    { ...defaultFilter, dateInterval: defaultDateInterval }
  )
  const [excludeInactive, setExclude] = useState(true)

  useMountEffect(() => {
    (async () => {
      tokenRef.current = isDemo ? null : await getTokenSilently()

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

    const updatedRepos = await getReposForFilter(
      tokenRef.current, accountID, selectedDateInterval)
    const updatedContribs = await getContribsForFilter(
      tokenRef.current, accountID, selectedDateInterval, updatedRepos)

    // TODO(se7entyse7en): This should be handled elsewhere, this component doesn't
    // actually need to work with the `contribs.applied` that contains also the team
    // information causing duplicates. This should be handled by `MultiSelect`.
    const uniqueContribs = _(filterData.contribs.applied).uniqBy("login").value()

    setGlobalData(
      ['filter.repos', 'filter.contribs', 'filter.teams'],
      [filterData.repos.applied, uniqueContribs, filterData.teams.data]
    )

    dispatchFilter(setExcludeInactive(excludeInactive))
    dispatchFilter(setDateInterval(selectedDateInterval))
    dispatchFilter(setRepos(updatedRepos))
    dispatchFilter(setContribs(updatedContribs))
    dispatchFilter(setReady(true))
  }

  const onReposApplyChange = useCallback(async (selectedRepos, dateInterval) => {
    dispatchFilter(setReady(false))
    resetData()

    selectedRepos = selectedRepos.length > 0 ? selectedRepos : contextRepos
    dateInterval = dateInterval || filterData.dateInterval

    const contribs = await getContribsForFilter(
      tokenRef.current, accountID, dateInterval, selectedRepos)

    // TODO(se7entyse7en): This should be handled elsewhere, this component doesn't
    // actually need to work with the `contribs.applied` that contains also the team
    // information causing duplicates. This should be handled by `MultiSelect`.
    const uniqueContribs = _(filterData.contribs.applied).uniqBy("login").value()

    setGlobalData(
      ['filter.contribs', 'filter.teams', 'filter.repos'],
      [uniqueContribs, filterData.teams.data, selectedRepos]
    )

    dispatchFilter(setAppliedRepos(selectedRepos))
    dispatchFilter(setContribs(contribs))
    dispatchFilter(setReady(true))
  }, [accountID, contextRepos, filterData.contribs.applied, filterData.dateInterval, filterData.teams.data, resetData, setGlobalData])

  const onContribsApplyChange = useCallback(async selectedContribs => {
    dispatchFilter(setReady(false))
    resetData()

    setGlobalData(
      ['filter.repos', 'filter.contribs', 'filter.teams'],
      [filterData.repos.applied, selectedContribs, filterData.teams.data]
    )

    dispatchFilter(setAppliedContribs(selectedContribs))
    dispatchFilter(setReady(true))
  }, [filterData.repos.applied, filterData.teams.data, resetData, setGlobalData])

  const onExcludeInactive = () => setExclude(!excludeInactive)

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
          <RepositoriesMultiSelect
            isLoading={!filterData.ready}
            options={filterData.repos.data}
            onApply={onReposApplyChange}
            initialValues={filterData.repos.applied}
          />
        }
        contribsFilter={
          <UsersMultiSelect
            isLoading={!filterData.ready}
            options={filterData.contribs.data}
            onApply={onContribsApplyChange}
            initialValues={filterData.contribs.applied}
            teams={filterData.teams.data}
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
