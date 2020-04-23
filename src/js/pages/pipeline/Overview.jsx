import React, {useState, useEffect} from 'react';

import { pipelineStagesConf } from 'js/pages/pipeline/Pipeline';
import PullRequests from 'js/components/pipeline/PullRequests';
import { OverviewSummaryMetrics } from 'js/components/pipeline/StageMetrics';
import Tabs from 'js/components/layout/Tabs';

import { useDataContext } from 'js/context/Data';

export default () => {
    const { getGlobal: getGlobalData, globalDataReady } = useDataContext();
    const [prsState, setPRsState] = useState(null);

    useEffect(() => {
        if (!globalDataReady) {
            return;
        }

        (async () => {
            const prs = await getGlobalData('prs');
            setPRsState(prs);
        })();
    });

    const tabs = [];
    if (prsState) {
        tabs.push({
            title: 'Pull Requests',
            badge: prsState && prsState.prs.length,
            content: <PullRequests data={prsState} stage="overview" />
        });
    }

    return (
        <>
          <OverviewSummaryMetrics
            name={pipelineStagesConf[0].stageName}
            metric={pipelineStagesConf[0].metric} />
          <Tabs tabs={tabs} />
        </>
    );
};
