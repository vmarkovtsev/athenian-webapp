import React, { Component } from 'react';

import { XYPlot, AreaSeries, GradientDefs } from 'react-vis';

export default function(props) {
  const fill = props.pattern ? 'url(#Pattern)' : 'url(#CoolGradient)';

  return (
    <div style={{background:'white'}}>
      <XYPlot height={300} width={300}>
          <GradientDefs>
            <pattern id="Pattern" patternUnits="userSpaceOnUse" width="9.5" height="9.5" patternTransform="rotate(45)">
              <line x1="0" y="0" x2="0" y2="9.5" stroke="rgb(255,107,93,1)" strokeWidth="1" />
            </pattern>
            <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(255,107,93,1)" stopOpacity={0.5}/>
              <stop offset="90%" stopColor="rgb(255,107,93,0)" stopOpacity={0.5} />
            </linearGradient>
          </GradientDefs>
          <AreaSeries data={props.data}
            fill={ fill }
            stroke={'url(#CoolGradient)'}
            animation="bounce"
          />
      </XYPlot>
    </div>
  );
}
