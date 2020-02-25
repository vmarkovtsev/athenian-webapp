import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useAuth0 } from 'js/context/Auth0';
import { useUserContext } from 'js/context/User';
import { useFiltersContext } from 'js/context/Filters';

import MainMetrics from 'js/components/pipeline/MainMetrics';
import Thumbnails from 'js/components/pipeline/Thumbnails';

import { getMetrics, fetchApi } from 'js/services/api';
import { usePRsContext } from 'js/context/PRs';

import { palette } from 'js/res/palette';

export const pipelineStagesConf = [
    {
        title: 'Work in progress',
        slug: 'work-in-progress',
        metric: 'wip-time',
        stageName: 'wip',
        color: palette.stages.wip,
        hint: 'From the 1st commit of the Pull Request until the review is requested.',
    }, {
        title: 'Review',
        slug: 'review',
        metric: 'review-time',
        stageName: 'review',
        color: palette.stages.review,
        hint: 'From the moment the review is requested until the Pull Request is approved',
    }, {
        title: 'Merge',
        slug: 'merge',
        metric: 'merging-time',
        stageName: 'merge',
        color: palette.stages.merge,
        hint: 'From the moment the Pull Request is approved until it gets merged',
    }, {
        title: 'Release',
        slug: 'release',
        metric: 'release-time',
        stageName: 'release',
        color: palette.stages.release,
        hint: 'From the moment the Pull Request gets merged until it is shipped into production',
    },
];

export default ({ children }) => {
    const { getTokenSilently } = useAuth0();
    const userContext = useUserContext();

    const [pipelineState, setPipelineState] = useState([]);
    const [leadTimeState, setLeadTimeState] = useState({});
    const { name } = useParams()
    const activeStageState = pipelineStagesConf.findIndex(metric => metric.slug === name);

    const { dateInterval, repositories, contributors } = useFiltersContext();
    const { prs } = usePRsContext();

    useEffect(() => {
        if (!userContext || !repositories.length) {
            return;
        };

        getTokenSilently()
            .then(token => fetchApi(token, getMetrics, userContext.defaultAccount.id, dateInterval, repositories, contributors))
            .then(data => {
                setPipelineState(pipelineStagesConf.map(stageConf => ({ ...stageConf, ...data[stageConf.metric] })));
                setLeadTimeState(data['lead-time']);
            });
    }, [userContext, dateInterval, repositories, contributors]);

    return (
        <>
            {withMainMetrics(leadTimeState, prs, dateInterval)}
            <Thumbnails prs={prs} stages={pipelineState} activeCard={activeStageState} />
            {children}
        </>
    );
};

const withMainMetrics = (leadTimeData, prs, dateInterval) => {
    const prCount = prs.filter(pr => (pr.created >= dateInterval.from && pr.created <= dateInterval.to)).length;
    const participants = prs.reduce((acc, pr) => {
        return [...pr.participants, ...pr.creators].reduce((dict, user) => {
            dict[user] = true;
            return dict;
        }, acc);
    }, {})

    const contribCount = Object.keys(participants).length;

    const leadTimeAvg = leadTimeData.avg;
    const leadTimeVariation = 20; //TODO(dpordomingo): variations to be calculated in another PR
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
