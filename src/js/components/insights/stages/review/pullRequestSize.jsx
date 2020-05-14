import moment from 'moment';
import _ from 'lodash';

import { SimpleKPI, MultiKPI } from 'js/components/insights/KPI';
import BubbleChart from 'js/components/insights/charts/library/BubbleChart';
import { PullRequestReview } from 'js/components/charts/Tooltip';

import { github, dateTime } from 'js/services/format';
import { PR_STAGE } from 'js/services/prHelpers';

const pullRequestSize = {
    plumber: (data) => {
        const { prs, users } = data.global['prs'];
        return {
            chartData: _(prs)
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
                    const reviewed = pr.completedStages.includes(PR_STAGE.REVIEW);

                    const authorFullName = pr.authors[0];
                    const author = authorFullName ? github.userName(authorFullName) : 'none';
                    const timeWaiting = dateTime.interval(
                        pr.review_requested || pr.created,
                        pr.approved || endTime
                    );
                    const tooltip = {
                        number: pr.number,
                        repository: pr.organization + '/' + pr.repo,
                        title: pr.title,
                        image: author === 'none' ?
                            'https://avatars2.githubusercontent.com/u/10137':
                            github.userImageIndex(users)[author],
                        reviewed,
                        author,
                        timeWaiting,
                    };

                    return {
                        loc: pr.size_added + pr.size_removed,
                        files: pr.files_changed,
                        age: endTime.diff(pr.created, 'hours'),
                        reviewed,
                        tooltip,
                    };
                })
                .orderBy(['age', 'loc'], ['desc', 'desc'])
                .value(),
            totalFiles: _(prs)
              .map(({ files_changed }) => files_changed)
              .sum(),
            totalFilesWaiting: _(prs)
              .map(pr => {
                // count the files changed from not reviewed PRs
                const reviewed = pr.completedStages.includes(PR_STAGE.REVIEW)
                return !reviewed ? pr.files_changed : 0
              })
              .sum(),
            totalLoc: _(prs)
                .map(pr => pr.size_added + pr.size_removed)
                .sum(),
            totalPRs: prs.length,
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
        };
    },
    factory: (computed) => ({
            meta: {
                title: 'Pull Request Size',
                description: 'Shed light on big pull requests that slow down code reviews and scale up the lead time.'
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
                                isLogScale: true,
                                tooltip: {
                                    template: PullRequestReview,
                                    persistent: true,
				},
                            }
                        }
                    },
                    kpis: [
                        {
                            title: {text: 'Total number of files', bold: true},
                            subtitle: {text: 'Waiting for review'},
                            component: SimpleKPI,
                            params: {
                                value: computed.totalFilesWaiting
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
                                        singular: 'line',
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
