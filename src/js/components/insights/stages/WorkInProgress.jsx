import { SimpleKPI } from 'js/components/insights/KPI';
import TimeSeries from 'js/components/insights/charts/library/TimeSeries';
import HorizontalBarChart from 'js/components/insights/charts/library/HorizontalBarChart';

import { fetchPRsMetrics } from 'js/services/api/index';

import moment from 'moment';
import _ from 'lodash';

export default () => [
    mostActiveDevs,
    prRatioFlow
];

const prRatioFlow = {
    fetcher: async (api, context) => fetchPRsMetrics(
        api, context.account, 'day', context.interval,
        ['flow-ratio', 'opened', 'closed'],
        { repositories: context.repositories, developers: context.contributors}
    ),
    calculator: (fetched) => ({
        chartData: _(fetched.calculated[0].values)
            .map(v => ({
                day: v.date,
                value: (v.values[1] || 1) / (v.values[2] || 1)
            }))
            .value(),
        KPIsData: {
            avgRatioFlow: {
                value: _(fetched.calculated[0].values)
                    .map(v => (v.values[1] || 1) / (v.values[2] || 1))
                    .meanBy()
            },
            highestDay: _(fetched.calculated[0].values)
                .map(v => ({
                    day: moment(v.date).format('dddd'),
                    value: (v.values[1] || 1) / (v.values[2] || 1)
                }))
                .groupBy('day')
                .map((series, k) => ({
                    day: k,
                    value: _(series)
                        .map('value')
                        .mean()
                }))
                .maxBy('value')
        },
        axisKeys: {
            x: 'day',
            y: 'value',
        },
        totalPRs: fetched.length
    }),
    factory: (computed) => ({
        meta: {
            title: 'Pull Request Ratio Flow',
            description: 'Some description for "Pull Request Ratio Flow"'
        },
        content: [
            {
                chart: {
                    component: TimeSeries,
                    params: {
                        data: computed.chartData,
                        extra: {
                            reference: {
                                value: 1,
                                color: '#FFA008'
                            },
                            labels: {
                                y: 'PR Ratio Flow'
                            },
                            maxNumberOfTicks: 10,
                            axisKeys: computed.axisKeys,
                            color: '#41CED3'
                        }
                    }
                },
                kpis: [
                    {
                        title: {text: 'Average Pull Request', bold: true},
                        subtitle: {text: 'Ratio Flow'},
                        component: SimpleKPI,
                        params: {
                            value: computed.KPIsData.avgRatioFlow.value.toFixed(2)
                        }
                    },
                    {
                        title: {text: 'Day with the Highest Pull Request', bold: true},
                        subtitle: {text: 'Ratio Flow'},
                        component: SimpleKPI,
                        params: {
                            value: `${computed.KPIsData.highestDay.day} (${computed.KPIsData.highestDay.value.toFixed(2)})`
                        }
                    },
                ]
            }
        ]
    })
};

const mostActiveDevs = {
    fetcher: async (api, context, data) => {
        // TODO: call the api to avoid receiving data from outside
        return Promise.resolve(data);
    },
    calculator: (data) => ({
        chartData: _(data.prs)
            .flatMap(pr => pr.authors)
            .countBy()
            .map((v, k) => ({x: v, y: _.replace(k, 'github.com/', '')}))
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
        avatarMapping: _(data.users)
            .reduce((res, v, k) => {
                res[_.replace(k, 'github.com/', '')] = v.avatar;
                return res;
            })
        ,
        totalPRs: data.prs.length
    }),
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
                            }

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
