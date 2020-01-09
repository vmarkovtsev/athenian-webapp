import React from 'react';

import CleanAreaChart, { vertical } from '../charts/CleanAreaChart';
import Card from '../base/Card';

export default ({ title, color, data, active, onClick }) => (
  <Card active={active} onClick={onClick}>
    <div className="row no-gutters align-items-center">
      <div className="col mr-2">
        <div className="text-xs font-weight-bold text-uppercase mb-1">{title}</div>
        <div className="row no-gutters align-items-center">
          <PipelineCardMiniChart data={data} color={color} width={120} height={100} />
        </div>
      </div>
    </div>
  </Card>
);

const PipelineCardMiniChart = ({ color, data, width, height }) => {
  const gradient = {
    direction: vertical,
    stops: [
      {
        offset: "0%",
        color,
        opacity: 1
      },
      {
        offset: "100%",
        color,
        opacity: 0
      }
    ]
  };

  return (
    <CleanAreaChart data={data}
      width={width} height={height}
      fill={gradient} stroke={gradient} >
    </CleanAreaChart>
  );
};
