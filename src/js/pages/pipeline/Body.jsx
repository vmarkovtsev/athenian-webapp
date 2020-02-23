import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useAuth0 } from 'js/context/Auth0';
import { useUserContext } from 'js/context/User';
import { useFiltersContext } from 'js/context/Filters';

import MainMetrics from 'js/components/pipeline/MainMetrics';
import Thumbnails from 'js/components/pipeline/Thumbnails';

import { getPipelineDataInitial, getPipelineDataAPI, fetchApi } from 'js/services/api';
import { usePRsContext } from 'js/context/PRs';

export default ({ children }) => {
    const { getTokenSilently } = useAuth0();
    const userContext = useUserContext();

    const [pipelineState, setPipelineData] = useState(getPipelineDataInitial());
    const { name } = useParams()
    const activeStageState = pipelineState.findIndex(stage => stage.tab.slug === name);

    const { dateInterval, repositories, contributors } = useFiltersContext();
    const { prs } = usePRsContext();

    useEffect(() => {
        if (!userContext || !repositories.length) {
            return;
        };

        getTokenSilently()
            .then(token => fetchApi(token, getPipelineDataAPI, userContext.defaultAccount.id, dateInterval, repositories, contributors))
            .then(setPipelineData);
    }, [userContext, dateInterval, repositories, contributors]);

    return (
        <>
            {withMainMetrics(prs, dateInterval)}
            <Thumbnails stages={pipelineState} activeCard={activeStageState} />
            {children}
        </>
    );
};

const withMainMetrics = (prs, dateInterval) => {
    const prCount = prs.filter(pr => (pr.created >= dateInterval.from && pr.created <= dateInterval.to)).length;
    const participants = prs.reduce((acc, pr) => {
        return [...pr.participants, ...pr.creators].reduce((dict, user) => {
            dict[user] = true;
            return dict;
        }, acc);
    }, {})

    const contribCount = Object.keys(participants).length;

    const leadTimeAvg = 33; // TODO(dpordomingo): avg to be calculated in another PR
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
