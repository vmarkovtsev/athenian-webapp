import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useAuth0 } from 'js/context/Auth0';
import { useUserContext } from 'js/context/User';
import { useFiltersContext } from 'js/context/Filters';

import MainMetrics from 'js/components/pipeline/MainMetrics';
import Thumbnails from 'js/components/pipeline/Thumbnails';

import { getPipelineDataInitial, getPipelineDataAPI, fetchApi } from 'js/services/api';

export default ({ children }) => {
    const { getTokenSilently } = useAuth0();
    const userContext = useUserContext();

    const [pipelineState, setPipelineData] = useState(getPipelineDataInitial());
    const { name } = useParams()
    const activeStageState = pipelineState.findIndex(stage => stage.tab.slug === name);

    const { dateInterval, repositories, contributors } = useFiltersContext();

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
            <MainMetrics />
            <Thumbnails stages={pipelineState} activeCard={activeStageState} />
            {children}
        </>
    );
};
