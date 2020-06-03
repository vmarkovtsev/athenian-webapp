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
    const marginLeft = extra.margin?.left || extra.margin?.left === 0 ? extra.margin.left : 70;

    if (!data || data.length === 0) {
        return <></>;
    }

    const formattedData = _(data)
          .map(v => ({
              x: timeMode ? v[extra.axisKeys.x].getTime() : v[extra.axisKeys.x],
              y: v[extra.axisKeys.y] || 0,
              tooltip: v.tooltip,
          }))
          .value();

    const color = extra.color;

    const ChartTooltip = timeMode ? DateBigNumber : ( extra?.tooltip?.template || Tooltip );

    const maxY = _(formattedData).maxBy('y');
    const maxNumberOfTicks = (extra.maxNumberOfTicks || 10) > maxY?.y ? (maxY?.y || 0) : (extra.maxNumberOfTicks || 10);

    return (
      <div
        onMouseLeave={()=>onValueReset({}, "chart.mouseleave", currentHover, setCurrentHover)}
        onClick={()=>onValueReset({}, "chart.mouseclick", currentHover, setCurrentHover)}
      >
        <FlexibleWidthXYPlot height={300} margin={{ left: marginLeft, bottom: 100}} xType="ordinal">
          <XAxis
            tickLabelAngle={-45}
            tickFormat={timeMode ? dateTime.monthDay : v => v}
          />

          <HorizontalGridLines tickTotal={maxNumberOfTicks} />
          <YAxis tickTotal={maxNumberOfTicks} />
          {extra.axisLabels && extra.axisLabels.y && buildChartLabel(extra.axisLabels.y, 'y', marginLeft)}

          <VerticalBarSeries
            data={formattedData}
            color={color}
            barWidth={0.5}
            onValueMouseOver={(datapoint, event) => onValueChange(datapoint, "mouseover", currentHover, setCurrentHover)}
            onValueMouseOut={(datapoint, event) => {
              if (!extra?.tooltip?.persistent) {
                onValueReset(datapoint, "mouseout", currentHover, setCurrentHover);
              }
            }}
          />

          <ChartTooltip
            value={currentHover}
            dataPoint={currentHover}
            {...extra?.tooltip}
          />
        </FlexibleWidthXYPlot>
      </div>
    );
};

const buildChartLabel = (text, which, marginLeft) => {
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
                y: -(marginLeft - 20)
            }

        }
    }[which];

    return <ChartLabel text={text} {...labelParams} />;
};
