import React, { useState } from 'react';

import { dateTime, getBestFitDurationUnit } from 'js/services/format';

import _ from 'lodash';

import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    MarkSeries,
    LineMarkSeries,
    AreaSeries,
} from 'react-vis';

import { DateBigNumber, onValueChange, onValueReset } from 'js/components/charts/Tooltip';
import { NoData } from 'js/components/layout/Empty';

export default ({title, data, extra, ...rest}) => (
    <div style={{ background: 'white' }}>
      <TimeSeries title={title} data={data} extra={extra} {...rest} />
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
                y: -80
            }
        }
    }[which];

    return <ChartLabel text={text} {...labelParams} />;
};

export const computeTickValues = (formattedData, maxNumberOfTicks) => {
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

const filterEmptyValues = v => v !== null;

const TimeSeries = ({ title, data, extra, timeMode }) => {
    const [currentHover, setCurrentHover] = useState(null);

    if (data.length === 0) {
        return <NoData textOnly />;
    }

    const formattedData = _(data)
          .map(v => ({
              ...v.legend && { legend: v.legend },
              x: v[extra.axisKeys.x],
              y: v[extra.axisKeys.y]
          }))
          .value();

    const [conversionValue, unit] = timeMode ? getBestFitDurationUnit(formattedData) : [1, ''];
    const scaleY = y => y === null ? null : y / conversionValue;

    const dataPoints = formattedData
        .filter(v => (extra.filterValuesFn || filterEmptyValues)(v.y))
        .map(v => ({...v, y: scaleY(v.y)}));

    const tickFormatY = y => `${y} ${unit}`.trim();

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

    const averagedData = [];
    if (extra.average) {
        averagedData.push({
            x: formattedData[0].x,
            y: scaleY(extra.average.value),
        });
        averagedData.push({
            x: formattedData[formattedData.length - 1].x,
            y: scaleY(extra.average.value),
        });
    }

    return (
        <FlexibleWidthXYPlot height={extra.height || 300} margin={{ left: 100, right: 30 }}>

          <VerticalGridLines tickValues={tickValues} />
          <XAxis tickValues={tickValues} tickFormat={dateTime.monthDay} />
          <HorizontalGridLines tickTotal={3} />
          <YAxis tickTotal={3} tickFormat={tickFormatY} />
          {extra.axisLabels && extra.axisLabels.y && buildChartLabel(extra.axisLabels.y, 'y')}

          {extra.fillColor && <AreaSeries data={dataPoints} stroke="none" fill={extra.fillColor} animation="stiff" /> }
          <LineMarkSeries
            sizeRange={[5, 15]}
            fill="white"
            stroke={extra.color}
            lineStyle={{strokeWidth:2}}
            markStyle={{strokeWidth:3}}
            data={dataPoints}
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

          {averagedData.length > 0 &&
           <LineMarkSeries
             data={averagedData}
             strokeWidth={2}
             stroke={extra.average.color}
             strokeStyle="dashed"
             fill="white"
             animation="stiff"
             onValueMouseOver={(datapoint, event) => onValueChange(datapoint, "mouseover", currentHover, setCurrentHover)}
             onValueMouseOut={(datapoint, event) => onValueReset(datapoint, "mouseout", currentHover, setCurrentHover)}
           />}

          <DateBigNumber
            value={currentHover}
            dataPoint={currentHover && {...currentHover, y: currentHover.y === null ? null : currentHover.y / scaleY(1)}}
            renderBigFn={ extra?.tooltip?.renderBigFn}
          />
        </FlexibleWidthXYPlot>
    );
};
