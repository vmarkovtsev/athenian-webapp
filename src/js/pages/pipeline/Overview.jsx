import React, {useState, useEffect} from 'react';

import { pipelineStagesConf } from 'js/pages/pipeline/Pipeline';
import PullRequests from 'js/components/pipeline/PullRequests';
import { OverviewSummaryMetrics } from 'js/components/pipeline/StageMetrics';
import Tabs from 'js/components/layout/Tabs';

import { useDataContext } from 'js/context/Data';

export default () => {
    const { getGlobal: getGlobalData, globalDataReady } = useDataContext();
    const [prsState, setPRsState] = useState({ prs: [], users: [] });
    const [prsLoadingState, setPRsLoadingState] = useState(true);

    useEffect(() => {
        if (!globalDataReady) {
            setPRsLoadingState(true);
            return;
        }

        (async () => {
            setPRsLoadingState(true);
            const prs = await getGlobalData('prs');
            setPRsState(prs);
            setPRsLoadingState(false);
        })();
    }, [globalDataReady, getGlobalData]);

    const tabs = [{
        title: 'Pull Requests',
        badge: prsState?.prs?.length,
        content: <PullRequests data={prsState} stage="overview" loading={prsLoadingState} />
    }];

    return (
        <>
          <OverviewSummaryMetrics
            name={pipelineStagesConf[0].stageName}
            metric={pipelineStagesConf[0].metric} />
          <Tabs tabs={tabs} />
        </>
    );
};
