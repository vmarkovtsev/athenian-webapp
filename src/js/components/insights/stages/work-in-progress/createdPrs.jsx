import React from 'react';
import moment from 'moment';
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
        const days = dayCreations.length || 1;
        const avgCreatedPRs = createdPRs / days;
        const highestDay = _(dayCreations).maxBy(v => v.values[0]) || { day: '', values: [0] };

        return {
            chartData: openedMetrics.map(v => ({
                day: v.date,
                value: v.value,
            })),
            KPIsData: {
                avgCreatedPRs,
                highestDay: {
                    day: moment(highestDay.date).format('dddd') ,
                    value: highestDay.values[0],
                },
            },
            axisKeys: {
                x: 'day',
                y: 'value',
            },
        };
    },
    factory: (computed) => ({
        meta: {
            title: 'Pull Requests created through time',
            description: 'Pull Request Ratio Flow.'
        },
        content: [
            {
                chart: {
                    component: VerticalBarChart,
                    params: {
                        data: computed.chartData,
                        timeMode: true,
                        extra: {
                            labels: {
                                y: 'number of PRs created'
                            },
                            maxNumberOfTicks: 10,
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
                        title: {text: 'Average Pull Request', bold: true},
                        subtitle: {text: 'Creation'},
                        component: SimpleKPI,
                        params: {
                            value: number.fixed(computed.KPIsData.avgCreatedPRs, 2)
                        }
                    },
                    {
                        title: {text: 'Day with the Highest Pull Request', bold: true},
                        subtitle: {text: 'Creation'},
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
