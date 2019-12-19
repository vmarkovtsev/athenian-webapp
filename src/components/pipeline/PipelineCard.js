import React from 'react';

import Example from '../charts/Example';

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
                <Example data={ data } color={ color } />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default PipelineCard;
