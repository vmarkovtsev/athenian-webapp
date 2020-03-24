import { getInsights as getInsightsWorkInProgress } from 'js/components/insights/stages/WorkInProgress';
import { getInsights as getInsightsReview } from 'js/components/insights/stages/Review';

import _ from 'lodash';

// TODO: Passing data should be removed in favor of letting each chart
// retrieving its own data using the api.
export const getInsights = (stage, api, context, data) => {
    const fn = {
        'work-in-progress': getInsightsWorkInProgress,
        'review': getInsightsReview
    }[stage];

    if (!fn) {
        return [];
    }

    return fn(api, context, data);
};
