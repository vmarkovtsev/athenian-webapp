import React from 'react';
import { useParams } from "react-router-dom";

import { usePipelineContext } from 'js/context/Pipeline';
import { usePRsContext } from 'js/context/PRs';

import MainMetrics from 'js/components/pipeline/MainMetrics';
import Thumbnails from 'js/components/pipeline/Thumbnails';

import { pipelineStagesConf, getStage } from 'js/pages/pipeline/Pipeline';

export default ({ children }) => {
    const { prs: prsContext } = usePRsContext();
    const { leadtime: leadtimeContext, stages: stagesContext } = usePipelineContext();
    const { name: stageSlug } = useParams();
    const activeConf = getStage(pipelineStagesConf, stageSlug);

    return (
        <>
            {withMainMetrics(leadtimeContext, prsContext)}
            <Thumbnails prs={prsContext} stages={stagesContext} activeCard={activeConf && activeConf.slug} />
            {children}
        </>
    );
};

const withMainMetrics = (leadTimeData = {}, prs) => {
    const prCount = prs.length;
    const participants = prs.reduce((acc, pr) => {
        return pr.participants.reduce((dict, user) => {
            dict[user.id] = true;
            return dict;
        }, acc);
    }, {})

    const contribCount = Object.keys(participants).length;

    const leadTimeAvg = leadTimeData.avg;
    const leadTimeVariation = leadTimeData.variation;
    const createdPRsVariation = -5; // TODO(dpordomingo): variations to be calculated in another PR
    const contribsVariation = 10; // TODO(dpordomingo): variations to be calculated in another PR

    return (
        <MainMetrics
            leadTimeAvg={leadTimeAvg} leadTimeVariation={leadTimeVariation}
            createdPRsAvg={prCount} createdPRsVariation={createdPRsVariation}
            contribsAvg={contribCount} contribsVariation={contribsVariation}
        />
    );
};
