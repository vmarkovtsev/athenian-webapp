import { SimpleKPI, MultiKPI } from 'js/components/insights/KPI';
import TimeSeries from 'js/components/insights/charts/library/TimeSeries';
import BubbleChart from 'js/components/insights/charts/library/BubbleChart';

import { PullRequestMetricsRequest } from 'js/services/api/openapi-client';

import ForSet from 'js/services/api/openapi-client/model/ForSet';
import MetricID from 'js/services/api/openapi-client/model/MetricID';

import { dateTime, github } from 'js/services/format';

import moment from 'moment';
import _ from 'lodash';

export default () => [
    waitTimeFirstReview,
    pullRequestSize
];

const waitTimeFirstReview = {
    fetcher: async (api, context, data) => {
        const metricIDs = new MetricID();
        const forset = ForSet.constructFromObject({
            repositories: context.repositories,
            developers: context.contributors
        });

        const fetchChartsData = async () => {
            const granularity = 'day';
            const metrics = [
                'wait-first-review',
            ].map(metric => metricIDs[metric]);

            const body = new PullRequestMetricsRequest(
                [forset], metrics,
                dateTime.ymd(context.interval.from),
                dateTime.ymd(context.interval.to),
                granularity, context.account
            );

            return api.calcMetricsPrLinear(body);
        };

        const fetchKPIsData = async () => {
            const daysDiff = moment(context.interval.to).diff(context.interval.from, 'days');
            const granularity = `${daysDiff} day`;
            const metrics = [
                'lead-time',
                'wait-first-review',
            ].map(metric => metricIDs[metric]);

            const bodyCurrent = new PullRequestMetricsRequest(
                [forset], metrics,
                dateTime.ymd(context.interval.from),
                dateTime.ymd(context.interval.to),
                granularity, context.account
            );
            const current = await api.calcMetricsPrLinear(bodyCurrent);

            const bodyPrevious = new PullRequestMetricsRequest(
                [forset], metrics,
                dateTime.ymd(moment(context.interval.from).subtract(daysDiff, 'days')),
                dateTime.ymd(context.interval.from),
                granularity, context.account
            );
            const previous = await api.calcMetricsPrLinear(bodyPrevious);

            return Promise.resolve({
                previous: previous,
                current: current
            });
        };

        const chartData = await fetchChartsData();
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

const pullRequestSize = {
    fetcher: async (api, context, data) => {
        // TODO: call the api to avoid receiving data from outside
        return Promise.resolve(data);
    },
    calculator: (data) => ({
        chartData: _(data.prs)
            .map(pr => {
                let endTime;
                if (pr.closed instanceof Date && !isNaN(pr.closed)) {
                    endTime = moment(pr.closed);
                } else if (pr.merged instanceof Date && !isNaN(pr.merged)) {
                    endTime = moment(pr.merged);
                } else {
                    endTime = moment();
                }

                return {
                    loc: pr.size_added + pr.size_removed,
                    files: pr.files_changed,
                    label: pr.repository + " - #" + pr.number,
                    age: endTime.diff(pr.created, 'hours'),
                    reviewRequested: pr.review_requested,
                };
            })
            .orderBy(['age', 'loc'], ['desc', 'desc'])
            .take(20)
            .value(),
        totalFiles: _(data.prs)
            .map(pr => pr.files_changed)
            .sum(),
        totalLoc: _(data.prs)
            .map(pr => pr.size_added + pr.size_removed)
            .sum(),
        totalPRs: data.prs.length,
        axisKeys: {
            x: 'loc',
            y: 'files',
            size: 'age'
        },
        grouper: 'reviewRequested',
        groups: {
            false: {
                title: 'Waiting Review',
                color: '#FFC507'
            },
            true: {
                title: 'Review Submitted',
                color: '#23C2C7'
            }
        }
    }),
    factory: (computed) => ({
            meta: {
                title: 'Pull Request Size',
                description: 'Some description for "Pull Request Size"'
            },
            content: [
                {
                    chart: {
                        component: BubbleChart,
                        params: {
                            title: 'Number of Pull Requests created',
                            data: computed.chartData,
                            extra: {
                                grouper: computed.grouper,
                                groups: computed.groups,
                                axisKeys: computed.axisKeys,
                                axisLabels: {
                                    x: 'Lines of code',
                                    y: 'Files'
                                },
                                isLogScale: true
                            }
                        }
                    },
                    kpis: [
                        {
                            title: {text: 'Total Number of Files', bold: true},
                            subtitle: {text: 'Waiting for Review'},
                            component: SimpleKPI,
                            params: {
                                value: computed.totalFiles
                            }
                        },
                        {
                            title: {text: 'Average Pull Request Size', bold: true},
                            component: MultiKPI,
                            params: [
                                {
                                    value: computed.totalPRs > 0 ?
                                        Math.round(computed.totalFiles / computed.totalPRs) : 0,
                                    unit: {
                                        singular: 'file',
                                        plural: 'files'
                                    }
                                },
                                {
                                    value: computed.totalPRs > 0 ?
                                        Math.round(computed.totalLoc / computed.totalPRs) : 0,
                                    unit: {
                                        singular: 'lile',
                                        plural: 'lines'
                                    }
                                }
                            ]
                        },
                    ]
                }
            ]
    })
};
