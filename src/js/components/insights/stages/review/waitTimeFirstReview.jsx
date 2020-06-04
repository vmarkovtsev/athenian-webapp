import React from 'react';
import _ from 'lodash';

import { SimpleKPI } from 'js/components/insights/KPI';
import TimeSeries from 'js/components/insights/charts/library/TimeSeries';
import { BigText } from 'js/components/charts/Tooltip';
import { NEGATIVE_IS_BETTER } from 'js/components/ui/Badge';

import { dateTime, number, isNumber } from 'js/services/format';

const waitTimeFirstReview = {
    plumber: (data) => {
        const waitFirstReviewVariation = data.global['prs-metrics.variations']['wait-first-review-time'];

        const currWaitFirstReview = data.global['prs-metrics.values'].all['wait-first-review-time'];
        const currCycleTime = data.global['prs-metrics.values'].all['cycle-time'];

        let currOverallProportion = null;
        if (currWaitFirstReview === 0) {
            currOverallProportion = 0;
        } else if (isNumber(currWaitFirstReview) && isNumber(currCycleTime) && currCycleTime !== 0) {
            currOverallProportion = currWaitFirstReview * 100 / currCycleTime;
        }

        return {
            chartData: _(data.global['prs-metrics.values'].custom['wait-first-review-time'])
                .map(v => ({day: v.date, value: v.value === null ? null : v.value * 1000}))
                .value(),
            KPIsData: {
                avgWaitingTime: {
                    value: currWaitFirstReview * 1000,
                    variation: waitFirstReviewVariation
                },
                overallProportion: {
                    value: currOverallProportion,
                }
            },
            axisKeys: {
                x: 'day',
                y: 'value',
            },
            totalPRs: data.global.prs.prs.length,
        };
    },
    factory: (computed) => ({
            meta: {
                title: 'Wait Time for 1st Review',
                description: 'Lower the time pull requests stay idle, waiting for the 1st review."'
            },
            content: [
                {
                    empty: computed.chartData.filter(v => v[computed.axisKeys.y] !== null).length === 0,
                    chart: {
                        component: TimeSeries,
                        params: {
                            data: computed.chartData,
                            timeMode: true,
                            extra: {
                                average: {
                                    value: computed.KPIsData.avgWaitingTime.value,
                                    color: '#FFA008'
                                },
                                labels: {
                                    y: 'Wait Time, hours'
                                },
                                maxNumberOfTicks: 10,
                                axisKeys: computed.axisKeys,
                                color: '#41CED3',
                                tooltip: {
                                    renderBigFn: v => <BigText content={dateTime.human(v.y)} />,
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
                                value: dateTime.bestTimeUnit(computed.KPIsData.avgWaitingTime.value, 0),
                                variation: computed.KPIsData.avgWaitingTime.variation,
                                variationMeaning: NEGATIVE_IS_BETTER,
                            }
                        },
                        {
                            title: {text: 'Proportion of the Cycle Time', bold: true},
                            component: SimpleKPI,
                            params: {
                                value: number.fixed(computed.KPIsData.overallProportion.value, 2),
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
