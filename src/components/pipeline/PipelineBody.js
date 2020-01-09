import React from 'react';

import Card from '../base/Card';
import TimeSeries from '../charts/TimeSeries';

export default ({ charts, section }) => (
  <div>
    <div className="row">
      <div className="col-12">
        <p className="text-centerleft">{section}</p>
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
  <Card title={title}>
    {
      insights.length > 0 ?
        (
          <div className="row mb-4">
            <div className="col-8">
              {chart}
            </div>
            <div className="col-4 align-self-center">
              {insights.map((ins, i) => <Card title={ins.title} key={i}>{ins.value}</Card>)}
            </div>
          </div>
        ) : (
          <div className="row mb-4">
            <div className="col-12">
              {chart}
            </div>
          </div>
        )
    }
  </Card >
);
