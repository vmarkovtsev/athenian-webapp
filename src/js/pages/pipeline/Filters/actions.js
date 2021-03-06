import { TYPE } from './filterReducer'

export const init = dataTree => ({ type: TYPE.INIT, payload: dataTree })
export const setRepos = repos => ({ type: TYPE.SET_REPOS, payload: repos })
export const setReady = ready => ({ type: TYPE.READY, payload: ready })
export const setDateInterval = interval => ({ type: TYPE.SET_INTERVAL, payload: interval })
export const setContribs = contribs => ({ type: TYPE.SET_CONTRIBS, payload: contribs })
export const setAppliedRepos = repos => ({ type: TYPE.SET_APPLIED_REPOS, payload: repos })
export const setAppliedContribs = contribs => ({ type: TYPE.SET_APPLIED_CONTRIBS, payload: contribs })
export const setExcludeInactive = isInactive => ({ type: TYPE.EXCLUDE_INACTIVE, payload: isInactive })
