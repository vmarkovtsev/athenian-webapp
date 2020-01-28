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
      xDomain={[0, 10]}
      yDomain={[0, 10]}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis
        tickValues={[0, 2, 4, 6, 8]}
      />
      <YAxis
        tickValues={[2, 4, 6, 8]}
      />
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

