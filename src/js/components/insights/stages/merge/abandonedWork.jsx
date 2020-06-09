import _ from 'lodash';

import { PullRequestReview } from 'js/components/charts/Tooltip';
import { SimpleKPI } from 'js/components/insights/KPI';
import VerticalBarChart from 'js/components/insights/charts/library/VerticalBarChart';

import { number, github, dateTime } from 'js/services/format';
import { palette } from 'js/res/palette';

const firstNRepos = 20;

export default {
    plumber: (data) => {
        // TODO(dpordomingo): Once /filter/pull_requests is paginated,
        // we should filter by closed AND !merged SORT BY closed - opened DESC LIMIT 20
        const { prs, users } = data.global['prs'];
        const userImages = github.userImageIndex(users);
        const closedPrs = _(prs)
            .filter(pr => pr.closed)
            .map(pr => {
                if (pr.merged) {
                    return { abandoned: false }
                }

                const author = pr.authors[0] ? github.userName(pr.authors[0]) : undefined;
                const lifetime = pr.closed - pr.created;
                return {
                    abandoned: true,
                    xLabel: `${github.repoName(pr.repository)}#${pr.number}`,
                    lifetime,
                    tooltip: {
                        number: pr.number,
                        repository: `${pr.organization}/${pr.repo}`,
                        title: pr.title,
                        author: author || 'unknown',
                        image: userImages[author],
                        lifetime: dateTime.interval(pr.created, pr.closed),
                    },
                };
            });

        const groupedPrs = closedPrs.groupBy(pr => pr.abandoned ? 'abandoned' : 'merged').value();

        const proportionOverMerged = 100 * (groupedPrs.abandoned?.length || 0) / closedPrs.size();

        const avgLifetime = _(groupedPrs.abandoned)
            .meanBy('lifetime') || 0;

        const chartData = _(groupedPrs.abandoned)
            .orderBy([pr => pr.lifetime], ['desc'])
            .take(firstNRepos)
            .value();

        return {
            chartData,
            KPIsData: {
                count: {
                    abandoned: groupedPrs.abandoned?.length || 0,
                    proportionOverMerged,
                },
                avgLifetime,
            },
            axisKeys: {
                x: 'xLabel',
                y: 'lifetime',
            },
        };
    },
    factory: (computed) => ({
        meta: {
            title: 'Abandoned Work',
            description: `Evaluate the amount of work and time spent in closed pull requests.`
        },
        content: [
            {
                empty: computed.chartData.length === 0,
                chart: {
                    component: VerticalBarChart,
                    params: {
                        data: computed.chartData,
                        timeMode: false,
                        extra: {
                            axisLabels: {
                                y: 'PR lifetime'
                            },
                            axisFormat: {
                                y: y => dateTime.human(y),
                            },
                            margin: {
                                left: 100,
                            },
                            maxNumberOfTicks: 5,
                            axisKeys: computed.axisKeys,
                            average: {
                                value: computed.KPIsData.avgLifetime,
                                color: palette.schemes.positiveNegative.badTrend,
                            },
                            color: palette.schemes.positiveNegative.bad,
                            tooltip: {
                                template: PullRequestReview,
                                persistent: true,
                            },
                        },
                    }
                },
                kpis: [
                    {
                        title: {text: 'Total Number of Abandoned', bold: true},
                        subtitle: {text: 'Pull Requests'},
                        component: SimpleKPI,
                        params: {
                            value: `${computed.KPIsData.count.abandoned} (${number.percentage(computed.KPIsData.count.proportionOverMerged, 1)})`
                        }
                    },
                    {
                        title: {text: 'Average Lifetime of Closed', bold: true},
                        subtitle: {text: 'Pull Requests'},
                        component: SimpleKPI,
                        params: {
                            value: dateTime.human(computed.KPIsData.avgLifetime, 1),
                        }
                    },
                ]
            }
        ]
    })
};
