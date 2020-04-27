import React from 'react';
import Box from 'js/components/insights/Box';
import DataWidget from 'js/components/DataWidget';
import { useApi } from 'js/hooks';

import { InsightsError } from 'js/components/insights/Helper';

import waitTimeFirstReview from 'js/components/insights/stages/review/waitTimeFirstReview';
import pullRequestSize from 'js/components/insights/stages/review/pullRequestSize';
import reviewActivity from 'js/components/insights/stages/review/reviewActivity';


export default () => {
    const { api, ready: apiReady, context: apiContext } = useApi();

    if (!apiReady) {
        return null;
    }

    const fetcher = async () => {
        return Promise.resolve({
            reviewActivity: await reviewActivity.fetcher(api, apiContext)
        });
    };

    const plumber = (data) => ({
        waitTimeFirstReview: waitTimeFirstReview.plumber({
            ...data.waitTimeFirstReview, global: data.global
        }),
        pullRequestSize: pullRequestSize.plumber({
            ...data.pullRequestSize, global: data.global
        }),
        reviewActivity: reviewActivity.plumber({
            ...data.reviewActivity, global: data.global
        }),
    });

    return (
        <DataWidget
          id={`review-insights`}
          component={Inner} fetcher={fetcher} plumber={plumber}
          globalDataIDs={['prs', 'prs-metrics.values', 'prs-metrics.variations']}
        />
    );

};

const Inner = ({ data, error }) => {
    if (error) {
        return <InsightsError/>;
    }

    const insights = [
        waitTimeFirstReview.factory(data.waitTimeFirstReview),
        pullRequestSize.factory(data.pullRequestSize),
        reviewActivity.factory(data.reviewActivity),
    ];

    return (
        <>{insights.map((ins, i) => <Box meta={ins.meta} content={ins.content} key={i} />)}</>
    );
};
