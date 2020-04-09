import React from 'react';

import { fetchPRsMetrics } from 'js/services/api/index';

import { useApi } from 'js/hooks';

import CleanAreaChart, { vertical } from 'js/components/charts/CleanAreaChart';
import Chart from 'js/components/charts/Chart';

import moment from 'moment';
import _ from "lodash";

export default ({name, metric, config}) => {
    const { api, ready: apiReady, context: apiContext } = useApi();

    if (!apiReady) {
        return null;
    }

    const { account, interval, repositories, contributors: developers } = apiContext;
    const granularity = calculateGranularity(interval);

    const fetcher = async () => {
        return fetchPRsMetrics(
            api, account, granularity, interval, [metric],
            { repositories, developers }
        );
    };

    const plumber = (data) => _(data.calculated[0].values)
          .map(v => ({
              x: v.date,
              y: v.values[0] || 0
          }))
          .value();

    const color = config.color;
    const fill = {
        direction: vertical,
        stops: [
            {
                offset: "0%",
                color,
                opacity: .8
            },
            {
                offset: "100%",
                color,
                opacity: .1
            }
        ]
    };

    const stroke = {
        direction: vertical,
        stops: [
            {
                offset: "0%",
                color,
                opacity: 1
            },
            {
                offset: "100%",
                color,
                opacity: 1
            }
        ]
    };

    const defaultConfig = {fill, stroke};
    const chartConfig = {...defaultConfig, ...config};

    return (
        <Chart
          id={`pipeline-card-mini-chart-${name}`}
          component={CleanAreaChart} fetcher={fetcher} plumber={plumber}
          config={chartConfig}
        />
    );
};

const calculateGranularity = (interval) => {
    console.log(interval);
    const diff = moment(interval.to).diff(interval.from, 'days');

    if (diff <= 21) {
        return 'day';
    }

    if (diff <= 90) {
        return 'week';
    }

    return 'month';
};
