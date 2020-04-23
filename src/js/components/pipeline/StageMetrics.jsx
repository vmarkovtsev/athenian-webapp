import React from 'react';
import classnames from 'classnames';
import FilledAreaChart from 'js/components/charts/FilledAreaChart';
import Badge from 'js/components/ui/Badge';
import { useApi } from 'js/hooks';
import { BigNumber } from 'js/components/ui/Typography';
import { pipelineStagesConf } from 'js/pages/pipeline/Pipeline';
import { SmallTitle } from 'js/components/ui/Typography';
import DataWidget from 'js/components/DataWidget';
import { dateTime, number } from 'js/services/format';
import { palette } from 'js/res/palette';
import { NEGATIVE_IS_BETTER } from 'js/components/ui/Badge';
import _ from "lodash";

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
          config={config}
        />
    );
};

export const OverviewSummaryMetrics = ({name, metric}) => {

    const plumber = (data) => {
        const cycleTime = data.global['prs-metrics.values'].all['cycle-time'];
        const proportions = _(data.global['prs-metrics.values'].all)
              .pick(['wip-time', 'review-time', 'merging-time', 'release-time'])
              .mapValues(v => v * 100 / cycleTime)
              .value();
        const fastest = _(proportions).values().max();
        const normalizedProportions = _(proportions)
              .mapValues(v => v / fastest * 100)
              .value();

        return (
            {
                kpisData: {
                    normalizedProportions
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
          config={config}
        />
    );
};

const SummaryMetrics = ({ data, stage, KPIComponent, chartConfig }) => {
  return (
    <div className={classnames('summary-metric card mb-4 px-2', stage.stageName)}>
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <header className="font-weight-bold text-lg mt-2">{stage.summaryMetricTitle || stage.title}</header>
            <div className="pl-2">
              <div className="font-weight-bold mt-4 mb-3 pb-2 border-bottom">
                <BigNumber content={dateTime.human(data.average * 1000)} isXL />
                <Badge value={number.round(data.variation)} className="ml-2" trend={NEGATIVE_IS_BETTER} />
              </div>
              <div>
                <KPIComponent data={data.kpisData} />
              </div>
            </div>
          </div>
          <div className="col-8 align-self-center">
            <FilledAreaChart data={{timeseries: data.timeseries, average: data.average}} {...chartConfig}/>
          </div>
        </div>
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
          {stages.map((stage, i) => (
              <div key={i}>
                <div><SmallTitle content={stage.title} /></div>
                <span
                  className={classnames('overall-proportion d-block mb-2', stage.stageName)}
                  style={{ width: `${data.normalizedProportions[stage.metric]}%` }}
                  data-toggle="tooltip"
                  data-placement="right"
                  title={`${dateTime.human(stage.avg)} (${number.percentage(stage.overallProportion)})`}
                />
              </div>
          ))}
        </>
    );
};
