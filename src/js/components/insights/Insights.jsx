import React, { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useDataContext } from 'js/context/Data';
import { useApi } from 'js/hooks';
import { getInsights } from 'js/components/insights/Helper';

import _ from "lodash";

import Box from 'js/components/insights/Box';
import Spinner from 'js/components/ui/Spinner';
import { ComingSoon } from 'js/components/layout/Empty';

const stageChartsStateReducer = (state, action) => {
    if (action.reset) {
        console.log("Resetting other stages data");
        return {[action.stageSlug]: action.result};
    }

    return {...state, [action.stageSlug]: action.result};
};

export default () => {
    const { getGlobal: getGlobalData, globalDataReady } = useDataContext();
    const { api, ready: apiReady, context: apiContext } = useApi();
    const { name: stageSlug } = useParams();

    const [latestApiContextUsedState, setLatestApiContextUsedState] = useState({});
    const [loadingApiCallState, setLoadingApiCallState] = useState(false);
    const [stageChartsState, dispatchStageChartsState] = useReducer(
        stageChartsStateReducer, {});

    useEffect(() => {
        if (!apiReady || !globalDataReady) {
            console.log("api not ready");
            return;
        };

        if (loadingApiCallState) {
            console.log("API call already running");
            return;
        }

        const stageValue = stageChartsState[stageSlug];
        const sameFilters = _.isEqual(latestApiContextUsedState, apiContext);
        if (!!stageValue && sameFilters) {
            console.log("Filters didn't change and state is not empty: not calling api", stageValue);
            return;
        }

        const updateData = async () => {
            setLoadingApiCallState(true);
            const prs = await getGlobalData('prs');
            console.log(`CALLING API for slug: ${stageSlug}`, apiContext);

            const action = {
                stageSlug,
                reset: !sameFilters
            };

            // TODO: Don't pass `prs` global data manually. Each insight chart should
            // be refactored to use the self-loader `js/components/DataWidget` component
            try {
                action.result = await getInsights(stageSlug, api, apiContext, prs);
            } catch(err) {
                action.result = err;
                console.log(err);
            } finally {
                console.log("Updating latest filters");
                setLatestApiContextUsedState(apiContext);
                console.log("Dispatching stage charts state change", action);
                dispatchStageChartsState(action);
                setLoadingApiCallState(false);
            }
        };

        updateData();
    }, [stageSlug, api, apiContext, apiReady, latestApiContextUsedState, loadingApiCallState, stageChartsState, globalDataReady, getGlobalData]);

    const insights = stageChartsState[stageSlug];
    if (insights instanceof Error) {
        return (
            <div className="row mt-5 mb-5">
              <div className="col-12 mt-5 text-center">
                <span>An error occurred when loading insights charts</span>
              </div>
            </div>
        );
    }

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

    if (insights.length === 0) {
        return <ComingSoon />;
    }

    return (
        <>{insights.map((ins, i) => <Box meta={ins.meta} content={ins.content} key={i} />)}</>
    );
}
