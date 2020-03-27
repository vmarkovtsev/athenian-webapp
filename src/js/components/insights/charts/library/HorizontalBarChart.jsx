import React from 'react';

import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalBarSeries,
    DiscreteColorLegend,
} from 'react-vis';

import _ from 'lodash';

export default ({title, data, extra}) => (
    <div style={{ background: 'white' }}>
      <HorizontalBarChart title={title} data={data} extra={extra} />
    </div >
);

const HorizontalBarChart = ({ title, data, extra }) => {
    if (data.length === 0) {
        return <></>;
    }

    const series = _(data)
          .reduce((acc, v) => {
              _(extra.axisKeys.x)
                  .map(ax => {
                      acc[ax] = acc[ax] || [];
                      acc[ax].push({
                          x: v[ax],
                          y: v[extra.axisKeys.y]
                      });
                  })
                  .value();
              return acc;
          }, {});

    const legend = _(series)
        .map((s, k) => ({
            title: extra.series[k].name,
            color: extra.series[k].color,
        }))
        .value();

    return (
        <FlexibleWidthXYPlot height={data.length * 40} margin={{ left: 50 }} yType="ordinal">
          <DiscreteColorLegend
            items={legend} orientation="horizontal"
            style={{ position: 'absolute', top: '-30px', right: '50%', transform: 'translateX(50%)' }} />
          <VerticalGridLines />
          <XAxis />

          {extra && extra.yAxis && extra.yAxis.imageMapping ?
           <CircleMask id={`${extra.yAxis.imageMask}-mask`} maskProperties={{
               cx: 15, cy: 15, r: 15
           }}/> : null
          }

          {extra && extra.yAxis && extra.yAxis.imageMapping ?
           <YAxis tickFormat={
               (value) => (
                   extra.yAxis.imageMapping[value] ?
                       <image
                         href={extra.yAxis.imageMapping[value]}
                         clipPath={extra.yAxis.imageMask ? `url(#${extra.yAxis.imageMask}-mask)` : ""}
                         width="30" height="30"
                         transform="translate(-40,-15)"
                       /> :
                   value
               )
           } /> :
           <YAxis />}

          {_(series).map((s, k) => <HorizontalBarSeries
                                     data={s.reverse()}
                                     color={extra.series[k].color}
                                     key={k}
                                     barWidth={extra.barWidth || 0.5}/>).value()}
        </FlexibleWidthXYPlot>
    );
};


const CircleMask = ({id, maskProperties}) => (
    <defs>
      <clipPath id={id} fill="black">
        <circle {...maskProperties} />
      </clipPath>
    </defs>
);

CircleMask.requiresSVG = true;
