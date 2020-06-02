import React from 'react';
import Box from 'js/components/insights/Box';
import DataWidget from 'js/components/DataWidget';
import { useApi } from 'js/hooks';

import { InsightsError } from 'js/components/insights/Helper';

import createdPRs from 'js/components/insights/stages/work-in-progress/createdPrs';
import mostActiveDevs from 'js/components/insights/stages/work-in-progress/mostActiveDevs';
import pullRequestRatioFlow from 'js/components/insights/stages/work-in-progress/pullRequestRatioFlow';
import pullRequestPerRepo from './pullRequestPerRepo';

export default () => {
    const { api, ready: apiReady, context: apiContext } = useApi();

    if (!apiReady) {
        return null;
    }

    const fetcher = async () => {
        return Promise.resolve({
            createdPRs: await createdPRs.fetcher(api, apiContext),
            pullRequestRatioFlow: await pullRequestRatioFlow.fetcher(api, apiContext),
        });
    };

    const plumber = (data) => ({
        createdPRs: createdPRs.plumber({
            ...data.createdPRs, global: data.global
        }),
        pullRequestPerRepo: pullRequestPerRepo.plumber({
            ...data.pullRequestPerRepo, global: data.global
        }, apiContext),
        mostActiveDevs: mostActiveDevs.plumber({
            ...data.mostActiveDevs, global: data.global
        }),
        pullRequestRatioFlow: pullRequestRatioFlow.plumber({
            ...data.pullRequestRatioFlow, global: data.global
        }),
    });

    return (
        <DataWidget
          id={`work-in-progress-insights`}
          component={Inner} fetcher={fetcher} plumber={plumber}
          globalDataIDs={['prs', 'prs-metrics.values']}
        />
    );

};

const Inner = ({ data, error }) => {
    if (error) {
        return <InsightsError/>;
    }

    let insights = [
        createdPRs.factory(data.createdPRs),
        pullRequestPerRepo.factory(data.pullRequestPerRepo),
        mostActiveDevs.factory(data.mostActiveDevs),
        pullRequestRatioFlow.factory(data.pullRequestRatioFlow),
    ];

    return (
        <>{insights.map((ins, i) => <Box meta={ins.meta} content={ins.content} key={i} />)}</>
    );
};
