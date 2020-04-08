import React from 'react';
import { useParams } from "react-router-dom";

import { usePipelineContext } from 'js/context/Pipeline';
import { usePRsContext } from 'js/context/PRs';

import MainMetrics from 'js/components/pipeline/MainMetrics';
import Thumbnails from 'js/components/pipeline/Thumbnails';

import { pipelineStagesConf, getStage } from 'js/pages/pipeline/Pipeline';

import _ from 'lodash';

export default ({ children }) => {
    const prsContext = usePRsContext();
    const { leadtime: leadtimeContext, cycletime: cycleTimeContext, stages: stagesContext } = usePipelineContext();
    const { name: stageSlug } = useParams();
    const activeConf = getStage(pipelineStagesConf, stageSlug);

    return (
        <>
            {withMainMetrics(leadtimeContext, cycleTimeContext, prsContext)}
            <Thumbnails prs={prsContext.curr.prs} stages={stagesContext} activeCard={activeConf && activeConf.slug} />
            {children}
        </>
    );
};

const withMainMetrics = (leadTimeData = {}, cycleTimeData = {}, prsContext) => {
    const prevPRsCount = prsContext.prev.prs.length;
    const currPRsCount = prsContext.curr.prs.length;

    const countContribs = (prs) => _(prs)
          .flatMap(pr => pr.participants)
          .map("id")
          .uniq()
          .value()
          .length;

    const calcVariation = (prev, curr) => prev > 0 ? (curr - prev) * 100 / prev : 0;

    const prevContribsCount = countContribs(prsContext.prev.prs);
    const currContribsCount = countContribs(prsContext.curr.prs);

    const leadTimeAvg = leadTimeData.avg;
    const leadTimeVariation = leadTimeData.variation;

    const cycleTimeAvg = cycleTimeData.avg;
    const cycleTimeVariation = cycleTimeData.variation;

    const createdPRsVariation = calcVariation(prevPRsCount, currPRsCount);
    const contribsVariation = calcVariation(prevContribsCount, currContribsCount);

    return (
        <MainMetrics
            leadTimeAvg={leadTimeAvg} leadTimeVariation={leadTimeVariation}
            cycleTimeAvg={cycleTimeAvg} cycleTimeVariation={cycleTimeVariation}
            createdPRsAvg={currPRsCount} createdPRsVariation={createdPRsVariation}
            contribsAvg={currContribsCount} contribsVariation={contribsVariation}
        />
    );
};
