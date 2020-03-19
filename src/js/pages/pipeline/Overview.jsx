import React from 'react';
import classnames from 'classnames';

import { useBreadcrumbsContext } from 'js/context/Breadcrumbs';
import { usePRsContext } from 'js/context/PRs';
import { usePipelineContext } from 'js/context/Pipeline';

import PullRequests from 'js/components/pipeline/PullRequests';
import { SummaryMetrics } from 'js/components/pipeline/StageMetrics';
import { SmallTitle } from 'js/components/ui/Typography';
import Tabs from 'js/components/layout/Tabs';

import { dateTime } from 'js/services/format';

export default () => {
    const prsContext = usePRsContext();
    const { leadtime: leadtimeContext, stages: stagesContext } = usePipelineContext();
    useBreadcrumbsContext({ current: 'Overview' });

    let slowerStage = 0;
    if (leadtimeContext.avg) {
        stagesContext.forEach(stage => {
            if (stage.leadTimePercentage > slowerStage) {
                slowerStage = stage.leadTimePercentage;
            }
        });
    }

    return <>
        {leadtimeContext.avg ? (
            <SummaryMetrics conf={leadtimeContext} >
                {stagesContext.map((stage, i) => stage.leadTimePercentage ? (
                    <div key={i}>
                        <div><SmallTitle content={stage.title} /></div>
                        <span
                            className={classnames('leadtime-proportion d-block mb-2', stage.stageName)}
                            style={{ width: `${100 * stage.leadTimePercentage / slowerStage}%` }}
                            alt={`${stage.leadTimePercentage}%`}
                            data-toggle="tooltip"
                            data-placement="right"
                            title={dateTime.human(stage.avg)}
                        />
                    </div>
                ) : null)}
            </SummaryMetrics>
        ) : null
        }

        <Tabs tabs={[
            {
                title: 'Pull Requests',
                badge: prsContext.prs.length,
                content: <PullRequests data={prsContext} />
            }
        ]} />
    </>
};
