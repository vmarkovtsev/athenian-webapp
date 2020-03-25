import React from 'react';
import { scaleLog } from 'd3-scale';

import _ from 'lodash';

import {
    FlexibleWidthXYPlot,
    XAxis,
    DecorativeAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries,
    ChartLabel,
    DiscreteColorLegend
} from 'react-vis';


export default ({title, data, extra}) => (
    <div style={{ background: 'white' }}>
    {extra.isLogScale ?
     <BubbleChartLogScale title={title} data={data} extra={extra} /> :
     <BubbleChart title={title} data={data} extra={extra} />}
    </div >
);

const BubbleChart = ({ title, data, extra }) => null;

const BubbleChartLogScale = ({ title, data, extra }) => {
    if (data.length === 0) {
        return <></>;
    }

    const formattedData = _(data).
          map(v => {
              const d = {
                  x: v[extra.axisKeys.x],
                  y: v[extra.axisKeys.y],
                  size: v[extra.axisKeys.size],
                  label: v.label
              };

              d[extra.grouper] = v[extra.grouper];
              return d;
          })
          .value();

    const marksSeries = _(formattedData)
          .groupBy(extra.grouper)
          .map((series, k) => (
              <MarkSeries
                key={k}
                strokeWidth={2}
                color={extra.groups[k].color}
                onValueMouseOver={v => console.log(v.label)}
                data={series.map(v => ({
                    x: logScale(v.x),
                    y: logScale(v.y),
                    size: v.size,
                    label: v.label
                }))}
              />
          ))
          .value();

    const legend = _(extra.groups)
          .map(v => ({ title: v.title, color: v.color }))
          .value();

    const maxValueX = _.maxBy(formattedData, 'x')['x'];
    const tickValuesX = calculateLogScaleTickValues(maxValueX);
    const maxExpX = Math.floor(logScale(maxValueX) + 1);

    const maxValueY = _.maxBy(formattedData, 'y')['y'];
    const tickValuesY = calculateLogScaleTickValues(maxValueY);
    const maxExpY = Math.floor(logScale(maxValueY) + 1);

    return (
        <FlexibleWidthXYPlot height={300} margin={{ left: 50, right: 30, bottom: 50 }}
                             xDomain={[0, maxExpX]} yDomain={[0, maxExpY]}>

          <DiscreteColorLegend items={legend} style={{
              position: 'absolute',
              left: '50px',
              top: '0px'
          }} />

          {buildGridLine('x', tickValuesX)}
          {buildDecorativeAxis('x', maxExpX)}
          {buildAxis('x', tickValuesX)}
          {buildChartLabel(extra.axisLabels.x, 'x')}

          {buildGridLine('y', tickValuesY)}
          {buildDecorativeAxis('y', maxExpY)}
          {buildAxis('y', tickValuesY)}
          {buildChartLabel(extra.axisLabels.y, 'y')}

          {marksSeries}

        </FlexibleWidthXYPlot>
    );
};

const calculateLogScaleTickValues = (maxValue) => {
    const tickValuesSets = [1];
    let exp = 1;
    while (true) {
        tickValuesSets.push(_.range(2, 11).map(v => v * 10**(exp - 1)));
        if (maxValue < 10**exp) {
            break;
        }

        exp += 1;
    }

    return _.flatten(tickValuesSets).map(logScale);
};

const buildDecorativeAxis = (which, max) => {
    const params = {
        x: {
            axisStart: {x: 0, y: 0},
            axisEnd: {x: max, y: 0},
            axisDomain: [0, max],
            numberOfTicks: max,
            style: {
                text: {x: 0, y: 30, textAnchor: 'middle'},
            }
        },
        y: {
            axisStart: {x: 0, y: 0},
            axisEnd: {x: 0, y: max},
            axisDomain: [0, max],
            numberOfTicks: max,
            style: {
                text: {x: -20, y: 3, textAnchor: 'end'},
            }
        }
    }[which];

    params.tickValue = v => v === 0 ? '' : Math.round(Math.pow(10, v));
    return <DecorativeAxis {...params} />;
};

const buildAxis = (which, tickValues) => {
    const params = {
        tickValues: tickValues,
        tickFormat: v => {
              const exp = Math.round(Math.pow(10, v));
              const expStr = exp.toString();
              const firstChar = expStr.charAt(0);
              const remaining = expStr.slice(1);
              return firstChar === '1' && parseInt(remaining) === 0 ? '' : firstChar;
        },
        style: {
              text: {fontWeight: 200, fontSize: '6px'}
        }
    };

    if (which === 'x') {
        return <XAxis {...params} />;
    } else {
        return <YAxis {...params} />;
    }
};

const buildGridLine = (which, tickValues) => {
    const params = {
        tickValues: tickValues
    };

    if (which === 'x') {
        return <VerticalGridLines {...params} />;
    } else {
        return <HorizontalGridLines {...params} />;
    }
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
                y: -40
            }

        }
    }[which];

    return <ChartLabel text={text} {...labelParams} />;
};

const logScale = scaleLog().base(10);
