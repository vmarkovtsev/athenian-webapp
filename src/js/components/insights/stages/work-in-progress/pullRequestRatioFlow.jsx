import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import { SimpleKPI } from 'js/components/insights/KPI';
import TimeSeries from 'js/components/insights/charts/library/TimeSeries';
import { BigText } from 'js/components/charts/Tooltip';
import { fetchPRsMetrics } from 'js/services/api/index';

import { number } from 'js/services/format';

const pullRequestRatioFlow = {
    fetcher: async (api, context) => {
        const { account, interval, repositories, contributors } = context;
        // Cannot use global data as the KPI for PRs ratio flow needs `day` granularty
        return {
            timeseries: await fetchPRsMetrics(
                api, account, ['day'], interval, ['flow-ratio'],
                { repositories, with: { author: contributors } }
            )
        };
    },
    plumber: (data) => {
        const prsMetrics = data.global['prs-metrics.values'].custom;
        return {
            chartData: _(
                _.zip(
                    prsMetrics['flow-ratio'],
                    prsMetrics.opened,
                    prsMetrics.closed,
                )
            )
                .map(v => {
                    const ratio = v[0].value;
                    const opened = v[1].value;
                    const closed = v[2].value;
                    const trickedOpened = opened !== null || closed !== null ? opened + 1 : null;
                    const trickedClosed = opened !== null || closed !== null ? closed + 1 : null;
                    return {
                        day: v[0].date,
                        value: ratio,
                        legend: {ratio, opened: trickedOpened, closed: trickedClosed},
                    }
                })
                .value(),
            KPIsData: {
                avgRatioFlow: data.global['prs-metrics.values'].all['flow-ratio'],
                highestDay: _(data.timeseries.calculated[0].values)
                    .map(v => ({
                        day: moment(v.date).format('dddd'),
                        value: v.values[0]
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
            totalPRs: data.global.prs.prs.length
        };
    },
    factory: (computed) => ({
        meta: {
            title: 'Pull Request Ratio Flow',
            description: 'Track the ratio of opened/closed pull requests per day and anticipate congestions in the delivery pipeline.'
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
                            color: '#41CED3',
                            tooltip: {
                                renderBigFn: v => <BigText
                                    content={`${v.legend.opened }/${v.legend.closed}`}
                                    extra={number.round(v.legend.ratio, 1)}
                                />,
                            },
                        },
                    }
                },
                kpis: [
                    {
                        title: {text: 'Average Pull Request', bold: true},
                        subtitle: {text: 'Ratio Flow'},
                        component: SimpleKPI,
                        params: {
                            value: number.fixed(computed.KPIsData.avgRatioFlow, 2)
                        }
                    },
                    {
                        title: {text: 'Day with the Highest Pull Request', bold: true},
                        subtitle: {text: 'Ratio Flow'},
                        component: SimpleKPI,
                        params: {
                            value: `${computed.KPIsData.highestDay.day} (${number.fixed(computed.KPIsData.highestDay.value, 2)})`
                        }
                    },
                ]
            }
        ]
    })
};

export default pullRequestRatioFlow;
