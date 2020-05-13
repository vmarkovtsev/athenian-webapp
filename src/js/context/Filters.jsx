import React, { useContext } from 'react';

const Context = React.createContext({ repositories: [], contributors: [], dateInterval: {} });

export const useFiltersContext = () => useContext(Context);

export default function FiltersContext({ ready, repositories, contributors, dateInterval, children }) {
  return (
    <Context.Provider value={{ ready, repositories, contributors, dateInterval }}>
      {children}
    </Context.Provider>
  )
}
