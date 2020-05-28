import React, { useState } from 'react';
import _ from 'lodash';
import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalBarSeries,
    ChartLabel,
} from 'react-vis';

import Tooltip, { onValueChange, onValueReset, DateBigNumber } from 'js/components/charts/Tooltip';

import { dateTime } from 'js/services/format';

export default ({title, data, extra, ...rest}) => (
    <div style={{ background: 'white' }}>
      <VerticalBarChart title={title} data={data} extra={extra} {...rest} />
    </div >
);

const VerticalBarChart = ({ title, data, extra, timeMode }) => {
    const [currentHover, setCurrentHover] = useState(null);

    if (data.length === 0) {
        return <></>;
    }

    const formattedData = _(data)
          .map(v => ({
              x: timeMode ? v[extra.axisKeys.x].getTime() : v[extra.axisKeys.x],
              y: v[extra.axisKeys.y],
              tooltip: v.tooltip,
          }))
          .value();

    const color = extra.color;

    const ChartTooltip = timeMode ? DateBigNumber : ( extra?.tooltip?.template || Tooltip );

    const maxY = _(formattedData).maxBy('y');
    const maxNumberOfTicks = (extra.maxNumberOfTicks || 10) > maxY?.y ? (maxY?.y || 0) : (extra.maxNumberOfTicks || 10);

    return (
        <FlexibleWidthXYPlot height={500} margin={{ left: 80, bottom: 100}} xType="ordinal">
          <XAxis
            tickLabelAngle={-45}
            tickFormat={timeMode ? dateTime.monthDay : v => v}
          />

          <HorizontalGridLines tickTotal={maxNumberOfTicks} />
          <YAxis tickTotal={maxNumberOfTicks} />
          {extra.axisLabels && extra.axisLabels.y && buildChartLabel(extra.axisLabels.y, 'y')}

          <VerticalBarSeries
            data={formattedData}
            color={color}
            barWidth={0.5}
            onValueMouseOver={(datapoint, event) => onValueChange(datapoint, "mouseover", currentHover, setCurrentHover)}
            onValueMouseOut={(datapoint, event) => onValueReset(datapoint, "mouseout", currentHover, setCurrentHover)}
          />

          {timeMode ?
            (
              <DateBigNumber
                value={currentHover}
                dataPoint={currentHover}
                renderBigFn={ extra?.tooltip?.renderBigFn }
              />
            ) : (
              <ChartTooltip value={currentHover} />
            )
        }

        </FlexibleWidthXYPlot>
    );
};

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
