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
import { NoData } from 'js/components/layout/Empty';

export default ({ data, color = palette.schemes.primary, height = 300 }) => {
  const {timeseries, average} = data;
  if (timeseries.length === 0) {
    return <NoData textOnly />;
  }

  const fillColor = hexToRGBA(color, .2);
  const [currentHover, setCurrentHover] = useState(null);
  const xTickValues = computeTickValues(timeseries, 6);
  const [conversionValue, durationUnit] = getBestFitDurationUnit(timeseries);

  const formattedData = _(timeseries)
    .map(v => ({...v, y: v.y * 1000 / conversionValue}))
    .value();

  const averagedData = [];
    averagedData.push({
        x: formattedData[0].x,
        y: average * 1000 / conversionValue
    });
    averagedData.push({
        x: formattedData[formattedData.length - 1].x,
        y: average * 1000 / conversionValue
    });

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
        <LineMarkSeries
          data={averagedData}
          stroke={palette.schemes.trend}
          strokeStyle="dashed"
          strokeWidth={2}
          fill="white"
          animation="stiff"
          onValueMouseOver={(datapoint, event) => onValueChange(datapoint, "mouseover", currentHover, setCurrentHover)}
          onValueMouseOut={(datapoint, event) => onValueReset(datapoint, "mouseout", currentHover, setCurrentHover)}
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
