import React, {useState, useEffect} from 'react';

import { OverviewSummaryMetrics } from 'js/components/pipeline/StageMetrics';
import Tabs from 'js/components/layout/Tabs';
import PullRequests from 'js/components/pipeline/PullRequests';
import { LOADING, READY, FAILED, EMPTY } from 'js/components/ui/Spinner';

import { pipelineStagesConf } from 'js/pages/pipeline/Pipeline';
import { useDataContext } from 'js/context/Data';

export default () => {
    const { getGlobal: getGlobalData, globalDataReady } = useDataContext();
    const [prsState, setPRsState] = useState({ prs: [], users: null });
    const [statusState, setStatusState] = useState(EMPTY);

    useEffect(() => {
        if (!globalDataReady) {
            setStatusState(LOADING);
            return;
        }

        (async () => {
            setStatusState(LOADING);
            try {
                const prs = await getGlobalData('prs');
                setPRsState(prs);
                setStatusState(prs?.prs?.length ? READY : EMPTY);
            } catch (err) {
                setStatusState(FAILED);
            }
        })();
    }, [globalDataReady, getGlobalData]);

    const tabs = [{
        title: 'Pull Requests',
        badge: prsState?.prs?.length,
        content: <PullRequests data={prsState} stage="overview" status={statusState} />
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
