import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from 'js/context/Auth0';
import { useUserContext } from 'js/context/User';
import { SummaryMetrics, StageSummaryKPI } from 'js/components/pipeline/StageMetrics';
import Insights from 'js/components/insights/Insights';
import Tabs from 'js/components/layout/Tabs';
import PullRequests from 'js/components/pipeline/PullRequests';
import { getInsights } from 'js/components/insights/Helper';

import { pipelineStagesConf, getStage } from 'js/pages/pipeline/Pipeline';

import { useFiltersContext } from 'js/context/Filters';
import { usePipelineContext } from 'js/context/Pipeline';
import { usePRsContext } from 'js/context/PRs';

import { buildApi } from 'js/services/api';

export default () => {
    const userContext = useUserContext();
    const { getTokenSilently } = useAuth0();
    const [stageChartsState, setStageChartsState] = useState([]);

    const { stages: stagesContext } = usePipelineContext();
    const prsContext = usePRsContext();

    const { name: stageSlug } = useParams();
    const activeConf = getStage(pipelineStagesConf, stageSlug);
    const activeStage = getStage(stagesContext, stageSlug);

    const { dateInterval, repositories, contributors } = useFiltersContext();

    useEffect(() => {
        if (!repositories || !repositories.length) {
            return;
        }

        getTokenSilently()
            .then(buildApi)
            .then(api => {
                const context = {
                    account: userContext.defaultAccount.id,
                    interval: dateInterval,
                    repositories: repositories,
                    contributors: contributors
                };

                // TODO: Don't pass `prsContext`. Each chart should calculate its own
                // data using the provided api.
                // So far we user `prsContext` as it's already queried calculated.
                // Making the chart call the api means querying the api again. We can
                // remove this once we implement some caching logic on the client
                // when querying.
                getInsights(stageSlug, api, context, prsContext)
                    .then(setStageChartsState)
                    .catch(err => console.log(err));
                ;
            });
    }, [stageSlug, dateInterval, repositories, contributors, prsContext, getTokenSilently, userContext.defaultAccount.id]);

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
                content: <Insights insights={stageChartsState} />,
            },
            {
                title: 'Pull Requests',
                badge: filteredPRs.prs.length,
                content: <PullRequests data={filteredPRs} />
            }
        ]} />
    </>;
};
