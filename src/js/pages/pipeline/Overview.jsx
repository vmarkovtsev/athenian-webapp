import React from 'react';

import { useBreadcrumbsContext } from 'js/context/Breadcrumbs';
import { usePRsContext } from 'js/context/PRs';

import PullRequests from 'js/components/pipeline/PullRequests';

export default () => {
    const prsContext = usePRsContext();

    useBreadcrumbsContext({ current: 'Overview' });

    return <PullRequests data={prsContext} />;
};
