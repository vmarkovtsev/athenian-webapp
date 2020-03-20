import { getInsights as getInsightsWorkInProgress } from 'js/components/insights/stages/WorkInProgress';

import _ from 'lodash';

export const getInsights = (stage, data) => {
    const fn = {
        'work-in-progress': getInsightsWorkInProgress,
    }[stage];

    if (!fn) {
        return [];
    }

    return fn(data);
};
