import React, { useState, useEffect } from 'react';

import PipelineContext from 'js/context/Pipeline';
import { useAuth0 } from 'js/context/Auth0';
import { useUserContext } from 'js/context/User';
import { useFiltersContext } from 'js/context/Filters';

import { getMetrics, fetchApi } from 'js/services/api';
import { number } from 'js/services/format';

import { palette } from 'js/res/palette';

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
        summary: () => {
            return [
                ['proportion of the lead time', number.percentage(30)],
                ['pull requests created', 10],
                ['contributors', 5],
                ['repositories', 2],
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
        summary: () => {
            return [
                ['proportion of the lead time', number.percentage(20)],
                ['pull requests reviewed', 54],
                ['reviewers', 12],
                ['repositories', 4],
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
        summary: () => {
            return [
                ['proportion of the lead time', number.percentage(45)],
                ['pull requests merged', 2],
                ['contributors', 12],
                ['repositories', 8],
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
        summary: () => {
            return [
                ['proportion of the lead time', number.percentage(5)],
                ['pull requests released', 1],
                ['releases', 2],
                ['repositories', 1],
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
    }, [userContext, dateInterval, repositories, contributors]);

    return (
        <PipelineContext metrics={pipelineState}>
            {children}
        </PipelineContext>
    )
};
