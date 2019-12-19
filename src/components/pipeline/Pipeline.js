import React from 'react';

import PipelineCard from './PipelineCard';
import PipelineBody from './PipelineBody';

class Pipeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {activeCard: 0};
  }

  render = () => {
    const pipeline = this.props.pipeline;

    return [
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lead Time</h1>
      </div>,
      <div className="row mb-4">
        {
          pipeline.map(
            (card, i) =>
              <div className="col-md-2" key={ i }>
                <PipelineCard
                  title={ card.tab.title }
                  color={ card.tab.color }
                  data={ card.tab.data }
                  onClick={(e) => this.onPipelineCardClick(i)}
                  active={ this.state.activeCard === i }
                >
                </PipelineCard>
              </div>
          )
        }
      </div>,
      <PipelineBody
        section={ pipeline[this.state.activeCard].tab.title }
        charts={ pipeline[this.state.activeCard].body.charts }
      >
      </PipelineBody>
    ];
  }

  onPipelineCardClick = (index) => {
    console.log("clicked " + index);
    this.setState({activeCard: index});
  }

}

export default Pipeline;
