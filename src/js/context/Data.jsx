import React, { useCallback, useReducer, useContext } from 'react';

import _ from "lodash";

const DataContext = React.createContext({});

export const useDataContext = () => useContext(DataContext);

const globalKeysWhitelist = [
    'filter.repos',
    'filter.contribs',
    'prs',
    'prs-metrics.values',
    'prs-metrics.variations'
];

const globalKeyPrefix = 'global.';

const dataStateReducer = (state, action) => {
    if (action.reset) {
        console.log("Resetting all data");
        return {data: {}, globalReady: false};
    }

    const { id, data, global } = action;
    const newState = {...state};

    console.log(`Setting ${global ? 'global ' : ''}data with id: ${id} | ${newState.data[id]}`);
    if (global) {
        if (!globalKeysWhitelist.includes(id)) {
            throw Error(`Trying to use unrecognized global id: ${id}`);
        } else if (newState.data[id]) {
            throw Error(`Trying to override global data with id: ${id}`);
        }
    } else if (id.startsWith(globalKeyPrefix)) {
        throw Error(`Non-global data cannot have id with prefix ${globalKeyPrefix}: ${id}`);
    }

    const prefix = global ? globalKeyPrefix : '';

    newState.data[`${prefix}${id}`] = data;
    newState.globalReady = _(globalKeysWhitelist).map(k => !!newState.data[`global.${k}`]).every();
    console.log('globalready', newState.globalReady);
    return newState;
};

export default ({ children }) => {
    const [dataState, dispatchDataState] = useReducer(
        dataStateReducer, {data: {}, globalReady: false});

    const reset = useCallback(() => dispatchDataState({reset: true}),[]);
    const get = useCallback((id) => id ? dataState.data[id] : null, [dataState]);
    const set = useCallback((id, data) => id ? dispatchDataState({id, data}) : null, []);
    const getGlobal = useCallback((id) => id ? dataState.data[`global.${id}`] : null, [dataState]);
    const setGlobal = useCallback((id, data) => id ? dispatchDataState({id, data, global: true}) : null, []);

    return (
        <DataContext.Provider value={{get, set, getGlobal, setGlobal, reset, globalDataReady: dataState.globalReady}}>
            {children}
        </DataContext.Provider >
    );
};
