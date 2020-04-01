import React from 'react';
import classnames from 'classnames';

import Badge from 'js/components/ui/Badge';
import { BigNumber } from 'js/components/ui/Typography';
import { SmallTitle } from 'js/components/ui/Typography';

import { dateTime, number } from 'js/services/format';

import { palette } from 'js/res/palette';

import FilledAreaChart from 'js/components/charts/FilledAreaChart';
import { NEGATIVE_IS_BETTER } from 'js/components/ui/Badge';

export const SummaryMetrics = ({ conf, children }) => {
  return (
    <div className={classnames('summary-metric card mb-4 px-2', conf.stageName)}>
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <header className="font-weight-bold text-lg mt-2">{conf.title}</header>
            <div className="pl-2">
              <div className="font-weight-bold mt-4 mb-3 pb-2 border-bottom">
                <BigNumber content={dateTime.human(conf.avg)} isXL />
                <Badge value={number.round(conf.variation)} className="ml-2" trend={NEGATIVE_IS_BETTER} />
              </div>
              <div>
                {children}
              </div>
            </div>
          </div>
          <div className="col-8 align-self-center">
            {conf && conf.data && <FilledAreaChart
              data={conf.data}
              height={280}
              color={palette.stages[conf.stageName]}
              average={conf.avg}
            />}
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
