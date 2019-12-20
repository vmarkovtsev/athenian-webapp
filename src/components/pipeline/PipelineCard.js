import React from 'react';

import CleanAreaChart from '../charts/CleanAreaChart';

class PipelineCard extends React.Component {

  render = () => {
    const title = this.props.title;
    const color = this.props.color;
    const data = this.props.data;

    return (
      <div className={ 'card shadow py-2 ' + (this.props.active ? 'active' : '') } onClick={ this.props.onClick }>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-uppercase mb-1">{ title }</div>
              <div className="row no-gutters align-items-center">
                <PipelineCardMiniChart data={ data } color={ color }
                                       width={ 120 } height={ 100 }/>
              </div>
            </div>
          </div>
        </div>
      </div>
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
