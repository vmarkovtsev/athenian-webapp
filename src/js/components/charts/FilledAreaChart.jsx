import React, { useState } from 'react';

import {
  FlexibleWidthXYPlot, LineMarkSeries, AreaSeries,
  VerticalGridLines, HorizontalGridLines,
  XAxis, YAxis
} from 'react-vis';

import { palette } from 'js/res/palette';

import { dateTime } from 'js/services/format';
import { hexToRGBA } from 'js/services/colors';

import { DateBigNumber, BigText, onValueChange, onValueReset } from 'js/components/charts/Tooltip';

import { computeTickValues } from 'js/components/insights/charts/library/TimeSeries';

export default ({ data, average, color = palette.schemes.primary, height = 300 }) => {
  const fillColor = hexToRGBA(color, .2);
  const [currentHover, setCurrentHover] = useState(null);
  const tickValues = computeTickValues(data, 6);

  return (
    <div style={{ background: 'white' }}>
      <FlexibleWidthXYPlot
        height={height}
        margin={{ left: 100 }}
      >
        <XAxis
          tickValues={tickValues}
          tickFormat={dateTime.monthDay}
        />
        <YAxis tickTotal={3}
               tickFormat={(s) => dateTime.human(s * 1000)}
        />
        <HorizontalGridLines tickTotal={3} />
        <VerticalGridLines tickValues={tickValues} />
        <AreaSeries data={data} stroke="none" fill={fillColor} animation="stiff" />
        <LineMarkSeries
          data={data}
          strokeWidth={2}
          stroke={color}
          fill="white"
          animation="stiff"
          onValueMouseOver={(datapoint, event) => onValueChange(datapoint, "mouseover", currentHover, setCurrentHover)}
          onValueMouseOut={(datapoint, event) => onValueReset(datapoint, "mouseout", currentHover, setCurrentHover)}
        />
        <HorizontalGridLines
          tickValues={[average]}
          style={{ stroke: palette.schemes.trend, strokeWidth: '2px', strokeDasharray: [4, 4] }}
          animation="stiff"
        />

        {currentHover && <DateBigNumber value={currentHover}
                                        renderBigFn={v => <BigText content={dateTime.human(v.y * 1000)} />} />}

      </FlexibleWidthXYPlot>
    </div>
  );
};
