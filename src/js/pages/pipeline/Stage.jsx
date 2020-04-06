import React from 'react';
import { useParams } from 'react-router-dom';
import { useFiltersContext } from 'js/context/Filters';
import { SummaryMetrics, StageSummaryKPI } from 'js/components/pipeline/StageMetrics';
import Insights from 'js/components/insights/Insights';
import Tabs from 'js/components/layout/Tabs';
import PullRequests from 'js/components/pipeline/PullRequests';
import SummaryChart from 'js/components/pipeline/SummaryChart';

import { pipelineStagesConf, getStage } from 'js/pages/pipeline/Pipeline';

import { usePipelineContext } from 'js/context/Pipeline';
import { usePRsContext } from 'js/context/PRs';

export default () => {
    const { stages: stagesContext } = usePipelineContext();
    const prsContext = usePRsContext();

    const { name: stageSlug } = useParams();
    const activeConf = getStage(pipelineStagesConf, stageSlug);
    const activeStage = getStage(stagesContext, stageSlug);

    const {
        dateInterval,
    } = useFiltersContext();


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

    const chart = <SummaryChart
                    name={activeStage.stageName}
                    metric={activeStage.metric}
                    config={{
                        average: activeStage.avg / 1000
                    }}
                  />;
    const kpi = <StageSummaryKPI data={activeStage.summary(activeStage, prsContext.prs, dateInterval)} />;

    return (
        <>
          <SummaryMetrics conf={activeStage} chart={chart} kpi={kpi} />
          <Tabs tabs={[
              {
                  title: 'Insights',
                  content: <Insights />,
              },
              {
                  title: 'Pull Requests',
                  badge: filteredPRs.prs.length,
                  content: <PullRequests data={filteredPRs} stage={activeStage.stageName} />
              }
          ]} />
        </>
    );
};
