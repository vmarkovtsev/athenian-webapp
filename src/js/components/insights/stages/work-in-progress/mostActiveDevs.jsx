import _ from 'lodash';

import { SimpleKPI } from 'js/components/insights/KPI';
import HorizontalBarChart from 'js/components/insights/charts/library/HorizontalBarChart';
import { UserReviewer } from 'js/components/charts/Tooltip';

import { github } from 'js/services/format';

const mostActiveDevs = {
    fetcher: async (api, context, data) => {
        // TODO: call the api to avoid receiving data from outside
        return Promise.resolve(data);
    },
    calculator: (data) => {
        const avatarMapping = github.userImageIndex(data.users);
        return {
            chartData: _(data.prs)
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
                .take(10)
                .value(),
            activeDevs: _(data.prs)
                .flatMap(pr => pr.participants)
                .filter(participant => _.intersection(
                    participant.status,
                    ['author', 'commit_author', 'commit_committer']
                ).length > 0)
                .map(pr => _.replace(pr.id, 'github.com/', ''))
                .uniq()
                .value(),
            avatarMapping,
            totalPRs: data.prs.length
        };
    },
    factory: (computed) => ({
        meta: {
            title: 'Most Active Developer',
            description: 'Some description for "Most Active Developer"'
        },
        content: [
            {
                chart: {
                    component: HorizontalBarChart,
                    params: {
                        title: 'Number of Pull Requests created',
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
                                    name: 'Number of Pull Requests created',
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
                                (computed.totalPRs / computed.activeDevs.length).toFixed(2) : 0,
                        }
                    },
                ]
            }
        ]
    })
};

export default mostActiveDevs;
