import { SimpleKPI } from 'js/components/insights/KPI';
import VerticalBarChart from 'js/components/insights/charts/library/VerticalBarChart';

import { fetchPRsMetrics, fetchDevsMetrics } from 'js/services/api/index';

import _ from 'lodash';

const mergeDelays = {
    fetcher: async (api, context) => {
        const fetchChartData = async () => {
            const granularity = 'all';
            const metrics = ['merging-time', 'merging-count'];

            return await fetchPRsMetrics(
                api, context.account, granularity, context.interval,
                metrics,
                { repositories: context.repositories, developers: context.contributors},
                'repositories'
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
    calculator: (fetched) => {
        const repos = _(fetched.chartData.calculated)
              .map(v => ({
                  repo: _(v.for.repositories[0]).split('/').nth(2),
                  prsMerged: v.values[0].values[1] || 0
              }))
              .filter(v => v.prsMerged > 0)
              .map(v => v.repo)
              .value();
        const totalRepos = repos.length;

        return {
            chartData: _(fetched.chartData.calculated)
                .map(v => ({
                    repo: _(v.for.repositories[0]).split('/').nth(2),
                    delay: (v.values[0].values[0] || 0) / 3600
                }))
                .filter(v => _(repos).includes(v.repo))
                .orderBy(['delay'], ['desc'])
                .take(10)
                .value(),
            KPIsData: {
                avgTimeToMerge: _(fetched.chartData.calculated)
                    .map(v => (v.values[0].values[0] || 0) / 3600)
                    .mean(),
                avgUniqueMergesPerRepo: _(fetched.KPIsData.calculated)
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
            totalPRs: fetched.length,
        };
    },
    factory: (computed) => ({
            meta: {
                title: 'Merge Delays',
                description: 'Some description for "Merge Delays"'
            },
            content: [
                {
                    chart: {
                        component: VerticalBarChart,
                        params: {
                            title: 'Merge Delays',
                            data: computed.chartData,
                            extra: {
                                axisKeys: computed.axisKeys,
                                axisLabels: {
                                    y: 'Time to Merge, Hours'
                                },
                                color: "#4EC7EE"
                            }
                        }
                    },
                    kpis: [
                        {
                            title: {text: 'Average Number of Uninque Mergers', bold: true},
                            subtitle: {text: 'Per Repository'},
                            component: SimpleKPI,
                            params: {
                                value: Number(computed.KPIsData.avgUniqueMergesPerRepo.toFixed(2))
                            }
                        },
                        {
                            title: {text: 'Average Time to Merge', bold: true},
                            subtitle: {text: 'Per Repository'},
                            component: SimpleKPI,
                            params: {
                                value: Number(computed.KPIsData.avgTimeToMerge.toFixed(2)),
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

export default mergeDelays;
