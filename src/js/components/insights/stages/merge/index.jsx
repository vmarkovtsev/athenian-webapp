import React from 'react';
import Box from 'js/components/insights/Box';
import DataWidget from 'js/components/DataWidget';
import { useApi } from 'js/hooks';

import { InsightsError } from 'js/components/insights/Helper';

import mergeDelays from 'js/components/insights/stages/merge/mergeDelays';


export default () => {
    const { api, ready: apiReady, context: apiContext } = useApi();

    if (!apiReady) {
        return null;
    }

    const fetcher = async () => {
        return Promise.resolve({
            mergeDelays: await mergeDelays.fetcher(api, apiContext)
        });
    };

    const plumber = (data) => ({
        mergeDelays: mergeDelays.plumber({
            ...data.mergeDelays, global: data.global
        }),
    });

    return (
        <DataWidget
          id={`merge-insights`}
          component={Inner} fetcher={fetcher} plumber={plumber}
        />
    );

};

const Inner = ({ data, error }) => {
    if (error) {
        return <InsightsError/>;
    }

    const insights = [
        mergeDelays.factory(data.mergeDelays),
    ];

    return (
        <>{insights.map((ins, i) => <Box meta={ins.meta} content={ins.content} key={i} />)}</>
    );
};
