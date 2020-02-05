import React, { useState } from 'react';

import PullRequests from 'js/components/pipeline/PullRequests';

import { getPRs } from 'js/services/api';

export default () => {
    const [prs] = useState(getPRs());

    return <PullRequests data={prs} />;
};
