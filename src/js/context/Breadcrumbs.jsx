import React, { useContext } from 'react';

import { useParams } from 'react-router-dom';

import { getStageTitle } from 'js/pages/pipeline/Pipeline';


const BreadcrumbsContext = React.createContext({
    current: {
        slug: 'overview',
        title: 'Overview',
    },
    ancestors: []
});

export const useBreadcrumbsContext = () => useContext(BreadcrumbsContext);

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
    const current = {
        slug: stageSlug,
        title: getStageTitle(stageSlug),
    };
    const ancestors = stageSlug !== 'overview' ?
          [{ url: '/stage/overview', text: 'Overview' }] :
          [];
    return { current, ancestors };
};
