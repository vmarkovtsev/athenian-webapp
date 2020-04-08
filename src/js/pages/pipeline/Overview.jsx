import React from 'react';
import classnames from 'classnames';

import { usePRsContext } from 'js/context/PRs';
import { usePipelineContext } from 'js/context/Pipeline';

import PullRequests from 'js/components/pipeline/PullRequests';
import { SummaryMetrics } from 'js/components/pipeline/StageMetrics';
import { SmallTitle } from 'js/components/ui/Typography';
import SummaryChart from 'js/components/pipeline/SummaryChart';
import Tabs from 'js/components/layout/Tabs';

import { dateTime, number } from 'js/services/format';

export default () => {
    const { curr: prsContext } = usePRsContext();
    const { leadtime: leadtimeContext, stages: stagesContext } = usePipelineContext();

    let slowerStage = 0;
    if (leadtimeContext.avg) {
        stagesContext.forEach(stage => {
            if (stage.overallProportion > slowerStage) {
                slowerStage = stage.overallProportion;
            }
        });
    }

    const chart = <SummaryChart
                    name={leadtimeContext.stageName}
                    metric={leadtimeContext.metric}
                    config={{
                        average: leadtimeContext.avg / 1000
                    }}
                  />;
    const kpi = stagesContext.map((stage, i) => stage.overallProportion ? (
        <div key={i}>
          <div><SmallTitle content={stage.title} /></div>
          <span
            className={classnames('overall-proportion d-block mb-2', stage.stageName)}
            style={{ width: `${100 * stage.overallProportion / slowerStage}%` }}
            data-toggle="tooltip"
            data-placement="right"
            title={`${dateTime.human(stage.avg)} (${number.percentage(stage.overallProportion)})`}
          />
        </div>
    ) : null);

    return (
        <>
          {leadtimeContext.avg ? (
              <SummaryMetrics conf={leadtimeContext} chart={chart} kpi={kpi} />
          ) : null}

          <Tabs tabs={[
              {
                  title: 'Pull Requests',
                  badge: prsContext.length,
                  content: <PullRequests data={prsContext} stage="overview" />
              }
          ]} />
        </>
    );
};
