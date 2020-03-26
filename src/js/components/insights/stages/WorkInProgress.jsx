import { SimpleKPI } from 'js/components/insights/KPI';
import HorizontalBarChart from 'js/components/insights/charts/library/HorizontalBarChart';

import _ from 'lodash';

// TODO: Passing data should be removed in favor of letting each chart
// retrieving its own data using the api.
export const getInsights = (api, context, data) => [
    mostActiveDevs
].map(def => def.factory(def.calculator(def.fetcher(api, context, data))));

const mostActiveDevs = {
    fetcher: (api, context, data) => {
        // TODO: call the api to avoid receiving data from outside
        return data;
    },
    calculator: (data) => ({
        chartData: _(data.prs)
            .flatMap(pr => pr.authors)
            .countBy()
            .map((v, k) => ({x: v, y: _.replace(k, 'github.com/', '')}))
            .orderBy(['x'], ['desc'])
            .take(10)
            .value(),
        activeDevs: _(data.prs)
            .flatMap(pr => pr.participants)
            .filter(participant => _.intersection(
                participant.status,
                ['author', 'commit_author', 'commit_committer']
            ).length > 0)
            .map(pr => _.replace(pr.id, 'github.com/', ''))
            .uniq()
            .value(),
        avatarMapping: _(data.users)
            .reduce((res, v, k) => {
                res[_.replace(k, 'github.com/', '')] = v.avatar;
                return res;
            })
        ,
        totalPRs: data.prs.length
    }),
    factory: (computed) => ({
        meta: {
            title: 'Most Active Developer',
            description: 'Some description for "Most Active Developer"'
        },
        content: [
            {
                chart: {
                    component: HorizontalBarChart,
                    params: {
                        title: 'Number of Pull Requests created',
                        data: computed.chartData,
                        extra: {
                            yAxis: {
                                imageMapping: computed.avatarMapping,
                                imageMask: 'circle'
                            }
                        }
                    }
                },
                kpis: [
                    {
                        title: {text: 'Number of Active Developers', bold: true},
                        component: SimpleKPI,
                        params: {
                            value: computed.activeDevs.length
                        }
                    },
                    {
                        title: {text: 'Average Number of Pull Requests', bold: true},
                        subtitle: {text: 'Created by Developer'},
                        component: SimpleKPI,
                        params: {
                            value: computed.activeDevs.length > 0 ?
                                (computed.totalPRs / computed.activeDevs.length).toFixed(2) : 0,
                        }
                    },
                ]
            }
        ]
    })
};
