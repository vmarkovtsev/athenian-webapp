import React, { useState, useEffect } from 'react';
import { useDataContext } from 'js/context/Data';
import { usePrevious } from 'js/hooks';

import Spinner from 'js/components/ui/Spinner';

export default ({id, component, fetcher, plumber, config, propagateSpinner = false}) => {
    const conf = config ? config : {};
    const { get: getData, set: setData } = useDataContext();
    const [dataState, setDataState] = useState(null);
    const [loadingDataState, setLoadingDataState] = useState(false);
    const prevLoadingDataState = usePrevious(loadingDataState);

    console.log("Rendering CHART", id, prevLoadingDataState, loadingDataState, dataState);

    useEffect(() => {
        console.log("---> Rendering CHART: useEffect 1", id);
        const fetchAndSetData = async () => {
            console.log("---> Rendering CHART: useEffect 1 | async | fetching", id);
            const fetched = await fetcher();
            const plumbedData = plumber(fetched);
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
            if (!loadingDataState) {
                setLoadingDataState(true);
                fetchAndSetData();
            }
        } else {
            setDataState(data);
        }
    }, [id, loadingDataState, getData, setData, fetcher, plumber]);

    useEffect(() => {
        console.log("---> Rendering CHART: useEffect 2", id, prevLoadingDataState, loadingDataState);
        if (!loadingDataState && prevLoadingDataState) {
            console.log("---> Rendering CHART: useEffect 2 | set data", getData(id));
            setDataState(getData(id));
        }
    }, [id, getData, prevLoadingDataState, loadingDataState]);

    const waiting = !dataState;
    const margin = conf.margin !== undefined ? conf.margin : 5;
    const spinner = (
        <div className={`row mt-${margin} mb-${margin} align-middle`}>
          <div className="col-12 text-center">
            <Spinner loading={true} color={conf.color || 'black'} />
          </div>
        </div>
    );

    if (waiting && !propagateSpinner) {
        return spinner;
    }

    if (propagateSpinner) {
        conf.spinner = spinner;
    }

    const Component = component;
    return <Component data={dataState} loading={waiting} {...conf} />;
};
