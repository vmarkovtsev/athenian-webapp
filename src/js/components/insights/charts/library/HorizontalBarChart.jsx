import React from 'react';

import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalBarSeries,
    DiscreteColorLegend,
} from 'react-vis';

export default ({title, data, extra}) => (
    <div style={{ background: 'white' }}>
      <HorizontalBarChart title={title} data={data} extra={extra} />
    </div >
);

const HorizontalBarChart = ({ title, data, extra }) => {
    if (data.length === 0) {
        return <></>;
    }

    const color = "#FFA008";
    const legend = [{title: title, color: color}];
    return (
        <FlexibleWidthXYPlot height={data.length * 40} margin={{ left: 50 }} yType="ordinal">
          <DiscreteColorLegend
            items={legend} orientation="horizontal"
            style={{ position: 'absolute', top: '-30px', right: '50%', transform: 'translateX(50%)' }} />
          <VerticalGridLines />
          <XAxis />

          <svg>
            <defs>
              <clipPath id="circle-mask" fill="black">
                <circle cx="15" cy="15" r="15" />
              </clipPath>
            </defs>
          </svg>

          {extra.yAxis.imageMapping ?
           <YAxis tickFormat={
               (value) => <image
                            href={extra.yAxis.imageMapping[value]}
                            clipPath={extra.yAxis.imageMask ? `url(#${extra.yAxis.imageMask}-mask)` : ""}
                            width="30" height="30"
                            transform="translate(-40,-15)" />
           } /> :
           <YAxis />}

          <HorizontalBarSeries data={data.reverse()} color={color} barWidth={0.5} />
        </FlexibleWidthXYPlot>
    );
};
