import { SimpleKPI, MultiKPI } from 'js/components/insights/KPI';
import TimeSeries from 'js/components/insights/charts/library/TimeSeries';
import BubbleChart from 'js/components/insights/charts/library/BubbleChart';
import HorizontalBarChart from 'js/components/insights/charts/library/HorizontalBarChart';

import { fetchPRsMetrics, fetchDevsMetrics } from 'js/services/api/index';

import moment from 'moment';
import _ from 'lodash';

export default () => [
    waitTimeFirstReview,
    pullRequestSize,
    reviewActivity,
];

const reviewActivity = {
    fetcher: async (api, context, data) => {
        // TODO: call the api to avoid receiving data from outside

        const fetchSecondBox = async () => {
            const metrics = [
                'reviews',
                'pr-comments',
            ];

            return fetchDevsMetrics(
                api, context.account, context.interval, metrics,
                { repositories: context.repositories, developers: context.contributors},
                'developers'
            );
        };

        return Promise.resolve({
            secondBox: await fetchSecondBox(),
            legacyData: data
        });
    },
    calculator: (fetched) => {
        const totalReviews = _(fetched.secondBox.calculated)
              .map(v => v.values[0][0])
              .sum();
        const totalPRsComments = _(fetched.secondBox.calculated)
              .map(v => v.values[0][1])
              .sum();
        const totalReviewers = _(fetched.secondBox.calculated)
              .filter(v => v.values[0][1] > 0)
              .value()
              .length;
        const secondBoxChartData = _(fetched.secondBox.calculated)
              .map(v => ({
                  developer: _.replace(v.for.developers[0], 'github.com/', ''),
                  reviewsPerc: v.values[0][0] * 100 / totalReviews,
                  prsCommentsPerc: v.values[0][1] * 100 / totalPRsComments
              }))
              .orderBy(['prsCommentsPerc'], ['desc'])
              .take(10)
              .value();
        const topReviewer = _(fetched.secondBox.calculated)
              .map(v => ({
                  developer: _.replace(v.for.developers[0], 'github.com/', ''),
                  reviewsPerc: v.values[0][0] * 100 / totalReviews,
                  prsCommentsPerc: v.values[0][1] * 100 / totalPRsComments
              }))
              .orderBy(['reviewsPerc'], ['desc'])
              .take(1)
              .nth(0);

        return {
            secondBox: {
                chartData: secondBoxChartData,
                axisKeys: {
                    x: ['prsCommentsPerc', 'reviewsPerc'],
                    y: 'developer'
                },
                avatarMapping: _(fetched.legacyData.users)
                    .reduce((res, v, k) => {
                        res[_.replace(k, 'github.com/', '')] = v.avatar;
                        return res;
                    }),
                KPIsData: {
                    reviewers: totalReviewers,
                    topReviewer: topReviewer
                }
            }
        };
    },
    factory: (computed) => ({
        meta: {
            title: 'Review Activity',
            description: 'Some description for "Review Activity"'
        },
        content: [
            {
                chart: {
                    component: HorizontalBarChart,
                    params: {
                        title: 'Most Active Reviewers',
                        data: computed.secondBox.chartData,
                        extra: {
                            yAxis: {
                                imageMapping: computed.secondBox.avatarMapping,
                                imageMask: 'circle'
                            },
                            axisKeys: computed.secondBox.axisKeys,
                            barWidth: 0.6,
                            series: {
                                prsCommentsPerc: {
                                    name: '% Reviews Comments',
                                    color: '#FC1763',
                                },
                                reviewsPerc: {
                                    name: '% Reviews',
                                    color: '#FFC507',
                                }
                            }
                        }
                    }
                },
                kpis: [
                    {
                        title: {text: 'Total Number of Reviewers', bold: true},
                        component: SimpleKPI,
                        params: {
                            value: computed.secondBox.KPIsData.reviewers,
                        }
                    },
                    {
                        title: {text: 'Proportion of Reviews Made By', bold: true},
                        subtitle: {text: computed.secondBox.KPIsData.topReviewer.developer},
                        component: SimpleKPI,
                        params: {
                            value: computed.secondBox.KPIsData.topReviewer.reviewsPerc.toFixed(2),
                            unit: '%'
                        }
                    },
                ]
            },
        ]
    })
};

const waitTimeFirstReview = {
    fetcher: async (api, context) => {
        const fetchKPIsData = async () => {
            const daysDiff = moment(context.interval.to).diff(context.interval.from, 'days');
            const granularity = `${daysDiff} day`;
            const metrics = ['lead-time', 'wait-first-review'];

            const current = await fetchPRsMetrics(
                api, context.account, granularity, context.interval,
                metrics,
                { repositories: context.repositories, developers: context.contributors}
            );

            const previous = await fetchPRsMetrics(
                api, context.account, granularity,
                {
                    from: moment(context.interval.from).subtract(daysDiff, 'days').toDate(),
                    to: context.interval.from
                },
                metrics,
                { repositories: context.repositories, developers: context.contributors}
            );

            return Promise.resolve({
                previous: previous,
                current: current
            });
        };

        const chartData = await fetchPRsMetrics(
            api, context.account, 'day', context.interval,
            ['wait-first-review'],
            { repositories: context.repositories, developers: context.contributors}
        );
        const KPIsData = await fetchKPIsData();

        return Promise.resolve({
            chartData: chartData,
            KPIsData: KPIsData
        });
    },
    calculator: (fetched) => {
        const [currLeadTime, currtWaitFirstReview] = fetched.KPIsData.current
              .calculated[0].values[0].values;
        const [prevLeadTime, prevWaitFirstReview] = fetched.KPIsData.previous
              .calculated[0].values[0].values;

        const avgWaitingTimeVariation = currtWaitFirstReview * 100 / prevWaitFirstReview;

        const currLeadTimeProportion = currtWaitFirstReview * 100 / currLeadTime;
        const prevLeadTimeProportion = prevWaitFirstReview * 100 / prevLeadTime;

        const leadTimeProportionVariation = currLeadTimeProportion * 100 / prevLeadTimeProportion;

        return {
            chartData: _(fetched.chartData.calculated[0].values)
                .map(v => ({day: v.date, value: (v.values[0] || 0) / 3600}))
                .value(),
            KPIsData: {
                avgWaitingTime: {
                    value: Math.round(currtWaitFirstReview / 3600),
                    variation: avgWaitingTimeVariation
                },
                leadTimeProportion: {
                    value: currLeadTimeProportion,
                    variation: leadTimeProportionVariation
                }
            },
            axisKeys: {
                x: 'day',
                y: 'value',
            },
            totalPRs: fetched.length,
        };
    },
    factory: (computed) => ({
            meta: {
                title: 'Wait Time for 1st Review',
                description: 'Some description for "Wait Time for 1st Review"'
            },
            content: [
                {
                    chart: {
                        component: TimeSeries,
                        params: {
                            data: computed.chartData,
                            extra: {
                                labels: {
                                    y: 'Wait Time, hours'
                                },
                                maxNumberOfTicks: 10,
                                axisKeys: computed.axisKeys,
                                axisLabels: {
                                    y: 'Wait Time, hours'
                                },
                                color: '#41CED3'
                            }
                        }
                    },
                    kpis: [
                        {
                            title: {text: 'Current Average Waiting Time', bold: true},
                            subtitle: {text: 'For 1st Review'},
                            component: SimpleKPI,
                            params: {
                                value: computed.KPIsData.avgWaitingTime.value,
                                variation: computed.KPIsData.avgWaitingTime.variation,
                                unit: {
                                    singular: 'hour',
                                    plural: 'hours'
                                }
                            }
                        },
                        {
                            title: {text: 'Proportion of the Lead Time', bold: true},
                            component: SimpleKPI,
                            params: {
                                value: computed.KPIsData.leadTimeProportion.value.toFixed(2),
                                variation: computed.KPIsData.leadTimeProportion.variation,
                                unit: '%'
                            }
                        },
                    ]
                }
            ]
    })
};

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

                return {
                    loc: pr.size_added + pr.size_removed,
                    files: pr.files_changed,
                    label: pr.repository + " - #" + pr.number,
                    age: endTime.diff(pr.created, 'hours'),
                    reviewRequested: pr.review_requested,
                };
            })
            .orderBy(['age', 'loc'], ['desc', 'desc'])
            .take(20)
            .value(),
        totalFiles: _(data.prs)
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
        grouper: 'reviewRequested',
        groups: {
            false: {
                title: 'Waiting Review',
                color: '#FFC507'
            },
            true: {
                title: 'Review Submitted',
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
                            title: 'Number of Pull Requests created',
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
                            title: {text: 'Total Number of Files', bold: true},
                            subtitle: {text: 'Waiting for Review'},
                            component: SimpleKPI,
                            params: {
                                value: computed.totalFiles
                            }
                        },
                        {
                            title: {text: 'Average Pull Request Size', bold: true},
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
