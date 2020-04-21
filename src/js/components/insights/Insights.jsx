import React, { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { usePRsContext } from 'js/context/PRs';
import { useApi } from 'js/hooks';
import { getInsights } from 'js/components/insights/Helper';

import _ from "lodash";

import Box from 'js/components/insights/Box';
import Spinner from 'js/components/ui/Spinner';

const stageChartsStateReducer = (state, action) => {
    if (action.reset) {
        console.log("Resetting other stages data");
        return {[action.stageSlug]: action.result};
    }

    state[action.stageSlug] = action.result;
    return state;
};

export default () => {
    const prsContext = usePRsContext();
    const { api, ready: apiReady, context: apiContext } = useApi();
    const { name: stageSlug } = useParams();

    const [latestApiContextUsedState, setLatestApiContextUsedState] = useState({});
    const [loadingApiCallState, setLoadingApiCallState] = useState(false);
    const [stageChartsState, dispatchStageChartsState] = useReducer(
        stageChartsStateReducer, {});

    useEffect(() => {
        if (!apiReady) {
            console.log("api not ready");
            return;
        };

        if (loadingApiCallState) {
            console.log("API call already running");
            return;
        }

        // TODO: this could be removed once not needed anymore to be passed
        // to `getInsights`. Anyway, this check is still an approximation since
        // an empty array could still be a valid result. Ideally also the
        // `PRsContext` should provide a `ready` state to query.
        if (prsContext.prs.length === 0) {
            console.log("prsContext not ready");
            return;
        }

        const emptyStage = !stageChartsState[stageSlug];
        const sameFilters = _.isEqual(latestApiContextUsedState, apiContext);
        if (!emptyStage && sameFilters) {
            console.log("Filters didn't change and state is not empty: not calling api");
            return;
        }

        const updateData = async () => {
            setLoadingApiCallState(true);
            console.log(`CALLING API for slug: ${stageSlug}`, apiContext);
            // TODO: Don't pass `prsContext`. Each chart should calculate its own
            // data using the provided api.
            // So far we user `prsContext` as it's already queried calculated.
            // Making the chart call the api means querying the api again. We can
            // remove this once we implement some caching logic on the client
            // when querying.
            try {
                // TODO: Each insight chart should be refactored to use the self-loader
                // `js/components/charts/Chart` component
                const result = await getInsights(stageSlug, api, apiContext, prsContext);
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
                setLatestApiContextUsedState(apiContext);
                setLoadingApiCallState(false);
            }
        };

        updateData();
    }, [stageSlug, api, apiContext, apiReady, latestApiContextUsedState,
        prsContext, loadingApiCallState, stageChartsState]);

    const insights = stageChartsState[stageSlug];
    const loading = !insights || !apiReady || loadingApiCallState;
    if (loading) {
        return (
            <div className="row mt-5 mb-5">
              <div className="col-12 mt-5 text-center">
                <Spinner loading={loading} />
              </div>
            </div>
        );
    }

    return (
        <>{insights.map((ins, i) => <Box meta={ins.meta} content={ins.content} key={i} />)}</>
    );
}
