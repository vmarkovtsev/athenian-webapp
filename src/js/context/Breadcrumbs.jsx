import React, { useContext } from 'react';

import { useParams } from 'react-router-dom';

import { getStageTitle } from 'js/pages/pipeline/Pipeline';


const BreadcrumbsContext = React.createContext(() => ({
    breadcrumb: {
        current: {
            slug: 'overview',
            title: 'Overview',
        }
    },
    setBreadcrumb: (b) => {}
}));

export const useBreadcrumbsContext = breadcrumbs => useContext(BreadcrumbsContext);

export default ({ children }) => {
    const { name: stageSlug } = useParams();
    const breadcrumb = buildBreadcrumb(stageSlug);

    return (
        <BreadcrumbsContext.Provider value={breadcrumb}>
            {children}
        </BreadcrumbsContext.Provider>
    );
};

const buildBreadcrumb = (stageSlug) => {
    const current = stageSlug ? {
        slug: stageSlug,
        title: getStageTitle(stageSlug),
    } : {
        slug: 'overview',
        title: 'Overview',
    };
    const ancestors = stageSlug ? [{ url: '/stage/overview', text: 'Overview' }] : [];
    return { current, ancestors };
};
