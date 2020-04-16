import React, { useContext } from 'react';

import { useLocation, useParams } from 'react-router-dom';

import { getStageTitle } from 'js/pages/pipeline/Pipeline';

const BreadcrumbsContext = React.createContext(null);

export const useBreadcrumbsContext = () => useContext(BreadcrumbsContext);

export default ({ children }) => {
    const location = useLocation();
    const { name } = useParams();
    const breadcrumb = buildBreadcrumb(location, name);

    return (
        <BreadcrumbsContext.Provider value={breadcrumb}>
            {children}
        </BreadcrumbsContext.Provider>
    );
};

const buildBreadcrumb = (location, name) => {
    if (location.pathname.indexOf('/stage/') === 0) {
        return {
            current: { title: getStageTitle(name) },
            ancestors: name !== 'overview' && [{ url: '/stage/overview', title: 'Overview' }]
        };
    }

    return null;
};
