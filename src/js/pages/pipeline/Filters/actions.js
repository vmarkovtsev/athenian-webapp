import { TYPE } from './filterReducer'

export const setRepos = repos => ({ type: TYPE.SET_REPOS, payload: repos })
export const setTeams = teams => ({ type: TYPE.SET_TEAMS, payload: teams })
export const setReady = ready => ({ type: TYPE.READY, payload: ready })
export const setDateInterval = interval => ({ type: TYPE.SET_INTERVAL, payload: interval })
export const setContribs = contribs => ({ type: TYPE.SET_CONTRIBS, payload: contribs })
export const setSelectedRepos = repos => ({ type: TYPE.SET_SELECTED_REPOS, payload: repos })