import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import { SimpleKPI } from 'js/components/insights/KPI';
import TimeSeries from 'js/components/insights/charts/library/TimeSeries';
import { BigText } from 'js/components/charts/Tooltip';
import { NEGATIVE_IS_BETTER } from 'js/components/ui/Badge';

import { fetchPRsMetrics } from 'js/services/api/index';
import { number, dateTime } from 'js/services/format';

const waitTimeFirstReview = {
    fetcher: async (api, context) => {
        const fetchKPIsData = async () => {
            const daysDiff = moment(context.interval.to).diff(context.interval.from, 'days');
            const granularity = `${daysDiff} day`;
            const metrics = ['cycle-time', 'wait-first-review'];

            const current = await fetchPRsMetrics(
                api, context.account, granularity, context.interval,
                metrics,
                { repositories: context.repositories, developers: context.contributors}
            );

            const previous = await fetchPRsMetrics(
                api, context.account, granularity,
                {
                    from: moment(context.interval.from).subtract(daysDiff, 'days').toDate(),
                    to: context.interval.from
                },
                metrics,
                { repositories: context.repositories, developers: context.contributors}
            );

            return Promise.resolve({
                previous: previous,
                current: current
            });
        };

        const chartData = await fetchPRsMetrics(
            api, context.account, 'day', context.interval,
            ['wait-first-review'],
            { repositories: context.repositories, developers: context.contributors}
        );
        const KPIsData = await fetchKPIsData();

        return Promise.resolve({
            chartData: chartData,
            KPIsData: KPIsData
        });
    },
    calculator: (fetched) => {
        const [currOverall, currtWaitFirstReview] = fetched.KPIsData.current
            .calculated[0].values[0].values;
        const [prevOverall, prevWaitFirstReview] = fetched.KPIsData.previous
            .calculated[0].values[0].values;

        const avgWaitingTimeVariation = currtWaitFirstReview * 100 / prevWaitFirstReview;

        const currOverallProportion = currtWaitFirstReview * 100 / currOverall;
        const prevOverallProportion = prevWaitFirstReview * 100 / prevOverall;

        const overallProportionVariation = currOverallProportion * 100 / prevOverallProportion;

        return {
            chartData: _(fetched.chartData.calculated[0].values)
                .map(v => ({day: v.date, value: (v.values[0] || 0) / 3600}))
                .value(),
            KPIsData: {
                avgWaitingTime: {
                    value: Math.round(currtWaitFirstReview / 3600),
                    variation: avgWaitingTimeVariation
                },
                overallProportion: {
                    value: currOverallProportion,
                    variation: overallProportionVariation
                }
            },
            axisKeys: {
                x: 'day',
                y: 'value',
            },
            totalPRs: fetched.length,
        };
    },
    factory: (computed) => ({
            meta: {
                title: 'Wait Time for 1st Review',
                description: 'Lower the time pull requests stay idle, waiting for the 1st review."'
            },
            content: [
                {
                    chart: {
                        component: TimeSeries,
                        params: {
                            data: computed.chartData,
                            extra: {
                                labels: {
                                    y: 'Wait Time, hours'
                                },
                                maxNumberOfTicks: 10,
                                axisKeys: computed.axisKeys,
                                axisLabels: {
                                    y: 'Wait Time, hours'
                                },
                                color: '#41CED3',
                                tooltip: {
                                    renderBigFn: v => <BigText content={dateTime.human(v.y * 60 * 60 * 1000)} />,
                                },
                            }
                        }
                    },
                    kpis: [
                        {
                            title: {text: 'Current Average Waiting Time', bold: true},
                            subtitle: {text: 'For 1st Review'},
                            component: SimpleKPI,
                            params: {
                                value: computed.KPIsData.avgWaitingTime.value,
                                variation: computed.KPIsData.avgWaitingTime.variation,
                                variationMeaning: NEGATIVE_IS_BETTER,
                                unit: {
                                    singular: 'hour',
                                    plural: 'hours'
                                }
                            }
                        },
                        {
                            title: {text: 'Proportion of the Cycle Time', bold: true},
                            component: SimpleKPI,
                            params: {
                                value: computed.KPIsData.overallProportion.value.toFixed(2),
                                variation: computed.KPIsData.overallProportion.variation,
                                variationMeaning: NEGATIVE_IS_BETTER,
                                unit: '%'
                            }
                        },
                    ]
                }
            ]
    })
};

export default waitTimeFirstReview;
