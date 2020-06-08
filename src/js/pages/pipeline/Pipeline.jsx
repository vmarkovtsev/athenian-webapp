import { isInStage, happened, authored, stageHappening, PR_STAGE as prStage, PR_EVENT as prEvent } from 'js/services/prHelpers';
import { number } from 'js/services/format';
import { palette } from 'js/res/palette';

const distinct = (collection, extractor) => Array.from(new Set(collection.flatMap(extractor)));

export const pipelineStagesConf = [
    {
        title: 'Overview',
        summaryMetricTitle: 'Lead Time',
        slug: 'overview',
        metric: 'lead-time',
        stageName: 'leadtime',
        color: palette.stages.leadtime,
        hint: 'From the 1st commit of the Pull Requests until the code is being used in production',
    }, {
        metric: 'cycle-time',
    }, {
        title: 'Work in progress',
        slug: 'work-in-progress',
        metric: 'wip-time',
        stageName: prStage.WIP,
        color: palette.stages.wip,
        hint: 'From the 1st commit of the Pull Request until the review is requested',
        event: {
            before: 'First Commit',
            after: 'Review Requested',
        },
        prs: prs => prs.filter(pr => isInStage(pr, prStage.WIP)),
        stageCompleteCount: prs => prs.filter(pr => stageHappening(pr, prStage.WIP)).length,
        summary: (stageProportion, prs, dateInterval) => {
            const authoredPRs = authored(prs);
            const createdPrs = authoredPRs.filter(pr => dateInterval.from <= pr.created);
            const authors = distinct(createdPrs, pr => pr.authors);
            const repos = distinct(createdPrs, pr => pr.repository);
            return [
                ['proportion of the cycle time', number.percentage(stageProportion)],
                ['pull requests created', createdPrs.length],
                ['authors', authors.length],
                ['repositories', repos.length],
            ];
        },
    }, {
        title: 'Review',
        slug: 'review',
        metric: 'review-time',
        stageName: prStage.REVIEW,
        color: palette.stages.review,
        hint: 'From the moment the review is requested until the Pull Request is approved',
        event: {
            before: 'Review Requested',
            after: 'Approved',
        },
        prs: prs => prs.filter(pr => isInStage(pr, prStage.REVIEW)),
        stageCompleteCount: prs => prs.filter(pr => stageHappening(pr, prStage.REVIEW)).length,
        summary: (stageProportion, prs) => {
            const authoredPRs = authored(prs);
            const reviewAndReviewCompletePRs = authoredPRs.filter(pr => isInStage(pr, prStage.REVIEW));
            const reviewed = authoredPRs.filter(pr => {
                return happened(pr, prEvent.REVIEW) || happened(pr, prEvent.REJECTION) || happened(pr, prEvent.APPROVE);
            });

            const reviewers = distinct(reviewAndReviewCompletePRs, pr => pr.commentersReviewers);
            const repos = distinct(reviewAndReviewCompletePRs, pr => pr.repository);
            return [
                ['proportion of the cycle time', number.percentage(stageProportion)],
                ['pull requests reviewed', reviewed.length],
                ['reviewers', reviewers.length],
                ['repositories', repos.length],
            ];
        },
    }, {
        title: 'Merge',
        slug: 'merge',
        metric: 'merging-time',
        stageName: prStage.MERGE,
        color: palette.stages.merge,
        hint: 'From the moment the Pull Request is approved until it gets merged',
        event: {
            before: 'Approved',
            after: 'Merged',
        },
        prs: prs => prs.filter(pr => isInStage(pr, prStage.MERGE)),
        stageCompleteCount: prs => prs.filter(pr => stageHappening(pr, prStage.MERGE)).length,
        summary: (stageProportion, prs) => {
            const authoredPRs = authored(prs);
            const mergedPRs = authoredPRs.filter(pr => pr.merged);
            const mergerers = distinct(mergedPRs, pr => pr.mergers);
            const repos = distinct(mergedPRs, pr => pr.repository);
            return [
                ['proportion of the cycle time', number.percentage(stageProportion)],
                ['pull requests merged', mergedPRs.length],
                ['mergers', mergerers.length],
                ['repositories', repos.length],
            ];
        },
    }, {
        title: 'Release',
        slug: 'release',
        metric: 'release-time',
        stageName: prStage.RELEASE,
        color: palette.stages.release,
        hint: 'From the moment the Pull Request gets merged until it is shipped into production',
        event: {
            before: 'Merged',
            after: 'Released',
        },
        prs: prs => prs.filter(pr => isInStage(pr, prStage.RELEASE)),
        stageCompleteCount: prs => prs.filter(pr => stageHappening(pr, prStage.RELEASE)).length,
        summary: (stageProportion, prs) => {
            const authoredPRs = authored(prs);
            const releasedPRs = authoredPRs.filter(pr => pr.release_url);
            const releases = distinct(releasedPRs, pr => pr.release_url);
            const repos = distinct(releasedPRs, pr => pr.repository);
            return [
                ['proportion of the cycle time', number.percentage(stageProportion)],
                ['pull requests released', releasedPRs.length],
                ['releases', releases.length],
                ['repositories', repos.length],
            ];
        },
    },
];

export const getStage = (stages, slug) => stages.find(conf => conf.slug === slug);
export const getStageTitle = (slug) => {
    const conf = getStage(pipelineStagesConf, slug);
    return conf ? conf.title : null;
};
