import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import StageMetrics from 'js/components/pipeline/StageMetrics';

import { useAuth0 } from 'js/context/Auth0';
import { useBreadcrumbsContext } from 'js/context/Breadcrumbs';

import { getPipelineDataInitial, getPipelineDataAPI, fetchApi } from 'js/services/api';

export default () => {
    const { loading, isAuthenticated, getTokenSilently } = useAuth0();

    const [pipelineState, setPipelineData] = useState(getPipelineDataInitial());

    const { name } = useParams()
    const activeStageState = pipelineState.findIndex(stage => stage.tab.slug === name);

    const links = activeStageState >= 0 ? {
        current: pipelineState[activeStageState].tab.title,
        ancestors: [{ url: '/stage/overview', text: 'Overview' }],
    } : {
            current: 'Overview',
        };

    useBreadcrumbsContext(links);

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
        activeStageState >= 0 ? (
            <StageMetrics
                title={pipelineState[activeStageState].tab.title}
                metrics={pipelineState[activeStageState].body.charts}
            />
        ) : (
                <p>{name} is not a valid pipeline stage.</p>
            )
    );
};
