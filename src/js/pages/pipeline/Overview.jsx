import React, { useState, useEffect } from 'react';

import Page from 'js/pages/templates/Page';
import TopFilter from 'js/components/pipeline/TopFilter';
import MainMetrics from 'js/components/pipeline/MainMetrics';
import Stages from 'js/components/pipeline/Stages';
import PullRequests from 'js/components/pipeline/PullRequests';

import { useAuth0 } from 'js/services/react-auth0-spa';
import { getPipelineDataInitial, getPipelineDataAPI, getPRs, fetchApi } from 'js/services/api';

export default () => {
    const { loading, isAuthenticated, getTokenSilently } = useAuth0();

    const [pipelineState, setPipelineData] = useState(getPipelineDataInitial());
    const [prsState] = useState(getPRs());

    useEffect(() => {
        if (loading || !isAuthenticated) {
            return;
        };
        getTokenSilently()
            .then(token => fetchApi(token, getPipelineDataAPI))
            .then(setPipelineData);
    }, [loading, isAuthenticated, getTokenSilently]);

    return (
        <Page>
            <TopFilter />
            <MainMetrics />
            <Stages stages={pipelineState} />
            <PullRequests data={prsState} />
        </Page>
    );
};
