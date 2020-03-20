import React, { useState, useEffect } from 'react';

import PipelineContext from 'js/context/Pipeline';
import { useAuth0 } from 'js/context/Auth0';
import { useUserContext } from 'js/context/User';
import { useFiltersContext } from 'js/context/Filters';

import { getMetrics, fetchApi } from 'js/services/api';
import { number } from 'js/services/format';

import { palette } from 'js/res/palette';

const distinct = (collection, extractor) => Array.from(new Set(collection.flatMap(extractor)));

export const pipelineStagesConf = [
    {
        title: 'Lead Time',
        slug: 'overview',
        metric: 'lead-time',
        stageName: 'leadtime',
        color: palette.stages.leadtime,
        hint: 'Trom the 1st commit of the Pull Requests until the code is being used in production',
        event: {
            before: 'First Commit',
            after: 'Release',
        },
    }, {
        title: 'Work in progress',
        slug: 'work-in-progress',
        metric: 'wip-time',
        stageName: 'wip',
        color: palette.stages.wip,
        hint: 'From the 1st commit of the Pull Request until the review is requested',
        event: {
            before: 'First Commit',
            after: 'Review Requested',
        },
        prs: prs => prs.filter(pr => pr.stage === 'wip'),
        summary: (stage, prs, dateInterval) => {
            const createdPrs = prs.filter(pr => dateInterval.from < pr.created && pr.created < dateInterval.to);
            const authors = distinct(createdPrs, pr => pr.authors);
            const repos = distinct(createdPrs, pr => pr.repository);
            return [
                ['proportion of the lead time', number.percentage(stage.leadTimePercentage)],
                ['pull requests created', createdPrs.length],
                ['contributors', authors.length],
                ['repositories', repos.length],
            ];
        },
    }, {
        title: 'Review',
        slug: 'review',
        metric: 'review-time',
        stageName: 'review',
        color: palette.stages.review,
        hint: 'From the moment the review is requested until the Pull Request is approved',
        event: {
            before: 'Review Requested',
            after: 'Approved',
        },
        prs: prs => prs.filter(pr => pr.stage === 'review'),
        summary: (stage, prs) => {
            const reviewAndReviewCompletePRs = prs.filter(pr => pr.stage !== 'wip');
            const reviewed = reviewAndReviewCompletePRs.filter(pr => pr.comments || pr.review_comments)
            const reviewers = distinct(reviewAndReviewCompletePRs, pr => pr.commentersReviewers);
            const repos = distinct(reviewAndReviewCompletePRs, pr => pr.repository);
            return [
                ['proportion of the lead time', number.percentage(stage.leadTimePercentage)],
                ['pull requests reviewed', reviewed.length],
                ['reviewers', reviewers.length],
                ['repositories', repos.length],
            ];
        },
    }, {
        title: 'Merge',
        slug: 'merge',
        metric: 'merging-time',
        stageName: 'merge',
        color: palette.stages.merge,
        hint: 'From the moment the Pull Request is approved until it gets merged',
        event: {
            before: 'Approved',
            after: 'Merged',
        },
        prs: prs => prs.filter(pr => pr.stage === 'merge'),
        summary: (stage, prs) => {
            const mergedPRs = prs.filter(pr => pr.merged);
            const mergerers = distinct(mergedPRs, pr => pr.mergers);
            const repos = distinct(mergedPRs, pr => pr.repository);
            return [
                ['proportion of the lead time', number.percentage(stage.leadTimePercentage)],
                ['pull requests merged', mergedPRs.length],
                ['contributors', mergerers.length],
                ['repositories', repos.length],
            ];
        },
    }, {
        title: 'Release',
        slug: 'release',
        metric: 'release-time',
        stageName: 'release',
        color: palette.stages.release,
        hint: 'From the moment the Pull Request gets merged until it is shipped into production',
        event: {
            before: 'Merged',
            after: 'Released',
        },
        prs: prs => prs.filter(pr => pr.stage === 'release' || pr.stage === 'done'),
        summary: (stage, prs) => {
            const releasedPRs = prs.filter(pr => pr.release_url);
            const releases = distinct(releasedPRs, pr => pr.release_url);
            const repos = distinct(releasedPRs, pr => pr.repository);
            return [
                ['proportion of the lead time', number.percentage(stage.leadTimePercentage)],
                ['pull requests released', releasedPRs.length],
                ['releases', releases.length],
                ['repositories', repos.length],
            ];
        },
    },
];

const mainStagesNames = ['wip', 'review', 'merge', 'release'];

export const getStage = (stages, slug) => stages.find(conf => conf.slug === slug);

export default ({ children }) => {
    const { getTokenSilently } = useAuth0();
    const userContext = useUserContext();

    const [pipelineState, setPipelineState] = useState({ leadtime: {}, stages: [] });
    const { dateInterval, repositories, contributors } = useFiltersContext();

    useEffect(() => {
        if (!userContext || !repositories.length) {
            return;
        };

        getTokenSilently()
            .then(token => fetchApi(token, getMetrics, userContext.defaultAccount.id, dateInterval, repositories, contributors))
            .then(data => {
                let leadtime = {};
                const stages = [];
                pipelineStagesConf.forEach(metricConf => {
                    const metric = { ...metricConf, ...data[metricConf.metric] };
                    if (mainStagesNames.indexOf(metricConf.stageName) >= 0) {
                        stages.push(metric);
                    } else if (metricConf.stageName === 'leadtime') {
                        leadtime = metric;
                    }
                });

                if (leadtime.avg) {
                    stages.forEach(stage => stage.leadTimePercentage = 100 * stage.avg / leadtime.avg);
                }

                setPipelineState({ leadtime, stages });
            })
            .catch(err => console.error('Could not get pipeline metrics', err));
    }, [userContext, dateInterval, repositories, contributors, getTokenSilently]);

    return (
        <PipelineContext metrics={pipelineState}>
            {children}
        </PipelineContext>
    )
};
