import waitTimeFirstReview from 'js/components/insights/stages/review/waitTimeFirstReview';
import pullRequestSize from 'js/components/insights/stages/review/pullRequestSize';
import reviewActivity from 'js/components/insights/stages/review/reviewActivity';

export default () => [
    waitTimeFirstReview,
    pullRequestSize,
    reviewActivity,
];
