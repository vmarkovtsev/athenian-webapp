import { TYPE } from './filterReducer'

export const init = dataTree => ({ type: TYPE.INIT, payload: dataTree })
export const setRepos = repos => ({ type: TYPE.SET_REPOS, payload: repos })
export const setTeams = teams => ({ type: TYPE.SET_TEAMS, payload: teams })
export const setReady = ready => ({ type: TYPE.READY, payload: ready })
export const setDateInterval = interval => ({ type: TYPE.SET_INTERVAL, payload: interval })
export const setContribs = contribs => ({ type: TYPE.SET_CONTRIBS, payload: contribs })
export const setSelectedRepos = repos => ({ type: TYPE.SET_SELECTED_REPOS, payload: repos })
export const setSelectedContribs = contribs => ({ type: TYPE.SET_SELECTED_CONTRIBS, payload: contribs })
export const setAppliedRepos = repos => ({ type: TYPE.SET_APPLIED_REPOS, payload: repos })
export const setAppliedContribs = contribs => ({ type: TYPE.SET_APPLIED_CONTRIBS, payload: contribs })
