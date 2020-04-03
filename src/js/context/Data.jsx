import React, { useReducer, useContext } from 'react';

const DataContext = React.createContext({});

export const useDataContext = () => useContext(DataContext);

const dataStateReducer = (state, action) => {
    if (action.reset) {
        console.log("Resetting all data");
        return {};
    }

    const { id, data } = action;
    console.log("Setting data with id: ", id);
    state[id] = data;
    return state;
};

export default ({ children }) => {
    const [dataState, dispatchDataState] = useReducer(dataStateReducer, {});

    const get = (id) => id ? dataState[id] : null;
    const set = (id, data) => id ? dispatchDataState({id, data}) : null;
    const reset = () => dispatchDataState({reset: true});

    return (
        <DataContext.Provider value={{get, set, reset}}>
            {children}
        </DataContext.Provider >
    );
};
