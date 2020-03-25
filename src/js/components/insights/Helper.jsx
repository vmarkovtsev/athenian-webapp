import { getCharts as getWipCharts } from 'js/components/insights/stages/WorkInProgress';
import { getCharts as getReviewCharts } from 'js/components/insights/stages/Review';

import _ from 'lodash';

// TODO: Passing data should be removed in favor of letting each chart
// retrieving its own data using the api.
export const getInsights = async (stage, api, context, data) => {
    const chartsGetterFn = {
        'work-in-progress': getWipCharts,
        'review': getReviewCharts
    }[stage];

    let charts = [];
    if (chartsGetterFn) {
        charts = chartsGetterFn();
    }

    return Promise.all(
        charts.map(
            async (def) => {
                const fetched = await def.fetcher(api, context, data);
                return Promise.resolve(def.factory(def.calculator(fetched)));
            }
        )
    );
};
