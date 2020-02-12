import React, { useContext } from 'react';

const FiltersContext = React.createContext({ repositories: [], contributors: [], dateInterval: {} });

export const useFiltersContext = () => useContext(FiltersContext);

export default ({ repositories, contributors, dateInterval, children }) => {
    return (
        <FiltersContext.Provider value={{ repositories, contributors, dateInterval }}>
            {children}
        </FiltersContext.Provider >
    );
};
