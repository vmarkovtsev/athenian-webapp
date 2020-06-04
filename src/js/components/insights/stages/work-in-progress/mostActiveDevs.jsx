import _ from 'lodash';

import { SimpleKPI } from 'js/components/insights/KPI';
import HorizontalBarChart from 'js/components/insights/charts/library/HorizontalBarChart';
import { UserReviewer } from 'js/components/charts/Tooltip';

import { github, number } from 'js/services/format';

const mostActiveDevs = {
    plumber: (data) => {
        // TODO (dpordomingo): This chart should use /metrics/developers endpoint instead of PRs from /filter/pull_requests
        // which could be eventually paginated because it's too heavy
        const prs = data.global.prs;
        const avatarMapping = github.userImageIndex(prs.users);
        return {
            chartData: _(prs.prs)
                .flatMap(pr => pr.authors)
                .countBy()
                .map((v, k) => {
                    const author = github.userName(k);
                    return {
                        x: v,
                        y: author,
                        tooltip: {
                            author,
                            image: avatarMapping[author],
                            x: {
                                number: v,
                            },
                        },
                    };
                })
                .orderBy(['x'], ['desc'])
                .take(7)
                .value(),
            activeDevs: _(prs.prs)
                .flatMap(pr => pr.participants)
                .filter(participant => _.intersection(
                    participant.status,
                    ['author', 'commit_author', 'commit_committer']
                ).length > 0)
                .map(pr => _.replace(pr.id, 'github.com/', ''))
                .uniq()
                .value(),
            avatarMapping,
            totalPRs: prs.prs.length
        };
    },
    factory: (computed) => ({
        meta: {
            title: 'Pull Request Authors',
            description: 'Pull Request throughput of the team.'
        },
        content: [
            {
                empty: computed.chartData.length === 0,
                chart: {
                    component: HorizontalBarChart,
                    params: {
                        title: 'Pull Requests created',
                        data: computed.chartData,
                        extra: {
                            yAxis: {
                                imageMapping: computed.avatarMapping,
                                imageMask: 'circle'
                            },
                            axisKeys: {
                                x: 'x',
                                y: 'y'
                            },
                            series: {
                                x: {
                                    name: 'Pull Requests created',
                                    color: "#FFA008",
                                },
                            },
                            tooltip: { template: UserReviewer },
                        }
                    }
                },
                kpis: [
                    {
                        title: {text: 'Number of Active Developers', bold: true},
                        component: SimpleKPI,
                        params: {
                            value: computed.activeDevs.length
                        }
                    },
                    {
                        title: {text: 'Average Number of Pull Requests', bold: true},
                        subtitle: {text: 'Created by Developer'},
                        component: SimpleKPI,
                        params: {
                            value: computed.activeDevs.length > 0 ?
                                number.fixed(computed.totalPRs / computed.activeDevs.length, 2) : 0,
                        }
                    },
                ]
            }
        ]
    })
};

export default mostActiveDevs;
