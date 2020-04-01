import React, { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from 'js/context/Auth0';
import { useUserContext } from 'js/context/User';
import { SummaryMetrics, StageSummaryKPI } from 'js/components/pipeline/StageMetrics';
import Insights from 'js/components/insights/Insights';
import Tabs from 'js/components/layout/Tabs';
import PullRequests from 'js/components/pipeline/PullRequests';
import { getInsights } from 'js/components/insights/Helper';

import { pipelineStagesConf, getStage } from 'js/pages/pipeline/Pipeline';

import { useFiltersContext } from 'js/context/Filters';
import { usePipelineContext } from 'js/context/Pipeline';
import { usePRsContext } from 'js/context/PRs';

import { buildApi } from 'js/services/api';
import _ from "lodash";

const stageChartsStateReducer = (state, action) => {
    if (action.reset) {
        console.log("Resetting other stages data");
        return {[action.stageSlug]: action.result};
    }

    state[action.stageSlug] = action.result;
    return state;
};

export default () => {
    const userContext = useUserContext();
    const { getTokenSilently } = useAuth0();

    const [loadingApiCallState, setLoadingApiCallState] = useState(false);
    const [stageChartsState, dispatchStageChartsState] = useReducer(
        stageChartsStateReducer, {});

    const { stages: stagesContext } = usePipelineContext();
    const prsContext = usePRsContext();

    const { name: stageSlug } = useParams();
    const activeConf = getStage(pipelineStagesConf, stageSlug);
    const activeStage = getStage(stagesContext, stageSlug);

    const { ready: filtersReady, dateInterval, repositories, contributors } = useFiltersContext();
    const [latestFiltersUsedState, setLatestFiltersUsedState] = useState({
        dateInterval: null, repositories: [], contributors: []
    });

    useEffect(() => {
        if (!filtersReady) {
            console.log("filters not ready");
            return;
        };

        // TODO: this could be removed once not needed anymore to be passed
        // to `getInsights`. Anyway, this check is still an approximation since
        // an empty array could still be a valid result. Ideally also the
        // `PRsContext` should provide a `ready` state to query.
        if (prsContext.prs.length === 0) {
            console.log("prsContext not ready");
            return;
        }

        if (loadingApiCallState) {
            console.log("API call already running");
            return;
        }

        const emptyStage = !stageChartsState[stageSlug];
        const sameFilters = (
            _.isEqual(latestFiltersUsedState.dateInterval, dateInterval) &&
                _.isEqual(latestFiltersUsedState.repositories, repositories) &&
                _.isEqual(latestFiltersUsedState.contributors, contributors)
        );

        if (!emptyStage && sameFilters) {
            console.log("Filters didn't change and state is not empty: not calling api");
            return;
        }

        const updateData = async () => {
            setLoadingApiCallState(true);
            const token = await getTokenSilently();
            const api = buildApi(token);

            const context = {
                account: userContext.defaultAccount.id,
                interval: dateInterval,
                repositories: repositories,
                contributors: contributors
            };

            console.log(`CALLING API for slug: ${stageSlug} | ${filtersReady}`, context);
            // TODO: Don't pass `prsContext`. Each chart should calculate its own
            // data using the provided api.
            // So far we user `prsContext` as it's already queried calculated.
            // Making the chart call the api means querying the api again. We can
            // remove this once we implement some caching logic on the client
            // when querying.
            try {
                const result = await getInsights(stageSlug, api, context, prsContext);
                const action = {
                    stageSlug,
                    result
                };

                if (!sameFilters) {
                    action.reset = true;
                };

                console.log("Dispatching stage charts state change", action);
                dispatchStageChartsState(action);
            } catch(err) {
                console.log(err);
            } finally {
                console.log("Updating latest filters");
                setLatestFiltersUsedState({dateInterval, repositories, contributors});
                setLoadingApiCallState(false);
            }
        };

        updateData();
    }, [filtersReady, stageSlug, dateInterval, repositories, contributors, prsContext,
        getTokenSilently, userContext.defaultAccount.id,
        latestFiltersUsedState, loadingApiCallState, stageChartsState]);

    if (!activeConf) {
        return <p>{stageSlug} is not a valid pipeline stage.</p>;
    }

    if (!activeStage) {
        return null;
    }

    const filteredPRs = {
        prs: activeStage.prs(prsContext.prs),
        users: prsContext.users,
    };

    return <>
        <SummaryMetrics conf={activeStage}>
            <StageSummaryKPI data={activeStage.summary(activeStage, prsContext.prs, dateInterval)} />
        </SummaryMetrics>

        <Tabs tabs={[
            {
                title: 'Insights',
                content: <Insights loading={!filtersReady || loadingApiCallState} insights={stageChartsState[stageSlug] || []} />,
            },
            {
                title: 'Pull Requests',
                badge: filteredPRs.prs.length,
                content: <PullRequests data={filteredPRs} stage={activeStage.stageName} />
            }
        ]} />
    </>;
};
