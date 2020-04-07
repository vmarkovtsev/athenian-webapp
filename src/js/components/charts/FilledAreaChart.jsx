import React, { useState } from 'react';

import {
  FlexibleWidthXYPlot, LineMarkSeries, AreaSeries,
  VerticalGridLines, HorizontalGridLines,
  XAxis, YAxis
} from 'react-vis';

import _ from 'lodash';

import { palette } from 'js/res/palette';

import { dateTime, getBestTimeUnit } from 'js/services/format';
import { hexToRGBA } from 'js/services/colors';

import { DateBigNumber, BigText, onValueChange, onValueReset } from 'js/components/charts/Tooltip';

import { computeTickValues } from 'js/components/insights/charts/library/TimeSeries';

export default ({ data, average, color = palette.schemes.primary, height = 300 }) => {
  const fillColor = hexToRGBA(color, .2);
  const [currentHover, setCurrentHover] = useState(null);
  const xTickValues = computeTickValues(data, 6);
  const [conversionValue, durationUnit] = getBestFitDurationUnit(data);

  const formattedData = _(data)
    .map(v => ({...v, y: v.y * 1000 / conversionValue}))
    .value();

  return (
    <div style={{ background: 'white' }}>
      <FlexibleWidthXYPlot
        height={height}
        margin={{ left: 100 }}
      >
        <XAxis
          tickValues={xTickValues}
          tickFormat={dateTime.monthDay}
        />
        <YAxis tickTotal={3}
               tickFormat={(s) => `${s} ${durationUnit}`}
        />
        <HorizontalGridLines tickTotal={3} />
        <VerticalGridLines tickValues={xTickValues} />
        <AreaSeries data={formattedData} stroke="none" fill={fillColor} animation="stiff" />
        <LineMarkSeries
          data={formattedData}
          strokeWidth={2}
          stroke={color}
          fill="white"
          animation="stiff"
          onValueMouseOver={(datapoint, event) => onValueChange(datapoint, "mouseover", currentHover, setCurrentHover)}
          onValueMouseOut={(datapoint, event) => onValueReset(datapoint, "mouseout", currentHover, setCurrentHover)}
        />
        <HorizontalGridLines
          tickValues={[average * 1000 / conversionValue]}
          style={{ stroke: palette.schemes.trend, strokeWidth: '2px', strokeDasharray: [4, 4] }}
          animation="stiff"
        />

        <DateBigNumber value={currentHover} renderBigFn={
            v => <BigText content={dateTime.bestTimeUnit(v.y * conversionValue)} />
        } />

      </FlexibleWidthXYPlot>
    </div>
  );
};

const getBestFitDurationUnit = (data) => {
    const maxValue = _(data)
          .map(v => v.y * 1000)
          .max();

    return getBestTimeUnit(maxValue);
};
