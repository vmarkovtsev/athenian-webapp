import React, { useState } from 'react';

import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalBarSeries,
    DiscreteColorLegend,
} from 'react-vis';

import Tooltip, { onValueChange, onValueReset } from 'js/components/charts/Tooltip';

import _ from 'lodash';

export default ({title, data, extra, tickFormat }) => (
    <div style={{ background: 'white' }}>
      <HorizontalBarChart title={title} data={data} extra={extra} tickFormat={tickFormat} />
    </div >
);

const HorizontalBarChart = ({ title, data, extra, tickFormat }) => {
    const [currentHover, setCurrentHover] = useState(null);

    if (data.length === 0) {
        return <></>;
    }

    const series = _(data)
          .reduce((acc, v) => {
              _(extra.axisKeys.x)
                  .each(ax => {
                      acc[ax] = acc[ax] || [];
                      acc[ax].push({
                          x: v[ax],
                          y: v[extra.axisKeys.y],
                          ...v.tooltip && {
                              tooltip: {
                                  author: v.tooltip?.author,
                                  image: v.tooltip?.image,
                                  [ax]: v.tooltip && v.tooltip[ax],
                              },
                          },
                      });
                  });
              return acc;
          }, {});

    const legend = _(series)
        .map((s, k) => ({
            title: extra.series[k].name,
            color: extra.series[k].color,
            strokeWidth: 10,
        }))
        .value();

    const ChartTooltip = extra?.tooltip?.template || Tooltip;

    return (
        <FlexibleWidthXYPlot height={data.length * 40} margin={{ left: 50 }} yType="ordinal">
          <DiscreteColorLegend className="chart-legend" items={legend} orientation="horizontal" />
          <VerticalGridLines />
          <XAxis tickFormat={v => tickFormat ? `${v}${tickFormat}` : v }/>

          {extra && extra.yAxis && extra.yAxis.imageMapping ?
           <CircleMask id={`${extra.yAxis.imageMask}-mask`} maskProperties={{
               cx: 15, cy: 15, r: 15
           }}/> : null
          }

          {_(series).map((s, k) => <HorizontalBarSeries
                                     data={s.reverse()}
                                     color={extra.series[k].color}
                                     key={k}
                                     barWidth={0.6}
                                     onValueMouseOver={(datapoint, event) => onValueChange(datapoint, "mouseover", currentHover, setCurrentHover)}
                                     onValueMouseOut={(datapoint, event) => onValueReset(datapoint, "mouseout", currentHover, setCurrentHover)}
                                   />).value()}

          { extra?.yAxis?.imageMapping && <UserNameBackground /> }

          {extra && extra.yAxis && extra.yAxis.imageMapping ?
           <YAxis tickFormat={
               (value) => (
                   extra.yAxis.imageMapping[value] ?
		       <g className="userIcon">
                           <image
                             href={extra.yAxis.imageMapping[value]}
                             clipPath={extra.yAxis.imageMask ? `url(#${extra.yAxis.imageMask}-mask)` : ""}
                             width="30" height="30"
                             transform="translate(-40,-15)"
                           />
                           <UserHint name={value} />
                       </g> :
                       value
               )
           } /> :
           <YAxis />}

          <ChartTooltip value={currentHover} />
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

const UserNameBackground = () => (
    <defs>
        <filter x="0" y="0" width="1" height="1" id="solid">
            <feFlood floodColor="white" />
            <feComposite in="SourceGraphic" />
        </filter>
    </defs>
);

UserNameBackground.requiresSVG = true;

const userFontSize = 16;
const UserHint = ({ name }) => (
    // TODO(dpordomingo): Style the 'User Icon' tooltip using SVG native elements;
    // alternative: investigate if it can be attached a javascript handler to <svg:image:onHover>,
    //    and use it to handle the react-vis Hint passing the (x,y) position of the triggered event.
    <text
        className="userName"
        x="0" y={30 + userFontSize * 1.3}
        transform="translate(-40,-15)"
        filter="url(#solid)"
        fill="black"
        fontSize={userFontSize}
    >
        {name}
    </text>
);
