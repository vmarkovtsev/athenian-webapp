import React from 'react';

import {
  FlexibleWidthXYPlot, LineSeries, MarkSeries,
  VerticalGridLines, HorizontalGridLines,
  XAxis, YAxis
} from 'react-vis';

export default ({ data, color }) => (
  <div style={{ background: 'white' }}>
    <FlexibleWidthXYPlot
      height={300}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <LineSeries data={data} color={color} animation="stiff" />
      <MarkSeries
        className="mark-series-example"
        sizeRange={[5, 15]}
        stroke={color}
        fill="white"
        strokeWidth={3}
        data={data}
        animation="stiff"
      />
    </FlexibleWidthXYPlot>
  </div>
);

