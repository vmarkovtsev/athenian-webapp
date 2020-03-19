import React, { useContext, useEffect } from 'react';

const BreadcrumbsContext = React.createContext(() => { });

export const useBreadcrumbsContext = breadcrumbs => {
    const setBreadcrumbsFn = useContext(BreadcrumbsContext);
    useEffect(() => setBreadcrumbsFn(breadcrumbs), [breadcrumbs, setBreadcrumbsFn]);
};

export default ({ setBreadcrumbsFn, children }) => {
    return (
        <BreadcrumbsContext.Provider value={setBreadcrumbsFn}>
            {children}
        </BreadcrumbsContext.Provider>
    );
};
