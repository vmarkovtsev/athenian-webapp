import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { SummaryMetrics, StageSummaryKPI, Insights } from 'js/components/pipeline/StageMetrics';
import Tabs from 'js/components/layout/Tabs';
import PullRequests from 'js/components/pipeline/PullRequests';

import { pipelineStagesConf, getStage } from 'js/pages/pipeline/Pipeline';

import { useBreadcrumbsContext } from 'js/context/Breadcrumbs';
import { useFiltersContext } from 'js/context/Filters';
import { usePipelineContext } from 'js/context/Pipeline';
import { usePRsContext } from 'js/context/PRs';

import { getSampleCharts } from 'js/services/api';

export default () => {
    const [stageChartsState, setStageChartsState] = useState([]);

    const { stages: stagesContext } = usePipelineContext();
    const prsContext = usePRsContext();
    const { name: stageSlug } = useParams();
    const activeConf = getStage(pipelineStagesConf, stageSlug);
    const activeStage = getStage(stagesContext, stageSlug);

    const links = activeConf ? {
        current: activeConf.title,
        ancestors: [{ url: '/stage/overview', text: 'Overview' }],
    } : {
            current: 'Overview',
        };

    useBreadcrumbsContext(links);

    const { dateInterval, repositories, contributors } = useFiltersContext();

    useEffect(() => {
        if (!repositories || !repositories.length) {
            return;
        }

        getSampleCharts(stageSlug)
            .then(setStageChartsState);
    }, [stageSlug, dateInterval, repositories, contributors]);

    if (!activeConf) {
        return <p>{stageSlug} is not a valid pipeline stage.</p>;
    }

    if (!activeStage) {
        return null;
    }

    const filteredPRs = {
        prs: activeStage.prs(prsContext.prs),
        users: prsContext.users,
    };

    return <>
        <SummaryMetrics conf={activeStage}>
            <StageSummaryKPI data={activeStage.summary(activeStage, prsContext.prs, dateInterval)} />
        </SummaryMetrics>

        <Tabs tabs={[
            {
                title: 'Insights',
                content: <Insights metrics={stageChartsState} />,
            },
            {
                title: 'Pull Requests',
                badge: filteredPRs.prs.length,
                content: <PullRequests data={filteredPRs} />
            }
        ]} />
    </>;
};
