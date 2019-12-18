import React from 'react';

import ExampleCustomized from '../charts/ExampleCustomized';

class PipelineBody extends React.Component {

  render = () => {
    const charts = this.props.charts;
    const section = this.props.section;

    return [
      <div className="row">
        <div className="col-12">
          <p className="text-center">{ section }</p>
        </div>
      </div>,
      <div className="row mb-4">
        {
          charts.map(
            (card, i) =>
              <div className="col-lg-4">
                <div className="card shadow">
                  <div className="card-header">
                    { card.title }
                  </div>
                  <div className="card-body">
                    <ExampleCustomized data={ card.data } color={ card.color } />
                  </div>
                </div>
              </div>
          )
        }
      </div>
    ];
  }

}

export default PipelineBody;
