import React from 'react';

import ExampleCustomized from '../charts/ExampleCustomized';
import Card from '../base/Card';

class PipelineBody extends React.Component {

  render = () => {
    const bodySections = this.props.charts.map((chart) => {
      return <PipelineBodyCard
               title={ chart.title }
               chart={
                 <ExampleCustomized data={ chart.data }
                                    color={ chart.color } />
               }
               insights={ chart.insights }>
             </PipelineBodyCard>;
    });

    return [
      <div className="row">
        <div className="col-12">
          <p className="text-centerleft">{ this.props.section }</p>
        </div>
      </div>,
      ...bodySections
    ];
  }

}

class PipelineBodyCard extends React.Component {

  render = () => {
    const insights = this.props.insights.map(
      (ins) => <Card title={ ins.title }>{ ins.value }</Card>);

    let content;

    if (insights.length > 0) {
      content = [
        <div className="col-8">
          { this.props.chart }
        </div>,
        <div className="col-4 align-self-center">
          { insights }
        </div>
      ];
    } else {
      content = <div className="col-12">
                  { this.props.chart }
                </div>;
    }

    return (
      <Card title={ this.props.title }>
        <div className="row mb-4">
          { content }
        </div>
      </Card>
    );
  }

}


export default PipelineBody;
