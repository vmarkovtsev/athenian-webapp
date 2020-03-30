import getWipCharts from 'js/components/insights/stages/work-in-progress/index';
import getReviewCharts from 'js/components/insights/stages/review/index';
import getMergeCharts from 'js/components/insights/stages/merge/index';

// TODO: Passing data should be removed in favor of letting each chart
// retrieving its own data using the api.
export const getInsights = async (stage, api, context, data) => {
    const chartsGetterFn = {
        'work-in-progress': getWipCharts,
        'review': getReviewCharts,
        'merge': getMergeCharts,
    }[stage];

    const charts = chartsGetterFn ? chartsGetterFn() : [];

    return Promise.all(
        charts.map(
            async (def) => {
                const fetched = await def.fetcher(api, context, data);
                return Promise.resolve(def.factory(def.calculator(fetched)));
            }
        )
    );
};
