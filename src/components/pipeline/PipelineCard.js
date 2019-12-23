import React from 'react';

import CleanAreaChart from '../charts/CleanAreaChart';
import Card from '../base/Card';

class PipelineCard extends React.Component {

  render = () => {
    return (
      <Card active={ this.props.active } onClick={ this.props.onClick }>
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className="text-xs font-weight-bold text-uppercase mb-1">{ this.props.title }</div>
            <div className="row no-gutters align-items-center">
              <PipelineCardMiniChart data={ this.props.data } color={ this.props.color }
                                     width={ 120 } height={ 100 }/>
            </div>
          </div>
        </div>
      </Card>
    );
  }

}

class PipelineCardMiniChart extends React.Component {

  render = () => {
    const gradient = {
      direction: 'vertical',
      sense: 0,
      stops: [
        {
          offset: "0%",
          stopColor: this.props.color,
          stopOpacity: 1
        },
        {
          offset: "100%",
          stopColor: this.props.color,
          stopOpacity: 0
        }
      ]
    };

    return (
      <CleanAreaChart data={this.props.data}
                      width={this.props.width} height={this.props.height}
                      fill={gradient} stroke={gradient}>
      </CleanAreaChart>
    );
  }
}

export default PipelineCard;
