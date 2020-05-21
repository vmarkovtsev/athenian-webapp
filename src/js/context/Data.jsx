import React, { useCallback, useReducer, useContext } from 'react'
import _ from "lodash"

const Context = React.createContext({})

export const useDataContext = () => useContext(Context)

const globalKeysWhitelist = [
  'filter.repos',
  'filter.contribs',
  'filter.teams',
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
  const isIDArray = Array.isArray(id)
  console.log('REsolved Promise: ', Promise.resolve(data))
  return ids.reduce((reducedData, id, index) => {
    if (global) {
      if (!globalKeysWhitelist.includes(id)) {
        throw Error(`Trying to use unrecognized global id: ${id}`)
      } else if (reducedData.data[id]) {
        throw Error(`Trying to override global data with id: ${id}`)
      }
    } else if (id.startsWith(globalKeyPrefix)) {
      throw Error(`Non-global data cannot have id with prefix ${globalKeyPrefix}: ${id}`)
    }
    
    const prefix = global ? globalKeyPrefix : ''
    console.log('ID: ', id, ' dataArr: ', dataArr)
    reducedData.data[`${prefix}${id}`] = isIDArray ? dataArr[index] : dataArr
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
