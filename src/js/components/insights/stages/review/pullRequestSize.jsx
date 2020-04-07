import { SimpleKPI, MultiKPI } from 'js/components/insights/KPI';
import BubbleChart from 'js/components/insights/charts/library/BubbleChart';
import { PR_STAGE } from 'js/services/prHelpers';

import moment from 'moment';
import _ from 'lodash';

const pullRequestSize = {
    fetcher: async (api, context, data) => {
        // TODO: call the api to avoid receiving data from outside
        return Promise.resolve(data);
    },
    calculator: (data) => ({
        chartData: _(data.prs)
            .map(pr => {
                let endTime;
                if (pr.closed instanceof Date && !isNaN(pr.closed)) {
                    endTime = moment(pr.closed);
                } else if (pr.merged instanceof Date && !isNaN(pr.merged)) {
                    endTime = moment(pr.merged);
                } else {
                    endTime = moment();
                }

                // TODO(dpordomingo): This Chart shows PRs in two groups: waiting for review or not.
                //   Grouping criteria should be having review_happened or approve_happened or changes_request_happened or merge_happened or being closed.
                //   But API since the tooltip also needs to show the time waiting for being reviewed, and the events
                //   above do not expose it, we can only differentiate between being review-complete, or not.
                const reviewed = pr.completedStages.includes(PR_STAGE.COMPLETE.REVIEW);

                return {
                    loc: pr.size_added + pr.size_removed,
                    files: pr.files_changed,
                    label: pr.repository + " - #" + pr.number,
                    age: endTime.diff(pr.created, 'hours'),
                    reviewed,
                };
            })
            .orderBy(['age', 'loc'], ['desc', 'desc'])
            .take(20)
            .value(),
        totalFiles: _(data.prs)
            .filter(pr => !pr.completedStages.includes(PR_STAGE.COMPLETE.REVIEW))
            .map(pr => pr.files_changed)
            .sum(),
        totalLoc: _(data.prs)
            .map(pr => pr.size_added + pr.size_removed)
            .sum(),
        totalPRs: data.prs.length,
        axisKeys: {
            x: 'loc',
            y: 'files',
            size: 'age'
        },
        grouper: 'reviewed',
        groups: {
            false: {
                title: 'Waiting review',
                color: '#FFC507'
            },
            true: {
                title: 'Review submitted',
                color: '#23C2C7'
            }
        }
    }),
    factory: (computed) => ({
            meta: {
                title: 'Pull Request Size',
                description: 'Some description for "Pull Request Size"'
            },
            content: [
                {
                    chart: {
                        component: BubbleChart,
                        params: {
                            title: 'Number of created pull requests',
                            data: computed.chartData,
                            extra: {
                                grouper: computed.grouper,
                                groups: computed.groups,
                                axisKeys: computed.axisKeys,
                                axisLabels: {
                                    x: 'Lines of code',
                                    y: 'Files'
                                },
                                isLogScale: true
                            }
                        }
                    },
                    kpis: [
                        {
                            title: {text: 'Total number of files', bold: true},
                            subtitle: {text: 'Waiting for review'},
                            component: SimpleKPI,
                            params: {
                                value: computed.totalFiles
                            }
                        },
                        {
                            title: {text: 'Average pull request size', bold: true},
                            component: MultiKPI,
                            params: [
                                {
                                    value: computed.totalPRs > 0 ?
                                        Math.round(computed.totalFiles / computed.totalPRs) : 0,
                                    unit: {
                                        singular: 'file',
                                        plural: 'files'
                                    }
                                },
                                {
                                    value: computed.totalPRs > 0 ?
                                        Math.round(computed.totalLoc / computed.totalPRs) : 0,
                                    unit: {
                                        singular: 'lile',
                                        plural: 'lines'
                                    }
                                }
                            ]
                        },
                    ]
                }
            ]
    })
};

export default pullRequestSize;
