import React from 'react';

import { fetchPRsMetrics } from 'js/services/api/index';

import { useApi } from 'js/hooks';

import FilledAreaChart from 'js/components/charts/FilledAreaChart';
import DataWidget from 'js/components/DataWidget';
import { palette } from 'js/res/palette';

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

    const defaultConfig = {
        height: 280,
        color: palette.stages[name],
    };

    const chartConfig = {...defaultConfig, ...config};

    return (
        <DataWidget
          id={`summary-chart-${name}`}
          component={FilledAreaChart} fetcher={fetcher} plumber={plumber}
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
