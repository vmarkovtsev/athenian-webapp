import React, { useState } from 'react';

import PipelineCard from './PipelineCard';
import PipelineBody from './PipelineBody';

export default ({ pipeline }) => {

  const [activeCard, activate] = useState(0);

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Lead Time</h1>
      </div>
      <div className="row mb-4">
        {
          pipeline.map(
            (card, i) =>
              <div className="col-md-2" key={i}>
                <PipelineCard
                  title={card.tab.title}
                  color={card.tab.color}
                  data={card.tab.data}
                  onClick={e => activate(i)}
                  active={activeCard === i}
                >
                </PipelineCard>
              </div>
          )
        }
      </div>
      <PipelineBody
        section={pipeline[activeCard].tab.title}
        charts={pipeline[activeCard].body.charts}
      >
      </PipelineBody>
    </div>
  );
};
