import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import StageMetrics from 'js/components/pipeline/StageMetrics';

import { useBreadcrumbsContext } from 'js/context/Breadcrumbs';
import { useFiltersContext } from 'js/context/Filters';

import { getPipelineMetrics } from 'js/services/api';

export default () => {
    const [pipelineState, setPipelineData] = useState(getPipelineMetrics());

    const { name } = useParams()
    const activeStageState = pipelineState.findIndex(stage => stage.tab.slug === name);
    const links = activeStageState >= 0 ? {
        current: pipelineState[activeStageState].tab.title,
        ancestors: [{ url: '/stage/overview', text: 'Overview' }],
    } : {
            current: 'Overview',
        };

    useBreadcrumbsContext(links);

    const { dateInterval, repositories, contributors } = useFiltersContext()

    useEffect(() => {
        if (!repositories || !repositories.length) {
            return;
        }

        const data = getPipelineMetrics();
        setPipelineData(data);
    }, [dateInterval, repositories, contributors]);

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
