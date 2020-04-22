import React, { useState, useEffect } from 'react';
import { useDataContext } from 'js/context/Data';
import { usePrevious } from 'js/hooks';
import _ from "lodash";
import Spinner from 'js/components/ui/Spinner';

export default ({id, component, fetcher, plumber, globalDataIDs, config, propagateSpinner = false}) => {
    const conf = config ? config : {};
    const { get: getData, getGlobal: getGlobalData, set: setData, globalDataReady } = useDataContext();
    const [dataState, setDataState] = useState(null);
    const [loadingDataState, setLoadingDataState] = useState(false);
    const prevLoadingDataState = usePrevious(loadingDataState);

    console.log("Rendering CHART", id, globalDataReady, prevLoadingDataState, loadingDataState, dataState);

    useEffect(() => {
        console.log("---> Rendering CHART: useEffect 1", id);
        const fetchAndSetData = async () => {
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

                globalData[gid] = await d;
            }

            const plumbedData = plumber({...fetched, global: globalData});
            console.log("---> Rendering CHART: useEffect 1 | async | fetching done", id);
            console.log("---> Rendering CHART: useEffect 1 | async | set data", plumbedData);
            setData(id, plumbedData);
            console.log("---> Rendering CHART: useEffect 1 | async | set loading", false);
            setLoadingDataState(false);
        };

        const data = getData(id);
        if (!data) {
            console.log("---> Rendering CHART: useEffect 1 | set data", null);
            setDataState(null);
            console.log("---> Rendering CHART: useEffect 1 | set loading", true);

            if (!globalDataReady) {
                console.log("---> Rendering CHART: useEffect 1 | waiting for global data", id, globalDataReady);
            } else if (!loadingDataState) {
                setLoadingDataState(true);
                fetchAndSetData();
            }
        } else {
            console.log("---> Rendering CHART: useEffect 1 | found data", data);
            setDataState(data);
        }
    }, [id, loadingDataState, getData, setData, fetcher, plumber, globalDataIDs, getGlobalData, globalDataReady]);

    useEffect(() => {
        console.log("---> Rendering CHART: useEffect 2", id, prevLoadingDataState, loadingDataState);
        if (!loadingDataState && prevLoadingDataState) {
            console.log("---> Rendering CHART: useEffect 2 | set data", getData(id));
            setDataState(getData(id));
        }
    }, [id, getData, prevLoadingDataState, loadingDataState]);

    const waiting = !dataState;
    const spinner = buildSpinner(conf);

    if (waiting && !propagateSpinner) {
        return spinner;
    }

    if (propagateSpinner) {
        // this should be uniformed, not done yet for backward compatibility
        conf.spinner = spinner;
        conf.spinnerBuilder = buildSpinner;
    }

    const Component = component;
    return <Component data={dataState} loading={waiting} {...conf} />;
};

const buildSpinner = (conf) => {
    const margin = conf.margin !== undefined ? conf.margin : 5;
    return (
        <div className={`row mt-${margin} mb-${margin} mx-auto align-middle`}>
          <div className="col-12 text-center">
            <Spinner loading={true} color={conf.color || 'black'} />
          </div>
        </div>
    );
};
