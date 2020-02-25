import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import StageMetrics from 'js/components/pipeline/StageMetrics';

import { pipelineStagesConf } from 'js/pages/pipeline/Body';

import { useBreadcrumbsContext } from 'js/context/Breadcrumbs';
import { useFiltersContext } from 'js/context/Filters';

import { getSampleCharts } from 'js/services/api';

export default () => {
    const [stageChartsState, setStageChartsState] = useState([]);

    const { name } = useParams()
    const activeStageState = pipelineStagesConf.findIndex(metric => metric.slug === name);
    const links = activeStageState >= 0 ? {
        current: pipelineStagesConf[activeStageState].title,
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

        getSampleCharts(name)
            .then(setStageChartsState);
    }, [name, dateInterval, repositories, contributors]);

    return (
        activeStageState >= 0 ? (
            <StageMetrics
                title={links.current}
                metrics={stageChartsState}
            />
        ) : (
                <p>{name} is not a valid pipeline stage.</p>
            )
    );
};
