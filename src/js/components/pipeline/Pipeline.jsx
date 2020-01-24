import React, { useState } from 'react';

import PipelineCard from 'js/components/pipeline/PipelineCard';
import PipelineBody from 'js/components/pipeline/PipelineBody';

export default ({ pipeline }) => {

  const [activeCard, activate] = useState(0);

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800 font-weight-bold text-lg">Lead Time</h1>
      </div>
      <div className="row mb-4 align-items-end">
        {
          pipeline.map(
            (card, i) =>
              <div className="col-md-2" key={i}>
                <PipelineCard
                  title={card.tab.title}
                  text={card.tab.text}
                  badge={card.tab.badge}
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
