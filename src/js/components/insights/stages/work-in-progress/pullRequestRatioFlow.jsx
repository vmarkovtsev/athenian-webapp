import { SimpleKPI } from 'js/components/insights/KPI';
import TimeSeries from 'js/components/insights/charts/library/TimeSeries';

import { fetchPRsMetrics } from 'js/services/api/index';

import moment from 'moment';
import _ from 'lodash';

const pullRequestRatioFlow = {
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

export default pullRequestRatioFlow;
