import React from 'react';
import classnames from 'classnames';

import TimeSeries from 'js/components/charts/TimeSeries';
import Badge from 'js/components/ui/Badge';
import { BigNumber } from 'js/components/ui/Typography';
import Info from 'js/components/ui/Info'
import { SmallTitle } from 'js/components/ui/Typography';

import { dateTime, number } from 'js/services/format';

import { palette } from 'js/res/palette';

import FilledAreaChart from 'js/components/charts/FilledAreaChart';

export default ({ conf, metrics, children }) => {
  return (
    <div>
      <SummaryMetric
        chart={conf && conf.data && <FilledAreaChart
          data={conf.data}
          height={280}
          color={palette.stages[conf.stageName]}
          average={conf.avg}
        />}
        data={{
          metric: conf.stageName,
          title: conf.title,
          average: conf.avg,
          variation: conf.variation,
        }}
      >
        {children}
      </SummaryMetric>
      {
        metrics.map((chart, i) => {
          return <Metric key={i}
            title={chart.title}
            chart={
              <TimeSeries data={chart.data}
                color={chart.color} />
            }
            insights={chart.insights}>
          </Metric>;
        })
      }
    </div>
  );
}

const SummaryMetric = ({ data, chart, children }) => {
  return (
    <div className={classnames('summary-metric card mb-4 px-2', data.metric)}>
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <header className="font-weight-bold text-lg mt-2">{data.title}</header>
            <div className="pl-2">
              <div className="font-weight-bold mt-4 mb-3 pb-2 border-bottom">
                <BigNumber content={dateTime.human(data.average)} isXL />
                <Badge value={number.round(data.variation)} className="ml-2" trend />
              </div>
              <div>
                {children}
              </div>
            </div>
          </div>
          <div className="col-8 align-self-center">
            {chart}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StageSummaryKPI = ({ data }) => {
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

const Metric = ({ insights, title, chart }) => (
  <div className="card mb-4">
    <div className="card-header bg-white font-weight-bold text-dark p-4">
      <span className="text-m">{title}</span>
      <Info content="Some chart description" />
    </div>
    <div className="card-body py-5 px-4">
      {
        insights.length > 0 ?
          (
            <div className="row">
              <div className="col-7">
                {chart}
              </div>
              <div className="col-5 align-self-center">
                <div className="row justify-content-center">
                  <div className="col-8">
                    {insights.map((ins, i) => <MetricKPI key={i}
                      title={ins.title}
                      subtitle={ins.subtitle}
                    >
                      <div className="font-weight-bold">
                        <BigNumber content="11 hours" />
                        <Badge value={number.round(ins.value)} trend className="ml-2" />
                      </div>
                    </MetricKPI>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                {chart}
              </div>
            </div>
          )
      }
    </div>
  </div >
);

const MetricKPI = ({ title, subtitle, children }) => (
  <div className="card mb-4 bg-light border-0">
    <div className="card-body p-4">
      {title && <h5 className={classnames('card-title text-xs text-uppercase', title.bold && 'font-weight-bold')}>{title.text}</h5>}
      {subtitle && <h6 className={classnames('card-subtitle mb-2 text-xs text-uppercase', subtitle.bold && 'font-weight-bold')}>{subtitle.text}</h6>}
      <div className="card-text">
        {children}
      </div>
    </div>
  </div>
);
