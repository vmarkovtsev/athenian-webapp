import React from 'react';
import InsightsWorkInProgress from 'js/components/insights/stages/work-in-progress/index';
import InsightsReview from 'js/components/insights/stages/review/index';
import InsightsMerge from 'js/components/insights/stages/merge/index';

import { ComingSoon } from 'js/components/layout/Empty';

export const getInsights = (stage, api, context, data) => {
    const Component = {
        'work-in-progress': InsightsWorkInProgress,
        'review': InsightsReview,
        'merge': InsightsMerge,
    }[stage] || ComingSoon;

    return <Component />;
};

export const InsightsError = () => (
    <div className="row mt-5 mb-5">
      <div className="col-12 mt-5 text-center">
        <span>An error occurred when loading insights charts</span>
      </div>
    </div>
);
