import React, { useContext } from 'react';

const FiltersContext = React.createContext({ repositories: [], contributors: [], dateInterval: {} });

export const useFiltersContext = () => useContext(FiltersContext);

export default ({ ready, repositories, contributors, dateInterval, children }) => {
    return (
        <FiltersContext.Provider value={{ ready, repositories, contributors, dateInterval }}>
            {children}
        </FiltersContext.Provider >
    );
};
