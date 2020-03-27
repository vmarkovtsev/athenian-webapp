import { SimpleKPI } from 'js/components/insights/KPI';
import TimeSeries from 'js/components/insights/charts/library/TimeSeries';

import { fetchPRsMetrics } from 'js/services/api/index';

import moment from 'moment';
import _ from 'lodash';

const waitTimeFirstReview = {
    fetcher: async (api, context) => {
        const fetchKPIsData = async () => {
            const daysDiff = moment(context.interval.to).diff(context.interval.from, 'days');
            const granularity = `${daysDiff} day`;
            const metrics = ['lead-time', 'wait-first-review'];

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
        const [currLeadTime, currtWaitFirstReview] = fetched.KPIsData.current
              .calculated[0].values[0].values;
        const [prevLeadTime, prevWaitFirstReview] = fetched.KPIsData.previous
              .calculated[0].values[0].values;

        const avgWaitingTimeVariation = currtWaitFirstReview * 100 / prevWaitFirstReview;

        const currLeadTimeProportion = currtWaitFirstReview * 100 / currLeadTime;
        const prevLeadTimeProportion = prevWaitFirstReview * 100 / prevLeadTime;

        const leadTimeProportionVariation = currLeadTimeProportion * 100 / prevLeadTimeProportion;

        return {
            chartData: _(fetched.chartData.calculated[0].values)
                .map(v => ({day: v.date, value: (v.values[0] || 0) / 3600}))
                .value(),
            KPIsData: {
                avgWaitingTime: {
                    value: Math.round(currtWaitFirstReview / 3600),
                    variation: avgWaitingTimeVariation
                },
                leadTimeProportion: {
                    value: currLeadTimeProportion,
                    variation: leadTimeProportionVariation
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
                description: 'Some description for "Wait Time for 1st Review"'
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
                                color: '#41CED3'
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
                                unit: {
                                    singular: 'hour',
                                    plural: 'hours'
                                }
                            }
                        },
                        {
                            title: {text: 'Proportion of the Lead Time', bold: true},
                            component: SimpleKPI,
                            params: {
                                value: computed.KPIsData.leadTimeProportion.value.toFixed(2),
                                variation: computed.KPIsData.leadTimeProportion.variation,
                                unit: '%'
                            }
                        },
                    ]
                }
            ]
    })
};

export default waitTimeFirstReview;
