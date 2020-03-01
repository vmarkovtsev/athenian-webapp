import React from 'react';

import {
  FlexibleWidthXYPlot, LineMarkSeries, AreaSeries,
  VerticalGridLines, HorizontalGridLines,
  XAxis, YAxis,
} from 'react-vis';

import { palette } from 'js/res/palette';

import { dateTime } from 'js/services/format';
import { hexToRGBA } from 'js/services/colors';

const dateFormat = dateTime.formater('%b %d')

export default ({ data, average, color = palette.schemes.primary, height = 300 }) => {
  const fillColor = hexToRGBA(color, .2);
  return (
    <div style={{ background: 'white' }}>
      <FlexibleWidthXYPlot
        height={height}
        margin={{ left: 100 }}
      >
        <XAxis tickTotal={6}
          tickFormat={dateFormat}
        />
        <YAxis tickTotal={3} tickFormat={dateTime.human} />
        <HorizontalGridLines tickTotal={3} />
        <VerticalGridLines tickTotal={6} />
        <AreaSeries data={data} stroke="none" fill={fillColor} animation="stiff" />
        <LineMarkSeries
          data={data}
          strokeWidth={2}
          stroke={color}
          fill="white"
          animation="stiff"
        />
        <HorizontalGridLines
          tickValues={[average]}
          style={{ stroke: palette.schemes.trend, strokeWidth: '2px', strokeDasharray: [4, 4] }}
          animation="stiff"
        />
      </FlexibleWidthXYPlot>
    </div>
  );
};

