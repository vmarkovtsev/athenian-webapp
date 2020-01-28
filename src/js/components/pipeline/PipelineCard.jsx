import React from 'react';
import classnames from 'classnames';

import CleanAreaChart, { vertical } from 'js/components/charts/CleanAreaChart';

import { hexToRGBParts, rgba } from 'js/services/colors';

export default ({ title, text, badge, color, data, active, onClick }) => {
  const cardStyle = {};
  if (active) {
    cardStyle.background = rgba(hexToRGBParts(color), .7);
    cardStyle.borderBottomColor = color;
  };

  return (
    <div className={classnames('card shadow pipeline-thumbnail', active && 'active')} onClick={onClick} style={cardStyle}>
      <div className="card-body">
        <div className="row no-gutters card-title text-xs text-uppercase mb-3">
          <div className="col font-weight-bold">{title}</div>
          <div className="col-auto">
            <span className="badge badge-pill badge-secondary align-middle py-1 px-2">{badge}</span>
          </div>
        </div>
        <div className="row no-gutters card-text">
          <div className="col-5 text-md font-weight-bold">{text}</div>
          <div className="col-7 pl-2" style={{ height: 40 }}>
            <PipelineCardMiniChart data={data} color={color} active={active} />
          </div>
        </div>
      </div>
    </div >
  )
};

const PipelineCardMiniChart = ({ color, active, data }) => {
  if (active) {
    color = '#FFFFFF';
  }

  const fill = {
    direction: vertical,
    stops: [
      {
        offset: "0%",
        color,
        opacity: .5
      },
      {
        offset: "100%",
        color,
        opacity: 0
      }
    ]
  };

  const stroke = {
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
        opacity: 1
      }
    ]
  };

  return (
    <CleanAreaChart data={data}
      fill={fill} stroke={stroke} >
    </CleanAreaChart>
  );
};
