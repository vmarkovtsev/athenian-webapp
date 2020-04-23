import React, { useEffect } from 'react';
import _ from "lodash";

import PipelineContext from 'js/context/Pipeline';
import { useApi } from 'js/hooks';
import { PR_STAGE as prStage, isInStage, happened, authored, PR_EVENT as prEvent } from 'js/services/prHelpers';
import { useDataContext } from 'js/context/Data';
import { fetchPRsMetrics, getPreviousInterval } from 'js/services/api';
import { number } from 'js/services/format';
import moment from 'moment';
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
        stageCompleteCount: prs => prs.filter(pr => pr.completedStages.includes(prStage.WIP)).length,
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
        stageCompleteCount: prs => prs.filter(pr => pr.completedStages.includes(prStage.REVIEW)).length,
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
        stageCompleteCount: prs => prs.filter(pr => pr.completedStages.includes(prStage.MERGE)).length,
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
        stageCompleteCount: prs => prs.filter(pr => pr.completedStages.includes(prStage.RELEASE)).length,
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

export default ({ children }) => {
    const { api, ready: apiReady, context: apiContext } = useApi();
    const { setGlobal: setGlobalData } = useDataContext();

    useEffect(() => {
        if (!apiReady) {
            return;
        }

        const allMetrics = [
            'wip-time',
            'wip-count',
            'review-time',
            'review-count',
            'merging-time',
            'merging-count',
            'release-time',
            'release-count',
            'lead-time',
            'lead-count',
            'cycle-time',
            'cycle-count',
        ];

        const fetchGlobalPRMetrics = async () => {

            const fetchValues = async () => {
                const customGranularity = calculateGranularity(apiContext.interval);
                const data = await fetchPRsMetrics(
                    api, apiContext.account, ['all', customGranularity],
                    apiContext.interval, allMetrics,
                    { repositories: apiContext.repositories, developers: apiContext.contributors }
                );

                const allValues = _(allMetrics)
                      .zip(data.calculated[0].values[0].values)
                      .fromPairs()
                      .value();
                const customValues = _(data.calculated[1].values).reduce(
                    (result, v) => {
                        _(allMetrics).forEach((m, i) => {
                            (result[m] || (result[m] = [])).push(
                                {
                                    date: v.date,
                                    value: v.values[i] || 0
                                }
                            );
                        });

                        return result;
                    }, {});

                return {
                    all: allValues,
                    custom: customValues
                };
            };

            setGlobalData('prs-metrics.values', fetchValues());
        };

        const fetchGlobalPRMetricsVariations = async() => {

            const fetchValues = async () => {
                const currInterval = apiContext.interval;
                const prevInterval = getPreviousInterval(currInterval);

                const diffDays = moment(currInterval.to).diff(currInterval.from, 'days');
                const interval = {from: prevInterval.from,
                                  to: currInterval.to};

                const data = await fetchPRsMetrics(
                    api, apiContext.account, `${diffDays + 1} day`,
                    interval, allMetrics,
                    { repositories: apiContext.repositories, developers: apiContext.contributors }
                );

                const calcVariation = (prev, curr) => prev > 0 ? (curr - prev) * 100 / prev : 0;

                const prevValues = data.calculated[0].values[0].values;
                const currValues = data.calculated[0].values[1].values;

                return _(prevValues)
                    .zip(currValues)
                    .map((v, i) => [allMetrics[i], calcVariation(v[0], v[1])])
                    .fromPairs()
                    .value();
            };

            setGlobalData('prs-metrics.variations', fetchValues());
        };

        fetchGlobalPRMetrics();
        fetchGlobalPRMetricsVariations();
    }, [api, apiContext.account, apiContext.contributors, apiContext.interval, apiContext.repositories, apiReady, setGlobalData]);

    return (
        <PipelineContext metrics={{}}>
            {children}
        </PipelineContext>
    );
};

const calculateGranularity = (interval) => {
    const diff = moment(interval.to).diff(interval.from, 'days');

    if (diff <= 21) {
        return 'day';
    }

    if (diff <= 90) {
        return 'week';
    }

    return 'month';
};
