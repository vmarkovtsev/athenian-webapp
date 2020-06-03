import React from 'react';
import Box from 'js/components/insights/Box';
import DataWidget from 'js/components/DataWidget';
import { useApi } from 'js/hooks';

import { InsightsError } from 'js/components/insights/Helper';

import mergeDelays from 'js/components/insights/stages/merge/mergeDelays';
import abandonedWork from 'js/components/insights/stages/merge/abandonedWork';


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
        abandonedWork: abandonedWork.plumber({
            ...data.abandonedWork, global: data.global
        }),
    });

    return (
        <DataWidget
          id={`merge-insights`}
          component={Inner} fetcher={fetcher} plumber={plumber}
          globalDataIDs={['prs', 'prs-metrics.values']}
        />
    );

};

const Inner = ({ data, error }) => {
    if (error) {
        return <InsightsError/>;
    }

    const insights = [
        mergeDelays.factory(data.mergeDelays),
        abandonedWork.factory(data.abandonedWork),
    ];

    return (
        <>{insights.map((ins, i) => <Box meta={ins.meta} content={ins.content} key={i} />)}</>
    );
};
