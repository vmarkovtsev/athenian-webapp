import React, { useContext } from 'react';

const PRsContext = React.createContext({ prs: [], users: {} });

/**
 * Returns the PRs (prs) and participants (users) within the active filters.
 * @return {prs <Array<PRs>>, users <{userid <{avatar String}>}} prs and users within the active filters.
 */
export const usePRsContext = () => useContext(PRsContext);

export default ({ children, prs }) => {
    return (
        <PRsContext.Provider value={prs}>
            {children}
        </PRsContext.Provider >
    );
};
