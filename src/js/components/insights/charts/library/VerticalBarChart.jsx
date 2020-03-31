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

import Tooltip, { onValueChange, onValueReset } from 'js/components/charts/Tooltip';

export default ({title, data, extra}) => (
    <div style={{ background: 'white' }}>
      <VerticalBarChart title={title} data={data} extra={extra} />
    </div >
);

const VerticalBarChart = ({ title, data, extra }) => {
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

    const color = extra.color;

    return (
        <FlexibleWidthXYPlot height={500} margin={{ left: 80, bottom: 100}} xType="ordinal">
          <XAxis tickLabelAngle={-45} />

          <HorizontalGridLines />
          <YAxis />
          {extra.axisLabels && extra.axisLabels.y && buildChartLabel(extra.axisLabels.y, 'y')}

          <VerticalBarSeries
            data={formattedData}
            color={color}
            barWidth={0.5}
            onValueMouseOver={(datapoint, event) => onValueChange(datapoint, "mouseover", currentHover, setCurrentHover)}
            onValueMouseOut={(datapoint, event) => onValueReset(datapoint, "mouseout", currentHover, setCurrentHover)}
          />

          {currentHover && <Tooltip value={currentHover} />}
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
