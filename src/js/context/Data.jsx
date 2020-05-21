import React, { useCallback, useReducer, useContext } from 'react'
import _ from "lodash"

const Context = React.createContext({})

export const useDataContext = () => useContext(Context)

const globalKeysWhitelist = [
  'filter.repos',
  'filter.contribs',
  'prs',
  'prs-metrics.values',
  'prs-metrics.variations'
]

const globalKeyPrefix = 'global.'

const dataStateReducer = (state, action) => {
  if (action.reset) {
    return { data: {}, globalReady: false }
  }
  
  const { id, data, global } = action

  const ids = Array.prototype.concat(id)
  const dataArr = Array.prototype.concat(data)

  /**
   * Enable setGlobal to update reducer in batches avoiding sequential updates
   * forcing re-renders
   * 
   * setGlobalData('filter.repos', updatedRepos)
   * setGlobalData(['filter.repos', 'filter.contribs'],[updatedRepos, updatedContribs])
   */
  return ids.reduce((reducedData, key, index) => {
    if (global) {
      // 'filter.teams is whitelabled but not obrigatory
      if (![...globalKeysWhitelist, 'filter.teams'].includes(key)) {
        throw Error(`Trying to use unrecognized global id: ${key}`)
      } else if (reducedData.data[key]) {
        throw Error(`Trying to override global data with id: ${key}`)
      }
    } else if (key.startsWith(globalKeyPrefix)) {
      throw Error(`Non-global data cannot have id with prefix ${globalKeyPrefix}: ${key}`)
    }
    
    const prefix = global ? globalKeyPrefix : ''
    // if 'id' is an array of whitelabeled keys, get data for each id (line:33 commment)
    reducedData.data[`${prefix}${key}`] = Array.isArray(id) ? dataArr[index] : data
  
    // filter.teams is skipped below
    reducedData.globalReady = _(globalKeysWhitelist).map(k => !!reducedData.data[`global.${k}`]).every()

    return reducedData
  }, {...state})
}

export default function DataContext({ children }) {
  const [dataState, dispatchDataState] = useReducer(
    dataStateReducer, {data: {}, globalReady: false})
    
  const reset = useCallback(() => dispatchDataState({reset: true}),[])
  const get = useCallback((id) => id ? dataState.data[id] : null, [dataState])
  const set = useCallback((id, data) => id ? dispatchDataState({id, data}) : null, [])
  const getGlobal = useCallback((id) => id ? dataState.data[`global.${id}`] : null, [dataState])
  const setGlobal = useCallback((id, data) => id ? dispatchDataState({id, data, global: true}) : null, [])
  
  return (
    <Context.Provider value={{get, set, getGlobal, setGlobal, reset, globalDataReady: dataState.globalReady}}>
      {children}
    </Context.Provider >
  )
}
