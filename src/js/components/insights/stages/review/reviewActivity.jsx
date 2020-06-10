import _ from 'lodash';

import { SimpleKPI } from 'js/components/insights/KPI';
import HorizontalBarChart from 'js/components/insights/charts/library/HorizontalBarChart';
import BubbleChart from 'js/components/insights/charts/library/BubbleChart';
import { UserReviewer } from 'js/components/charts/Tooltip';

import { fetchDevsMetrics } from 'js/services/api/index';
import { github, number } from 'js/services/format';

const reviewActivity = {
  fetcher: async (api, context) => {
    const fetchMetrics = async () => {
      const metrics = [
        'prs-reviewed',
        'prs-created',
        'pr-comments'
      ];

      return fetchDevsMetrics(
        api, context.account, context.interval, metrics,
        { repositories: context.repositories, developers: context.contributors},
        'developers'
      );
    };

    const [metrics, interval] = await Promise.all([fetchMetrics(), context.interval]);
    return { metrics, interval }
  },
  plumber: data => {
    const { metrics, global } = data
    const [prsReviewed, prsCreated, prComments] = [0, 1, 2]

    const avatarMapping = github.userImageIndex(global.prs.users);

    const totalReviews = _(metrics.calculated)
      .map(v => v.values[0][prsReviewed])
      .sum();

    const totalPRsComments = _(metrics.calculated)
      .map(v => v.values[0][prComments])
      .sum();

    const totalPRsCreated = _(metrics.calculated)
      .map(v => v.values[0][prsCreated])
      .sum();

    const totalReviewedPRs = _(metrics.calculated)
      .map(v => v.values[0][prsReviewed])
      .sum();

    const totalReviewers = _(metrics.calculated)
      .filter(v => v.values[0][prsReviewed] > 0)
      .value()
      .length

    const secondBoxChartData = _(metrics.calculated)
      .map(v => {
        const [reviewsTotal, prsCommentsTotal] = [v.values[0][prsReviewed], v.values[0][prComments]];
        const [reviewsPerc, prsCommentsPerc] = [reviewsTotal * 100 / totalReviews, prsCommentsTotal * 100 / totalPRsComments];
        const [devName] = v.for.developers
        const author = github.userName(devName);
  
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
      .take(7)
      .value();

    const topReviewer = _(metrics.calculated)
      .map(v => ({
        developer: _.replace(v.for.developers[0], 'github.com/', ''),
        reviewsPerc: v.values[0][prsReviewed] * 100 / totalReviews,
        prsCommentsPerc: v.values[0][prComments] * 100 / totalPRsComments
      }))
      .orderBy(['prsCommentsPerc'], ['desc'])
      .take(1)
      .nth(0);

    return {
      firstBox: {
        chartData: _(metrics.calculated)
          .map(v => {
            const [devName] = v.for.developers
            const author = github.userName(devName);
            return {
              developer: author,
              reviews: v.values[0][prsReviewed],
              prs: v.values[0][prsCreated],
              size: 5,
              tooltip: {
                author,
                image: avatarMapping[author],
                stats: {
                  prsCount: v.values[0][prsCreated],
                  commentsCount: v.values[0][prsReviewed],
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
          createdPRs: totalPRsCreated,
          reviewedPRs: totalReviewedPRs,
          avgReviewedPRsPerDev: totalReviewedPRs / totalReviewers
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
  factory: computed => {
    const createdPRs = computed.firstBox.KPIsData.createdPRs;
    const reviewedPRs = computed.firstBox.KPIsData.reviewedPRs;

    const content = [{
      empty: computed.firstBox.chartData.length === 0,
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
              x: 'pull requests reviewed',
              y: 'pull requests created'
            },
            color: '#41CED3',
            tooltip: { template: UserReviewer },
          }
        }
      },
      kpis: [{
        title: { text: 'Average Pull Requests Reviewed', bold: true },
        subtitle: { text: 'Per Developer' },
        component: SimpleKPI,
        params: {
          value: number.fixed(computed.firstBox.KPIsData.avgReviewedPRsPerDev, 2),
        }
        }, {
          title: {text: 'Ratio of Pull Requests', bold: true},
          subtitle: { text: 'Reviewed/Created'},
          component: SimpleKPI,
          params: {
            value: `${reviewedPRs}/${createdPRs}`
          }
        }]
      },
      {
        empty: computed.secondBox.chartData.length === 0,
        chart: {
          component: HorizontalBarChart,
          params: {
            title: 'Most Active Reviewers',
            data: computed.secondBox.chartData,
            tickFormat: tick => `${tick}%`,
            extra: {
              yAxis: {
                imageMapping: computed.secondBox.avatarMapping,
                imageMask: 'circle'
              },
              axisKeys: computed.secondBox.axisKeys,
              series: {
                prsCommentsPerc: {
                  name: 'Review comments',
                  color: '#FC1763',
                },
                reviewsPerc: {
                  name: 'Pull requests reviewed',
                  color: '#FFC507',
                }
              },
              tooltip: { template: UserReviewer },
            }
          }
        },
        kpis: [{
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
        }]
    }];

    if (content.filter(c => !c.empty).length === 0) {
      content.empty = true;
    }

    return {
      meta: {
        title: 'Review Activity',
        description: 'Understand the role of each team member in the review process.'
      },
      content
    };
  }
};

export default reviewActivity;
