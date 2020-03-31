import React, { useState } from 'react';

import { dateTime } from 'js/services/format';

import _ from 'lodash';

import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    MarkSeries
} from 'react-vis';

import Tooltip, { onValueChange, onValueReset } from 'js/components/charts/Tooltip';

export default ({title, data, extra}) => (
    <div style={{ background: 'white' }}>
      <TimeSeries title={title} data={data} extra={extra} />
    </div >
);

const buildChartLabel = (text, which) => {
    const labelParams = {
        x: {
            includeMargin: false,
            xPercent: 0.5,
            yPercent: 1.0,
            style: {
                y: 60,
                textAnchor: 'middle',
            }
        },
        y: {
            includeMargin: false,
            xPercent: 0.0,
            yPercent: 0.5,
            style: {
                textAnchor: 'middle',
                transform: 'rotate(-90)',
                y: -60
            }

        }
    }[which];

    return <ChartLabel text={text} {...labelParams} />;
};

const computeTickValues = (formattedData, maxNumberOfTicks) => {
    const tickValues = _(formattedData)
          .map(v => v.x.getTime())
          .value();

    if (maxNumberOfTicks && maxNumberOfTicks > 0) {
        const everyEach = Math.ceil(tickValues.length / maxNumberOfTicks);
        return _(tickValues)
            .at(_.range(0, formattedData.length, everyEach))
            .value();
    } else {
        return tickValues;
    }
};

const TimeSeries = ({ title, data, extra }) => {
    const [currentHover, setCurrentHover] = useState(null);

    if (data.length === 0) {
        return <></>;
    }

    const formattedData = _(data)
          .map(v => ({
              x: v[extra.axisKeys.x],
              y: v[extra.axisKeys.y]
          }))
          .value();

    const tickValues = computeTickValues(formattedData, extra.maxNumberOfTicks);

    const referenceData = [];
    if (extra.reference) {
        referenceData.push({
            x: formattedData[0].x,
            y: extra.reference.value
        });
        referenceData.push({
            x: formattedData[formattedData.length - 1].x,
            y: extra.reference.value
        });
    }

    return (
        <FlexibleWidthXYPlot height={300} margin={{ left: 100, right: 30 }}>

          <VerticalGridLines tickValues={tickValues} />
          <XAxis tickValues={tickValues} tickFormat={dateTime.monthDay} />
          <HorizontalGridLines />
          <YAxis />
          {extra.axisLabels && extra.axisLabels.y && buildChartLabel(extra.axisLabels.y, 'y')}

          <LineSeries data={formattedData} color={extra.color} animation="stiff" />
          <MarkSeries
            sizeRange={[5, 15]}
            stroke={extra.color}
            fill="white"
            strokeWidth={3}
            data={formattedData}
            animation="stiff"
            onValueMouseOver={(datapoint, event) => onValueChange(datapoint, "mouseover", currentHover, setCurrentHover)}
            onValueMouseOut={(datapoint, event) => onValueReset(datapoint, "mouseout", currentHover, setCurrentHover)}
          />

          {referenceData.length > 0 &&
           <LineSeries data={referenceData} color={extra.reference.color}
                       strokeStyle="dashed" animation="stiff" />}
          {referenceData.length > 0 &&
           <MarkSeries
             sizeRange={[5, 15]}
             stroke={extra.reference.color}
             fill="white"
             strokeWidth={3}
             data={referenceData}
             animation="stiff"
           />}

          {currentHover && <Tooltip value={currentHover} />}
        </FlexibleWidthXYPlot>
    );
};
