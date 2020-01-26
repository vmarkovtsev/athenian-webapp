import React from 'react';
import classnames from 'classnames';

import TimeSeries from 'js/components/charts/TimeSeries';
import Badge from 'js/components/ui/Badge';
import { BigNumber } from 'js/components/ui/Typography';
import Info from 'js/components/ui/Info'

export default ({ charts, section }) => (
  <div>
    <div className="row">
      <div className="col-12">
        <p className="text-centerleft font-weight-bold text-lg">{section}</p>
      </div>
    </div>
    {
      charts.map((chart, i) => {
        return <PipelineBodyCard key={i}
          title={chart.title}
          chart={
            <TimeSeries data={chart.data}
              color={chart.color} />
          }
          insights={chart.insights}>
        </PipelineBodyCard>;
      })
    }
  </div>
);

const PipelineBodyCard = ({ insights, title, chart }) => (
  <div className="card shadow mb-4">
    <div className="card-header bg-white font-weight-bold">
      {title}
      <Info content="Some chart description" />
    </div>
    <div className="card-body">
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
                    {insights.map((ins, i) => <PipelineBodyHint key={i}
                      title={ins.title}
                      subtitle={ins.subtitle}
                    >
                      <div className="font-weight-bold">
                        <BigNumber content="11 hours" />
                        <Badge value={ins.value} trend className="ml-2" />
                      </div>
                    </PipelineBodyHint>
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

const PipelineBodyHint = ({ title, subtitle, children }) => (
  <div className="card mb-4 bg-light border-0">
    <div className="card-body">
      {title && <h5 className={classnames('card-title text-xs text-uppercase', title.bold && 'font-weight-bold')}>{title.text}</h5>}
      {subtitle && <h6 className={classnames('card-subtitle mb-2 text-xs text-uppercase', subtitle.bold && 'font-weight-bold')}>{subtitle.text}</h6>}
      <div className="card-text">
        {children}
      </div>
    </div>
  </div>
);
