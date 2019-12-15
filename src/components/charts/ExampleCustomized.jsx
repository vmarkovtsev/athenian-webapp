import React, { Component } from 'react';

import { XYPlot, LineSeries, MarkSeries,
  VerticalGridLines, HorizontalGridLines,
  XAxis, YAxis } from 'react-vis';

export default function(props) {
  return (
    <div style={{background:'white'}}>
      <XYPlot
        height={300}
        width={300}
        xDomain={[0, 10]}
        yDomain={[0, 10]}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickValues={[0, 2,4,6,8]}
        />
        <YAxis
          tickValues={[2,4,6,8]}
        />
        <LineSeries data={props.data} color="rgb(255,107,93,1)" animation="stiff" />
        <MarkSeries
          className="mark-series-example"
          sizeRange={[5, 15]}
          stroke="blue"
          fill="white"
          strokeWidth={3}
          data={props.data}
          animation="stiff"
        />
      </XYPlot>
    </div>
  );
}
