import { getInsights as getInsightsWorkInProgress } from 'js/components/insights/stages/WorkInProgress';
import { getInsights as getInsightsReview } from 'js/components/insights/stages/Review';

import _ from 'lodash';

export const getInsights = (stage, data) => {
    const fn = {
        'work-in-progress': getInsightsWorkInProgress,
        'review': getInsightsReview
    }[stage];

    if (!fn) {
        return [];
    }

    return fn(data);
};
