import React from 'react';
import _ from 'lodash';

import { SimpleKPI } from 'js/components/insights/KPI';
import VerticalBarChart from 'js/components/insights/charts/library/VerticalBarChart';

import { number } from 'js/services/format';

import { palette } from 'js/res/palette';
import { DefaultXYTooltip } from 'js/components/charts/Tooltip';
import { BigText } from 'js/components/charts/Tooltip';

const firstNRepos = 15;

export default {
    plumber: (data, context) => {
        const dateFrom = context?.interval?.from;
        const prs = data.global.prs.prs;
        const prsPerRepo = _(prs)
            .filter(pr => pr.created > dateFrom)
            .groupBy(pr => pr.repo)
            .map((v, k) => ({
                repo: k,
                count: v.length,
            }));
        const average = prsPerRepo.meanBy('count') || 0;

        return {
            chartData: prsPerRepo
                .orderBy(['count'], ['desc'])
                .take(firstNRepos)
                .value(),
            KPIsData: {
                average,
            },
            axisKeys: {
                x: 'repo',
                y: 'count',
            },
        };
    },
    factory: (computed) => ({
            meta: {
                title: 'Pull Requests Created per Repo',
                description: `Identify the repositories that show the biggest number of pull requests created.`,
            },
            content: [
                {
                    empty: computed.chartData.filter(v => v[computed.axisKeys.y] !== 0).length === 0,
                    chart: {
                        component: VerticalBarChart,
                        params: {
                            data: computed.chartData,
                            extra: {
                                axisKeys: computed.axisKeys,
                                axisLabels: {
                                    y: 'number of PRs created'
                                },
                                color: palette.schemes.trend,
                                tooltip: {
                                    template: DefaultXYTooltip,
                                    y: v => <BigText content={`${v.y} Pull Requests`} />,
                                },
                            }
                        }
                    },
                    kpis: [
                        {
                            title: {text: 'Average Number of Pull Requests', bold: true},
                            subtitle: {text: 'Creation Per Repository'},
                            component: SimpleKPI,
                            params: {
                                value: number.round(computed.KPIsData.average, 2),
                            }
                        }
                    ]
                }
            ]
    })
};
