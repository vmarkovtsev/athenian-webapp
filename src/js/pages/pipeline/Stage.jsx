import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import { StageSummaryMetrics } from 'js/components/pipeline/StageMetrics';
import Insights from 'js/components/insights/Insights';
import Tabs from 'js/components/layout/Tabs';
import PullRequests from 'js/components/pipeline/PullRequests';
import { LOADING, READY, FAILED, EMPTY } from 'js/components/ui/Spinner';

import { pipelineStagesConf, getStage } from 'js/pages/pipeline/Pipeline';
import { useDataContext } from 'js/context/Data';

export default () => {
    const { getGlobal: getGlobalData, globalDataReady } = useDataContext();
    const [prsState, setPRsState] = useState({ prs: [], users: [] });
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


    const { name: stageSlug } = useParams();
    const activeStage = getStage(pipelineStagesConf, stageSlug);

    if (!activeStage) {
        return <p>{stageSlug} is not a valid pipeline stage.</p>;
    }

    const filteredPRs = {
        prs: prsState && activeStage.prs(prsState.prs),
        users: prsState && prsState.users,
    };

    return (
        <>
          <StageSummaryMetrics name={activeStage.stageName} stage={activeStage} />
          <Tabs tabs={[
              {
                  title: 'Insights',
                  content: <Insights />,
              },
              {
                  title: 'Pull Requests',
                  badge: filteredPRs.prs && filteredPRs.prs.length,
                  content: <PullRequests
                      data={filteredPRs}
                      stage={activeStage.stageName}
                      status={statusState}
                  />
              }
          ]} />
        </>
    );
};
