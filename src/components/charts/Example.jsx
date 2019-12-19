import React from 'react';

import { XYPlot, AreaSeries, GradientDefs } from 'react-vis';

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  return "rgba(" + r + ", " + g + ", " + b + ", " + (alpha || 0)  + ")";
}

export default function(props) {
  const key = Math.random().toString(36).substring(2, 15);

  return (
    <div style={{background:'transparent'}}>
      <XYPlot height={100} width={120}>
          <GradientDefs>
            <linearGradient id={ 'CoolGradient-' + key } x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={ hexToRGB(props.color, 1) } stopOpacity={0.5}/>
              <stop offset="90%" stopColor={ hexToRGB(props.color, 0) } stopOpacity={0.5} />
            </linearGradient>
          </GradientDefs>
          <AreaSeries data={props.data}
            fill={ 'url(#CoolGradient-' + key + ')' }
            stroke={ 'url(#CoolGradient-' + key + ')' }
            animation="bounce"
          />
      </XYPlot>
    </div>
  );
}
