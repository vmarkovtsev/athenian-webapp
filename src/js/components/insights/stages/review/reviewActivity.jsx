import { SimpleKPI } from 'js/components/insights/KPI';
import HorizontalBarChart from 'js/components/insights/charts/library/HorizontalBarChart';

import { fetchDevsMetrics } from 'js/services/api/index';

import _ from 'lodash';

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
                        subtitle: {
                            text: computed.secondBox.KPIsData.topReviewer ?
                                computed.secondBox.KPIsData.topReviewer.developer : ''
                        },
                        component: SimpleKPI,
                        params: {
                            value: computed.secondBox.KPIsData.topReviewer ?
                                computed.secondBox.KPIsData.topReviewer.reviewsPerc.toFixed(2) : '',
                            unit: '%'
                        }
                    },
                ]
            },
        ]
    })
};

export default reviewActivity;
