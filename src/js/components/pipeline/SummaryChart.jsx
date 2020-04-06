import React from 'react';

import { fetchPRsMetrics } from 'js/services/api/index';

import { useApi } from 'js/hooks';

import FilledAreaChart from 'js/components/charts/FilledAreaChart';
import Chart from 'js/components/charts/Chart';
import { palette } from 'js/res/palette';

import moment from 'moment';
import _ from "lodash";

export default ({name, metric, config}) => {
    const { api, ready: apiReady, context: apiContext } = useApi();
    const { account, interval, repositories, contributors: developers } = apiContext;
    const granularity = calculateGranularity(interval);

    if (!apiReady) {
        return null;
    }

    const adjustedInterval = {
        from: moment(interval.from).subtract(1, 'days').toDate(),
        to: interval.to
    };

    const fetcher = async () => {
        return fetchPRsMetrics(
            api, account, granularity, adjustedInterval, [metric],
            { repositories, developers }
        );
    };

    const plumber = (data) => _(data.calculated[0].values)
          .map(v => ({
              x: v.date,
              y: v.values[0] || 0
          }))
          .value();

    const defaultConfig = {
        height: 280,
        color: palette.stages[name],
    };

    const chartConfig = {...defaultConfig, ...config};

    return (
        <Chart
          id={`summary-chart-${name}`}
          component={FilledAreaChart} fetcher={fetcher} plumber={plumber}
          config={chartConfig}
        />
    );
};

const calculateGranularity = (interval) => {
    // TODO: apply the following logic:
    // <= 1 week: daily
    // <= 2 months: weekly
    // > 2 months: monthly
    return 'day';
};
