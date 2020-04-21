import React, { useReducer, useContext } from 'react';

const DataContext = React.createContext({});

export const useDataContext = () => useContext(DataContext);

const globalKeysWhitelist = [
    'filter.repos',
    'filter.contribs',
    'prs'
];

const globalKeyPrefix = 'global.';

const dataStateReducer = (state, action) => {
    if (action.reset) {
        console.log("Resetting all data");
        return {};
    }

    const { id, data, global } = action;
    console.log(`Setting ${global ? 'global ' : ''}data with id: ${id} | ${state[id]}`);
    if (global) {
        if (!globalKeysWhitelist.includes(id)) {
            throw Error(`Trying to use unrecognized global id: ${id}`);
        } else if (state[id]) {
            throw Error(`Trying to override global data with id: ${id}`);
        }
    } else if (id.startsWith(globalKeyPrefix)) {
        throw Error(`Non-global data cannot have id with prefix ${globalKeyPrefix}: ${id}`);
    }

    const prefix = global ? globalKeyPrefix : '';
    state[`${prefix}${id}`] = data;
    return state;
};

export default ({ children }) => {
    const [dataState, dispatchDataState] = useReducer(dataStateReducer, {});

    const reset = () => dispatchDataState({reset: true});
    const get = (id) => id ? dataState[id] : null;
    const set = (id, data) => id ? dispatchDataState({id, data}) : null;
    const getGlobal = (id) => id ? dataState[`global.${id}`] : null;
    const setGlobal = (id, data) => id ? dispatchDataState({id, data, global: true}) : null;

    return (
        <DataContext.Provider value={{get, set, getGlobal, setGlobal, reset}}>
            {children}
        </DataContext.Provider >
    );
};
