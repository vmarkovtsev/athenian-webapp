import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Page from 'js/pages/templates/Page';

import Filters from 'js/pages/pipeline/Filters';

import MainMetrics from 'js/components/pipeline/MainMetrics';
import Thumbnails from 'js/components/pipeline/Thumbnails';

import { useAuth0 } from 'js/context/Auth0';

import { getPipelineDataInitial, getPipelineDataAPI, fetchApi } from 'js/services/api';

export default ({ children }) => {
    const { loading, isAuthenticated, getTokenSilently } = useAuth0();
    const [pipelineState, setPipelineData] = useState(getPipelineDataInitial());
    const { name } = useParams()
    const activeStageState = pipelineState.findIndex(stage => stage.tab.slug === name);

    useEffect(() => {
        if (loading) {
            return;
        };

        let pipelinePromise;
        if (isAuthenticated) {
            pipelinePromise = getTokenSilently()
                .then(token => fetchApi(token, getPipelineDataAPI));
        } else {
            pipelinePromise = fetchApi('', getPipelineDataAPI);
        }

        pipelinePromise.then(setPipelineData);
    }, [loading, isAuthenticated, getTokenSilently]);

    return (
        <Page>
            <Filters>
                <MainMetrics />
                <Thumbnails stages={pipelineState} activeCard={activeStageState} />
                {children}
            </Filters>
        </Page>
    );
};
