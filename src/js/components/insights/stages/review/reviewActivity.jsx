import { SimpleKPI } from 'js/components/insights/KPI';
import HorizontalBarChart from 'js/components/insights/charts/library/HorizontalBarChart';
import BubbleChart from 'js/components/insights/charts/library/BubbleChart';

import { fetchDevsMetrics } from 'js/services/api/index';

import _ from 'lodash';

const reviewActivity = {
    fetcher: async (api, context, data) => {
        // TODO: call the api to avoid receiving data from outside

        const fetchFirstBox = async () => {
            const metrics = [
                'reviews',
                'prs-created',
            ];

            return fetchDevsMetrics(
                api, context.account, context.interval, metrics,
                { repositories: context.repositories, developers: context.contributors},
                'developers'
            );
        };

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
            firstBox: await fetchFirstBox(),
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
              .filter(v => v.reviewsPerc > 0 || v.prsCommentsPerc > 0)
              .orderBy(['prsCommentsPerc', 'reviewsPerc'], ['desc', 'desc'])
              .take(10)
              .value();
        const topReviewer = _(fetched.secondBox.calculated)
              .map(v => ({
                  developer: _.replace(v.for.developers[0], 'github.com/', ''),
                  reviewsPerc: v.values[0][0] * 100 / totalReviews,
                  prsCommentsPerc: v.values[0][1] * 100 / totalPRsComments
              }))
              .orderBy(['prsCommentsPerc'], ['desc'])
              .take(1)
              .nth(0);

        return {
            firstBox: {
                chartData: _(fetched.firstBox.calculated)
                    .map(v => ({
                        developer: _.replace(v.for.developers[0], 'github.com/', ''),
                        reviews: v.values[0][0],
                        prs: v.values[0][1],
                        size: 5
                    }))
                    .filter(v => v.reviews > 0 || v.prs > 0)
                    .orderBy(['reviews'], ['desc'])
                    .take(10)
                    .value(),
                axisKeys: {
                    x: 'reviews',
                    y: 'prs',
                    size: 'size',
                    label: 'developer'
                },
                avatarMapping: _(fetched.legacyData.users)
                    .reduce((res, v, k) => {
                        res[_.replace(k, 'github.com/', '')] = v.avatar;
                        return res;
                    }),
                KPIsData: {
                    sumPrsCreated: _(fetched.firstBox.calculated)
                        .map(v => v.values[0][1])
                        .sum(),
                    sumReviews: _(fetched.firstBox.calculated)
                        .map(v => v.values[0][0])
                        .sum(),
                    avgReviewsPerDev: totalReviews / totalReviewers
                }
            },
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
    factory: (computed) => {
        const sumPrsCreated = computed.firstBox.KPIsData.sumPrsCreated;
        const sumReviews = computed.firstBox.KPIsData.sumReviews;
        const gcdPrsReviews = gcd(sumPrsCreated, sumReviews);

        return {
            meta: {
                title: 'Review Activity',
                description: 'Some description for "Review Activity"'
            },
            content: [
                {
                    chart: {
                        component: BubbleChart,
                        params: {
                            title: 'Number of Pull Requests created',
                            data: computed.firstBox.chartData,
                            extra: {
                                useImages: true,
                                yAxis: {
                                    imageMapping: computed.secondBox.avatarMapping,
                                    imageMask: 'circle'
                                },
                                grouper: computed.firstBox.grouper,
                                groups: computed.firstBox.groups,
                                axisKeys: computed.firstBox.axisKeys,
                                axisLabels: {
                                    x: 'Number of Reviews',
                                    y: 'Number of PRs Created'
                                },
                                color: '#41CED3',
                            }
                        }
                    },
                    kpis: [
                        {
                            title: {text: 'Average Pull Requests Reviewed', bold: true},
                            subtitle: {text: 'Per Developer'},
                            component: SimpleKPI,
                            params: {
                                value: computed.firstBox.KPIsData.avgReviewsPerDev
                            }
                        },
                        {
                            title: {text: 'Ratio of Pull Requests', bold: true},
                            subtitle: {text: 'Created/Reviewed'},
                            component: SimpleKPI,
                            params: {
                                value: `${sumPrsCreated / gcdPrsReviews}/${sumReviews / gcdPrsReviews}`
                            }
                        },
                    ]
                },
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
                            title: {text: 'Proportion of Reviews Comments Made By', bold: true},
                            subtitle: {
                                text: computed.secondBox.KPIsData.topReviewer ?
                                    computed.secondBox.KPIsData.topReviewer.developer : ''
                            },
                            component: SimpleKPI,
                            params: {
                                value: computed.secondBox.KPIsData.topReviewer ?
                                    computed.secondBox.KPIsData.topReviewer.prsCommentsPerc.toFixed(2) : '',
                                unit: '%'
                            }
                        },
                    ]
                },
            ]
        };
    }
};

const gcd = (x, y) => {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
};

export default reviewActivity;
