import React from 'react';
import _ from "lodash";
import classnames from 'classnames';

import { useApi } from 'js/hooks';

import DataWidget from 'js/components/DataWidget';
import { BigText } from 'js/components/charts/Tooltip';
import TimeSeries from 'js/components/insights/charts/library/TimeSeries';
import Badge from 'js/components/ui/Badge';
import { BigNumber } from 'js/components/ui/Typography';
import { SmallTitle } from 'js/components/ui/Typography';
import { StatusIndicator, READY } from 'js/components/ui/Spinner';
import { NEGATIVE_IS_BETTER } from 'js/components/ui/Badge';

import { pipelineStagesConf } from 'js/pages/pipeline/Pipeline';

import { dateTime, number, getBestTimeUnit } from 'js/services/format';
import { hexToRGBA } from 'js/services/colors';
import { palette } from 'js/res/palette';

export const StageSummaryMetrics = ({name, stage}) => {
    const metric = stage.metric;
    const { ready: apiReady, context: apiContext } = useApi();

    if (!apiReady) {
        return null;
    }

    const plumber = (data) => {
        const proportion = (
            data.global['prs-metrics.values'].all[metric] /
                data.global['prs-metrics.values'].all['cycle-time'] * 100
        );

        return (
            {
                kpisData: stage.summary(proportion, data.global.prs.prs, apiContext.interval),
                average: data.global['prs-metrics.values'].all[metric],
                variation: data.global['prs-metrics.variations'][metric],
                timeseries: _(data.global['prs-metrics.values'].custom[metric])
                    .map(d => ({x: d.date, y: d.value}))
                    .value()
            }
        );
    };

    const chartConfig = {
        height: 280,
        color: palette.stages[name],
    };

    const config = {
        chartConfig,
        KPIComponent: StageSummaryKPI,
        stage
    };

    return (
        <DataWidget
          id={`summary-chart-${name}`}
          component={SummaryMetrics} plumber={plumber}
          globalDataIDs={['prs', 'prs-metrics.values', 'prs-metrics.variations']}
          propagateSpinner={true}
          config={config}
        />
    );
};

export const OverviewSummaryMetrics = ({name, metric}) => {

    const plumber = (data) => {
        const cycleTime = data.global['prs-metrics.values'].all['cycle-time'] * 1000;
        const avgTimes = _(data.global['prs-metrics.values'].all)
              .pick(['wip-time', 'review-time', 'merging-time', 'release-time'])
              .mapValues(v => v * 1000)
              .value();
        const proportions = _(avgTimes)
              .mapValues(v => v * 100 / cycleTime)
              .value();
        const fastest = _(proportions).values().max();
        const normalizedProportions = _(proportions)
              .mapValues(v => v / fastest * 100)
              .value();

        return (
            {
                kpisData: {
                    normalizedProportions,
                    proportions,
                    avgTimes,
                },
                average: data.global['prs-metrics.values'].all[metric],
                variation: data.global['prs-metrics.variations'][metric],
                timeseries: _(data.global['prs-metrics.values'].custom[metric])
                    .map(d => ({x: d.date, y: d.value}))
                    .value()
            }
        );
    };

    const chartConfig = {
        height: 280,
        color: palette.stages[name],
    };

    const config = {
        chartConfig,
        KPIComponent: OverviewStageSummaryKPI,
        stage: pipelineStagesConf[0]
    };

    return (
        <DataWidget
          id={`summary-chart-${name}`}
          component={SummaryMetrics} plumber={plumber}
          globalDataIDs={['prs-metrics.values', 'prs-metrics.variations']}
          propagateSpinner={true}
          config={config}
        />
    );
};


const getBestFitDurationUnit = data => {
    const maxValue = _(data)
        .map(v => v.y * 1000)
        .max();

    return getBestTimeUnit(maxValue);
};

const SummaryMetrics = ({ data, stage, KPIComponent, status, chartConfig }) => {
    let [conversionValue, durationUnit] = [];
    let extra = {};
    let timeseries = [];

    if (status === READY) {
      [conversionValue, durationUnit] = getBestFitDurationUnit(data.timeseries);

      extra = {
        color: chartConfig.color,
        fillColor: hexToRGBA(chartConfig.color, .2),
        height: chartConfig.height,
        axisKeys: {x: 'x', y: 'y'},
        axisTickFormats: {y: s => `${s} ${durationUnit}`},
        maxNumberOfTicks: 6,
        average: {value: data.average * 1000 / conversionValue, color: palette.schemes.trend},
        tooltip: {renderBigFn: v => <BigText content={dateTime.bestTimeUnit(v.y * conversionValue)} />}
      };

      timeseries = data.timeseries.map(v => ({x: v.x, y: v.y === null ? null : v.y * 1000 / conversionValue}));
    }

    return (
        <div className={classnames('summary-metric card mb-4 px-2', stage.stageName)}>
          <div className="card-body" style={{minHeight: '305px'}}>
            <div className="row">
              <div className="col-4">
                <header className="font-weight-bold text-lg mt-2">{stage.summaryMetricTitle || stage.title}</header>
                {
                    status === READY &&
                        <div className="pl-2">
                          <div className="font-weight-bold mt-4 mb-3 pb-2 border-bottom">
                            <BigNumber content={dateTime.human(data.average * 1000)} isXL />
                            <Badge value={number.round(data.variation)} className="ml-2" trend={NEGATIVE_IS_BETTER} />
                          </div>
                          <div>
                            <KPIComponent data={data.kpisData} />
                          </div>
                        </div>
                }
              </div>
              {
                  status === READY &&
                      <div className="col-8 align-self-center">
                          <TimeSeries data={timeseries} extra={extra} />
                      </div>
              }
            </div>

            {status !== READY && <StatusIndicator status={status} color={chartConfig.color} />}
          </div>
        </div>
    );
};

const StageSummaryKPI = ({ data }) => {
  return (
    <div className="row">
      {data.map((kpi, key) =>
        <div className="col-md-6 mb-3" key={key}>
          <div className="mb-2"><SmallTitle content={kpi[0]} /></div>
          <div><BigNumber content={kpi[1]} /></div>
        </div>
      )}
    </div>
  );
};

const OverviewStageSummaryKPI = ({data}) => {
    const stages = pipelineStagesConf.slice(2, pipelineStagesConf.length);
    return (
        <>
          {stages.map((stage, i) => data.normalizedProportions[stage.metric] > 0 ?
            (
                <div key={i}>
                  <div><SmallTitle content={stage.title} /></div>
                  <span
                    className={classnames('overall-proportion d-block mb-2', stage.stageName)}
                    style={{ width: `${data.normalizedProportions[stage.metric]}%` }}
                    data-toggle="tooltip"
                    data-placement="right"
                    title={`${dateTime.human(data.avgTimes[stage.metric])} (${number.percentage(data.proportions[stage.metric])})`}
                  />
                </div>
            ) : (
              null
            )
          )}
        </>
    );
};
