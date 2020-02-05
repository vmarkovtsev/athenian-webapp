import React, { useContext } from 'react';

const BreadcrumbsContext = React.createContext(() => { });

export const useBreadcrumbsContext = breadcrumbs => {
    const setBreadcrumbsFn = useContext(BreadcrumbsContext);
    setBreadcrumbsFn(breadcrumbs);
};

export default ({ setBreadcrumbsFn, children }) => {
    return (
        <BreadcrumbsContext.Provider value={setBreadcrumbsFn}>
            {children}
        </BreadcrumbsContext.Provider>
    );
};
