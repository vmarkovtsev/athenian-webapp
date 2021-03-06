import _ from 'lodash';

import { SimpleKPI } from 'js/components/insights/KPI';
import VerticalBarChart from 'js/components/insights/charts/library/VerticalBarChart';
import { TimeToMerge } from 'js/components/charts/Tooltip';

import { fetchPRsMetrics, fetchDevsMetrics } from 'js/services/api/index';
import { github, dateTime, number } from 'js/services/format';

import { palette } from 'js/res/palette';

export default {
    fetcher: async (api, context) => {
        const fetchChartData = async () => {
            const granularity = 'all';
            const metrics = ['merging-time', 'merging-count'];

            return await fetchPRsMetrics(
                api, context.account, [granularity], context.interval,
                metrics,
                { repositories: context.repositories, with: { author: context.contributors } },
                'repositories',
                context.excludeInactive,
            );
        };

        const fetchKPIsData = async() => {
            const metrics = [
                'prs-merged',
            ];

            return fetchDevsMetrics(
                api, context.account, context.interval, metrics,
                { repositories: context.repositories, developers: context.contributors},
                'repositories'
            );
        };

        return Promise.resolve({
            chartData: await fetchChartData(),
            KPIsData: await fetchKPIsData(),
        });
    },
    plumber: (data) => {
        const repos = _(data.chartData.calculated)
              .map(v => ({
                  repo: _(v.for.repositories[0]).split('/').nth(2),
                  prsMerged: v.values[0].values[1] || 0
              }))
              .filter(v => v.prsMerged > 0)
              .map(v => v.repo)
              .value();
        const totalRepos = repos.length;

        return {
            chartData: _(data.chartData.calculated)
                .map(v => ({
                    repo: _(v.for.repositories[0]).split('/').nth(2),
                    delay: (v.values[0].values[0] || 0) / 3600,
                    tooltip: {
                        repository: github.repoOrg(v.for.repositories[0]) + '/' + github.repoName(v.for.repositories[0]),
                        time: dateTime.human((v.values[0].values[0] || 0) * 1000),
                    },
                }))
                .filter(v => _(repos).includes(v.repo))
                .orderBy(['delay'], ['desc'])
                .take(10)
                .value(),
            KPIsData: {
                avgTimeToMerge: _(data.chartData.calculated)
                    .map(v => (v.values[0].values[0] || 0) / 3600)
                    .mean(),
                avgUniqueMergesPerRepo: _(data.KPIsData.calculated)
                    .map(v => ({
                        repo: _(v.for.repositories[0]).split('/').nth(2),
                        mergers: _(v.values).flatMap()
                            .filter(v => v > 0)
                            .value()
                            .length
                    }))
                    .filter(v => _(repos).includes(v.repo))
                    .sumBy('mergers') / totalRepos
            },
            axisKeys: {
                x: 'repo',
                y: 'delay',
            },
            totalPRs: data.length,
        };
    },
    factory: (computed) => ({
            meta: {
                title: 'Merge Time',
                description: 'Identify in which repositories pull requests take longest from review approval to being merged.'
            },
            content: [
                {
                    empty: computed.chartData.length === 0,
                    chart: {
                        component: VerticalBarChart,
                        params: {
                            data: computed.chartData,
                            extra: {
                                axisKeys: computed.axisKeys,
                                axisLabels: {
                                    y: 'hours'
                                },
                                color: palette.schemes.trend,
                                tooltip: { template: TimeToMerge },
                            }
                        }
                    },
                    kpis: [
                        {
                            title: {text: 'Average Number of Mergers', bold: true},
                            subtitle: {text: 'Per Repository'},
                            component: SimpleKPI,
                            params: {
                                value: number.round(computed.KPIsData.avgUniqueMergesPerRepo, 2),
                            }
                        },
                        {
                            title: {text: 'Average Merge Time', bold: true},
                            subtitle: {text: 'Per Repository'},
                            component: SimpleKPI,
                            params: {
                                value: number.round(computed.KPIsData.avgTimeToMerge, 2),
                                unit: {
                                    singular: 'hour',
                                    plural: 'hours'
                                }
                            }
                        },
                    ]
                }
            ]
    })
};
