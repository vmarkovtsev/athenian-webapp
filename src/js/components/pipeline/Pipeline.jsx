import React, { useState } from 'react';

import PipelineCard from 'js/components/pipeline/PipelineCard';
import PipelineBody from 'js/components/pipeline/PipelineBody';
import TopFilter from 'js/components/pipeline/TopFilter';
import MainMetrics from 'js/components/pipeline/MainMetrics';

export default ({ pipeline }) => {

  const [activeCard, activate] = useState(0);

  return (
    <div>
      <TopFilter />
      <MainMetrics />

      <div className="row mb-4 align-items-end">
        {
          pipeline.map(
            (card, i) =>
              <div className="col-md-3" key={i}>
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
