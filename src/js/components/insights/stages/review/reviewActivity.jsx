import _ from 'lodash';

import { SimpleKPI } from 'js/components/insights/KPI';
import HorizontalBarChart from 'js/components/insights/charts/library/HorizontalBarChart';
import BubbleChart from 'js/components/insights/charts/library/BubbleChart';
import { UserReviewer } from 'js/components/charts/Tooltip';

import { fetchDevsMetrics } from 'js/services/api/index';
import { github, number } from 'js/services/format';
import { happened, authored, PR_EVENT as prEvent } from 'js/services/prHelpers';

const reviewActivity = {
    fetcher: async (api, context) => {
        const fetchFirstBox = async () => {
            const metrics = [
                'reviews',
                'prs-created',
                'prs-reviewed',
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
            interval: context.interval
        });
    },
    plumber: (data) => {
        const avatarMapping = github.userImageIndex(data.global.prs.users);
        const totalReviews = _(data.secondBox.calculated)
              .map(v => v.values[0][0])
              .sum();
        const totalPRsComments = _(data.secondBox.calculated)
              .map(v => v.values[0][1])
              .sum();
        const totalReviewedPRs = _(data.firstBox.calculated)
            .map(v => v.values[0][2])
            .sum();
        const totalReviewers = _(data.secondBox.calculated)
            .filter(v => v.values[0][0] > 0)
            .value()
            .length;
        const secondBoxChartData = _(data.secondBox.calculated)
              .map(v => {
                  const [reviewsTotal, prsCommentsTotal] = [v.values[0][0], v.values[0][1]];
                  const [reviewsPerc, prsCommentsPerc] = [reviewsTotal * 100 / totalReviews, prsCommentsTotal * 100 / totalPRsComments];
                  const author = github.userName(v.for.developers[0]);
                  return {
                      developer: author,
                      reviewsPerc,
                      prsCommentsPerc,
                      tooltip: {
                          author,
                          image: avatarMapping[author],
                          reviewsPerc: {
                              number: reviewsTotal,
                              percentage: reviewsPerc,
                          },
                          prsCommentsPerc: {
                              number: prsCommentsTotal,
                              percentage: prsCommentsPerc,
                          },
                      },
                  };
              })
              .filter(v => v.reviewsPerc > 0 || v.prsCommentsPerc > 0)
              .orderBy(['prsCommentsPerc', 'reviewsPerc'], ['desc', 'desc'])
              .take(10)
              .value();
        const topReviewer = _(data.secondBox.calculated)
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
                chartData: _(data.firstBox.calculated)
                    .map(v => {
                        const author = github.userName(v.for.developers[0]);
                        return {
                            developer: author,
                            reviews: v.values[0][0],
                            prs: v.values[0][1],
                            size: 5,
                            tooltip: {
                                author,
                                image: avatarMapping[author],
                                stats: {
                                    prsCount: v.values[0][1],
                                    commentsCount: v.values[0][0],
                                },
                            },
                        };
                    })
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
                avatarMapping,
                KPIsData: {
                    // We're interested in the very same data than in the WIP.created and Review.reviewed Summary Metrics
                    createdPRs: authored(data.global.prs.prs)
                        .filter(pr => data.interval.from <= pr.created)
                        .length,
                    reviewedPRs: authored(data.global.prs.prs)
                        .filter(pr => {
                            return happened(pr, prEvent.REVIEW) || happened(pr, prEvent.REJECTION) || happened(pr, prEvent.APPROVE);
                        }).length,
                    avgReviewedPRsPerDev: totalReviewedPRs / totalReviewers,
                }
            },
            secondBox: {
                chartData: secondBoxChartData,
                axisKeys: {
                    x: ['prsCommentsPerc', 'reviewsPerc'],
                    y: 'developer'
                },
                avatarMapping,
                KPIsData: {
                    reviewers: totalReviewers,
                    topReviewer: topReviewer
                }
            }
        };
    },
    factory: (computed) => {
        const createdPRs = computed.firstBox.KPIsData.createdPRs;
        const reviewedPRs = computed.firstBox.KPIsData.reviewedPRs;

        return {
            meta: {
                title: 'Review Activity',
                description: 'Understand the role of each team member in the review process.'
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
                                tooltip: { template: UserReviewer },
                            }
                        }
                    },
                    kpis: [
                        {
                            title: {text: 'Average Pull Requests Reviewed', bold: true},
                            subtitle: {text: 'Per Developer'},
                            component: SimpleKPI,
                            params: {
                                value: number.fixed(computed.firstBox.KPIsData.avgReviewedPRsPerDev, 2),
                            }
                        },
                        {
                            title: {text: 'Ratio of Pull Requests', bold: true},
                            subtitle: { text: 'Reviewed/Created'},
                            component: SimpleKPI,
                            params: {
                                value: `${reviewedPRs}/${createdPRs}`
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
                            tickFormat: (tick) => `${tick}%`,
                            extra: {
                                yAxis: {
                                    imageMapping: computed.secondBox.avatarMapping,
                                    imageMask: 'circle'
                                },
                                axisKeys: computed.secondBox.axisKeys,
                                series: {
                                    prsCommentsPerc: {
                                        name: '% Reviews Comments',
                                        color: '#FC1763',
                                    },
                                    reviewsPerc: {
                                        name: '% Reviews',
                                        color: '#FFC507',
                                    }
                                },
                                tooltip: { template: UserReviewer },
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
                                    number.fixed(computed.secondBox.KPIsData.topReviewer.prsCommentsPerc,2) : '',
                                unit: '%'
                            }
                        },
                    ]
                },
            ]
        };
    }
};

export default reviewActivity;
