import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Page from 'js/pages/templates/Page';
import NotFound404 from 'js/pages/NotFound404';
import TopFilter from 'js/components/pipeline/TopFilter';
import MainMetrics from 'js/components/pipeline/MainMetrics';
import Stages from 'js/components/pipeline/Stages';
import Body from 'js/components/pipeline/Body';

import { useAuth0 } from 'js/services/react-auth0-spa';
import { getPipelineDataInitial, getPipelineDataAPI, fetchApi } from 'js/services/api';

export default () => {
    const { loading, isAuthenticated, getTokenSilently } = useAuth0();

    const [pipelineState, setPipelineData] = useState(getPipelineDataInitial());
    const { name } = useParams()
    const activeStageState = pipelineState.findIndex(stage => stage.tab.slug === name);

    useEffect(() => {
        if (loading || !isAuthenticated) {
            return;
        };
        getTokenSilently()
            .then(token => fetchApi(token, getPipelineDataAPI))
            .then(setPipelineData);
    }, [loading, isAuthenticated, getTokenSilently]);

    return (
        activeStageState >= 0 ? (
            <Page>
                <TopFilter />
                <MainMetrics />
                <Stages stages={pipelineState} activeCard={activeStageState} />
                <Body
                    title={pipelineState[activeStageState].tab.title}
                    metrics={pipelineState[activeStageState].body.charts}
                />
            </Page>
        ) : (
                <NotFound404 />
            )
    );
};
