import React from 'react';
import _ from 'lodash';

import { SimpleKPI } from 'js/components/insights/KPI';
import { BigText } from 'js/components/charts/Tooltip';
import VerticalBarChart from 'js/components/insights/charts/library/VerticalBarChart';

import { fetchPRsMetrics } from 'js/services/api/index';
import { number } from 'js/services/format';
import { palette } from 'js/res/palette';

export default {
    fetcher: async (api, context) => {
        const { account, interval, repositories, contributors } = context;
        // Cannot use global data as the KPI needs `day` granularty
        return {
            dayCreations: await fetchPRsMetrics(
                api, account, ['day'], interval, ['opened'],
                { repositories, developers: contributors}
            )
        };
    },
    plumber: (data) => {
        const openedMetrics = data.global['prs-metrics.values'].custom.opened;
        const dayCreations = data.dayCreations.calculated[0].values;
        const createdPRs = data.global['prs-metrics.values'].all['opened'] || 0;
        const days = _(dayCreations).reduce( (acc, day) => day.values[0] ? acc + 1 : acc, 0) || 1;
        const avgCreatedPRs = createdPRs / days;

        return {
            chartData: openedMetrics.map(v => ({
                day: v.date,
                value: v.value,
            })),
            KPIsData: {
                avgCreatedPRs,
                createdPRs,
            },
            axisKeys: {
                x: 'day',
                y: 'value',
            },
        };
    },
    factory: (computed) => ({
        meta: {
            title: 'Pull Requests Created',
            description: 'Pull Request throughput through time.'
        },
        content: [
            {
                chart: {
                    component: VerticalBarChart,
                    params: {
                        data: computed.chartData,
                        timeMode: true,
                        extra: {
                            axisLabels: {
                                y: 'number of PRs created'
                            },
                            maxNumberOfTicks: 5,
                            axisKeys: computed.axisKeys,
                            color: palette.schemes.trend,
                            tooltip: {
                                renderBigFn: v => <BigText content={`${v.y} Pull Requests`} />,
                            },
                        },
                    }
                },
                kpis: [
                    {
                        title: {text: 'Average Number of Pull Requests', bold: true},
                        subtitle: {text: 'Created per Day'},
                        component: SimpleKPI,
                        params: {
                            value: number.fixed(computed.KPIsData.avgCreatedPRs, 2)
                        }
                    },
                    {
                        title: {text: 'Total Number of PRs', bold: true},
                        component: SimpleKPI,
                        params: {
                            value: computed.KPIsData.createdPRs,
                        }
                    },
                ]
            }
        ]
    })
};
