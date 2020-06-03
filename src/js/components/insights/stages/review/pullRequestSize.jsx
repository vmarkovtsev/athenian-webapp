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
        const userImages = github.userImageIndex(users);
        return {
            chartData: _(prs)
                .filter(pr => pr.completedStages.includes(PR_STAGE.WIP))
                .map(pr => {
                    let endTime;
                    if (pr.closed instanceof Date && !isNaN(pr.closed)) {
                        endTime = moment(pr.closed);
                    } else if (pr.merged instanceof Date && !isNaN(pr.merged)) {
                        endTime = moment(pr.merged);
                    } else {
                        endTime = moment();
                    }

                    const reviewed = !!pr.first_review || !!pr.closed;

                    const author = pr.authors[0] ? github.userName(pr.authors[0]) : undefined;
                    const timeWaiting = dateTime.interval(
                        pr.review_requested || pr.created,
                        pr.first_review || endTime
                    );
                    const tooltip = {
                        number: pr.number,
                        repository: pr.organization + '/' + pr.repo,
                        title: pr.title,
                        image: userImages[author],
                        reviewed,
                        author: author || 'unknown',
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
		.take(20)
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
                            data: computed.chartData,
                            extra: {
                                grouper: computed.grouper,
                                groups: computed.groups,
                                axisKeys: computed.axisKeys,
                                axisLabels: {
                                    x: 'lines of code',
                                    y: 'files'
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
