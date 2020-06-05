import React, { useState, useEffect } from 'react';

import { useDataContext } from 'js/context/Data';
import { StatusIndicator, READY, EMPTY, FAILED, LOADING } from 'js/components/ui/Spinner';

export default ({id, component, fetcher, plumber, globalDataIDs, config, propagateSpinner = false}) => {
    const conf = config ? config : {};
    const { get: getData, getGlobal: getGlobalData, set: setData, globalDataReady } = useDataContext();
    const [dataState, setDataState] = useState(null);
    const [statusState, setStatusState] = useState(LOADING);
    const [errorState, setErrorState] = useState(null);
    const [fetchingState, setFetchingState] = useState(false);

    console.log("Rendering CHART", id, globalDataReady, statusState, dataState);

    useEffect(() => {
        console.log("---> Rendering CHART: useEffect 1", id);
        const fetchAndSetData = async () => {
            try {
                console.log("---> Rendering CHART: useEffect 1 | async | fetching", id);
                let fetched = {};
                if (fetcher) {
                    fetched = await fetcher();
                }

                const globalData = {};
                for (const gid of globalDataIDs || []) {
                    const d = getGlobalData(gid);
                    if (!d) {
                        throw Error(`Missing global data with id ${gid} for data widget with id ${id}`);
                    }

                    const globalDataResolved = await d;
                    const err = asError(globalDataResolved)
                    if (err) {
                        throw err;
                    }

                    globalData[gid] = globalDataResolved;
                }

                const plumbedData = plumber({...fetched, global: globalData});
                console.log("---> Rendering CHART: useEffect 1 | async | fetching done", id);
                console.log("---> Rendering CHART: useEffect 1 | async | set data", plumbedData);
                setData(id, plumbedData);
                console.log("---> Rendering CHART: useEffect 1 | async | set status", READY);
            } catch (err) {
                console.log("---> Rendering CHART: useEffect 1 | async | set error", FAILED);
                setData(id, err);
            } finally {
                setFetchingState(false);
            }
        };

        const data = getData(id);
        if (!data) {
            console.log("---> Rendering CHART: useEffect 1 | set data", null);
            setStatusState(LOADING);
            setErrorState(null);
            setDataState(null);
            console.log("---> Rendering CHART: useEffect 1 | set state", LOADING);

            if (!globalDataReady) {
                console.log("---> Rendering CHART: useEffect 1 | waiting for global data", id, globalDataReady);
            } else if (!fetchingState) {
                setFetchingState(true);
                fetchAndSetData();
            }
        } else {
            let error, widgetData, status;
            if (asError(data)) {
                error = data;
                status = FAILED;
                console.error(error);
            } else {
                widgetData = data;
                status = widgetData && !widgetData.empty  ? READY : EMPTY;
            }

            console.log(`---> Rendering CHART: useEffect 1 | found ${error ? 'error' : 'data'}:`, error ? error : widgetData);
            console.log("---> Rendering CHART: useEffect 1 | set status", status);
            setErrorState(error);
            setStatusState(status);
            setDataState(widgetData);
        }
    }, [ id, getData, setData, fetcher, plumber, globalDataIDs, getGlobalData, globalDataReady, fetchingState ]);

    if (statusState !== READY && !propagateSpinner) {
        return <StatusIndicator status={statusState} />
    }

    const Component = component;
    return <Component data={dataState} error={errorState} status={statusState} {...conf} />;
};

export const asError = something => {
    if (!something) {
        return null;
    }

    if (something instanceof Error) {
        return something;
    } else if (something.error) {
        return something.error;
    }

    return null;
};
