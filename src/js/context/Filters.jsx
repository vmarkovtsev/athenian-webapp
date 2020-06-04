import React, { useContext } from 'react';

const Context = React.createContext({ repositories: [], contributors: [], dateInterval: {}, excludeInactive: true });

export const useFiltersContext = () => useContext(Context);

export default function FiltersContext({ ready, repositories, contributors, dateInterval, children, excludeInactive }) {
  return (
    <Context.Provider value={{ ready, repositories, contributors, dateInterval, excludeInactive }}>
      {children}
    </Context.Provider>
  )
}
