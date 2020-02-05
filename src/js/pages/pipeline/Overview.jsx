import React, { useState } from 'react';

import { useBreadcrumbsContext } from 'js/context/Breadcrumbs';

import PullRequests from 'js/components/pipeline/PullRequests';

import { getPRs } from 'js/services/api';

export default () => {
    const [prs] = useState(getPRs());

    useBreadcrumbsContext({ current: 'Overview' });

    return <PullRequests data={prs} />;
};
