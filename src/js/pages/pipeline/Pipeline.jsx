import React, { useState, useEffect } from 'react';

import PipelineContext from 'js/context/Pipeline';
import { useAuth0 } from 'js/context/Auth0';
import { useUserContext } from 'js/context/User';
import { useFiltersContext } from 'js/context/Filters';

import { getMetrics, fetchApi } from 'js/services/api';
import { PR_STAGE as prStage, isInStage, happened, PR_EVENT as prEvent } from 'js/services/prHelpers';
import { number } from 'js/services/format';

import { palette } from 'js/res/palette';

const distinct = (collection, extractor) => Array.from(new Set(collection.flatMap(extractor)));

export const pipelineStagesConf = [
    {
        title: 'Overview',
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
        stageCompleteCount: prs => prs.filter(pr => pr.completedStages.includes(prStage.WIP)).length,
        summary: (stage, prs, dateInterval) => {
            const createdPrs = prs.filter(pr => dateInterval.from <= pr.created);
            const authors = distinct(createdPrs, pr => pr.authors);
            const repos = distinct(createdPrs, pr => pr.repository);
            return [
                ['proportion of the cycle time', number.percentage(stage.overallProportion)],
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
        stageCompleteCount: prs => prs.filter(pr => pr.completedStages.includes(prStage.REVIEW)).length,
        summary: (stage, prs) => {
            const reviewAndReviewCompletePRs = prs.filter(pr => isInStage(pr, prStage.REVIEW));
            const reviewed = reviewAndReviewCompletePRs.filter(pr => {
                if (pr.comments || pr.review_comments) {
                    return true;
                }

                return happened(pr, prEvent.REVIEW) || happened(pr, prEvent.REJECTION) || happened(pr, prEvent.APPROVE);
            });

            const reviewers = distinct(reviewAndReviewCompletePRs, pr => pr.commentersReviewers);
            const repos = distinct(reviewAndReviewCompletePRs, pr => pr.repository);
            return [
                ['proportion of the cycle time', number.percentage(stage.overallProportion)],
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
        stageCompleteCount: prs => prs.filter(pr => pr.completedStages.includes(prStage.MERGE)).length,
        summary: (stage, prs) => {
            const mergedPRs = prs.filter(pr => pr.merged);
            const mergerers = distinct(mergedPRs, pr => pr.mergers);
            const repos = distinct(mergedPRs, pr => pr.repository);
            return [
                ['proportion of the cycle time', number.percentage(stage.overallProportion)],
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
        stageCompleteCount: prs => prs.filter(pr => pr.completedStages.includes(prStage.RELEASE)).length,
        summary: (stage, prs) => {
            const releasedPRs = prs.filter(pr => pr.release_url);
            const releases = distinct(releasedPRs, pr => pr.release_url);
            const repos = distinct(releasedPRs, pr => pr.repository);
            return [
                ['proportion of the cycle time', number.percentage(stage.overallProportion)],
                ['pull requests released', releasedPRs.length],
                ['releases', releases.length],
                ['repositories', repos.length],
            ];
        },
    },
];

const mainStagesNames = ['wip', 'review', 'merge', 'release'];

export const getStage = (stages, slug) => stages.find(conf => conf.slug === slug);
export const getStageTitle = (slug) => {
    const conf = getStage(pipelineStagesConf, slug);
    return conf ? conf.title : null;
};

export default ({ children }) => {
    const { getTokenSilently } = useAuth0();
    const userContext = useUserContext();

    const [pipelineState, setPipelineState] = useState({ leadtime: {}, cycletime: {}, stages: [] });
    const { dateInterval, repositories, contributors } = useFiltersContext();

    useEffect(() => {
        if (!userContext || !repositories.length) {
            return;
        };

        getTokenSilently()
            .then(token => fetchApi(token, getMetrics, userContext.defaultAccount.id, dateInterval, repositories, contributors))
            .then(data => {
                let leadtime = {};
                let cycletime = {};
                const stages = [];
                pipelineStagesConf.forEach(metricConf => {
                    const metric = { ...metricConf, ...data[metricConf.metric] };
                    if (mainStagesNames.indexOf(metricConf.stageName) >= 0) {
                        stages.push(metric);
                    } else if (metricConf.stageName === 'leadtime') {
                        leadtime = metric;
                    } else if (metricConf.metric === 'cycle-time') {
                        cycletime = metric;
                    }
                });

                if (leadtime.avg) {
                    stages.forEach(stage => stage.overallProportion = 100 * stage.avg / cycletime.avg);
                }

                setPipelineState({ leadtime, cycletime, stages });
            })
            .catch(err => console.error('Could not get pipeline metrics', err));
    }, [userContext, dateInterval, repositories, contributors, getTokenSilently]);

    return (
        <PipelineContext metrics={pipelineState}>
            {children}
        </PipelineContext>
    )
};
