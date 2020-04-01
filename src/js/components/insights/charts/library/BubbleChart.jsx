import React, { useState } from 'react';
import { scaleLog } from 'd3-scale';

import _ from 'lodash';

import {
    FlexibleWidthXYPlot,
    XAxis,
    CustomSVGSeries,
    DecorativeAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries,
    ChartLabel,
    DiscreteColorLegend
} from 'react-vis';

import Tooltip, { onValueChange, onValueReset } from 'js/components/charts/Tooltip';

export default ({title, data, extra}) => (
    <div style={{ background: 'white' }}>
      {extra.isLogScale ?
       <BubbleChartLogScale title={title} data={data} extra={extra} /> :
       <BubbleChart title={title} data={data} extra={extra} />}
    </div >
);

const formatData = (data, extra) => _(data)
      .map(v => {
          const d = {
              x: extra.axisKeys && extra.axisKeys.x ? v[extra.axisKeys.x] : v.x,
              y: extra.axisKeys && extra.axisKeys.y ? v[extra.axisKeys.y] : v.y,
              size: extra.axisKeys && extra.axisKeys.size ? v[extra.axisKeys.size] : v.size,
              label: extra.axisKeys && extra.axisKeys.label ? v[extra.axisKeys.label] : v.label,
          };

          if (extra.grouper) {
              d[extra.grouper] = v[extra.grouper];
          }

          return d;
      })
      .value();

const buildSeries = (title, formattedData, extra, currentHover, setCurrentHover) => {
    const transformer = extra.isLogScale ? logScale : (v) => v;
    let marksSeries;
    if (extra.grouper) {
        marksSeries = _(formattedData)
          .groupBy(extra.grouper)
          .map((series, k) => (
              <MarkSeries
                key={k}
                strokeWidth={2}
                color={extra.groups[k].color}
                data={series.map(v => ({
                    x: transformer(v.x),
                    y: transformer(v.y),
                    size: v.size,
                    label: v.label
                }))}
                onValueMouseOver={(datapoint, event) => onValueChange(datapoint, "mouseover", currentHover, setCurrentHover)}
                onValueMouseOut={(datapoint, event) => onValueReset(datapoint, "mouseout", currentHover, setCurrentHover)}
              />
          ))
            .value();
    } else {
        if (extra.useImages) {
            marksSeries = [
                <CustomSVGSeries
                  key={1}
                  data={
                      formattedData.map(v => ({
                          x: transformer(v.x),
                          y: transformer(v.y),
                          size: v.size,
                          label: v.label,
                          customComponent: () => (
                              <Pic
                                url={
                                    extra.yAxis.imageMapping && extra.yAxis.imageMapping[v.label] ?
                                        extra.yAxis.imageMapping[v.label] :
                                        "https://via.placeholder.com/30x30.png"
                                }
                                maskId={`${extra.yAxis.imageMask}-mask`}
                              />
                          )
                      }))
                  }
                  onValueMouseOver={
                      (datapoint, event) => onValueChange(
                          datapoint, "mouseover", currentHover, setCurrentHover,
                          ['customComponent'])
                  }
                  onValueMouseOut={
                      (datapoint, event) => onValueReset(
                          datapoint, "mouseout", currentHover, setCurrentHover)
                  }
                />
            ];
        } else {
            marksSeries = [
                <MarkSeries
                  key={1}
                  strokeWidth={2}
                  color={extra.color}
                  data={formattedData.map(v => ({
                      x: transformer(v.x),
                      y: transformer(v.y),
                      size: v.size,
                      label: v.label
                  }))}
                  onValueMouseOver={(datapoint, event) => onValueChange(datapoint, "mouseover", currentHover, setCurrentHover)}
                  onValueMouseOut={(datapoint, event) => onValueReset(datapoint, "mouseout", currentHover, setCurrentHover)}
                />
            ];
        }
    }

    return marksSeries;
};

const BubbleChart = ({ title, data, extra }) => {
    const [currentHover, setCurrentHover] = useState(null);

    if (data.length === 0) {
        return <></>;
    }

    const formattedData = formatData(data, extra);
    const marksSeries = buildSeries(title, formattedData, extra,
                                    currentHover, setCurrentHover);

    const legend = _(extra.groups)
          .map(v => ({ title: v.title, color: v.color }))
          .value();

    return (
        <FlexibleWidthXYPlot height={300} margin={{ top: 20, left: 50, right: 30, bottom: 50 }}>

          <DiscreteColorLegend items={legend} style={{
              position: 'absolute',
              left: '50px',
              top: '0px'
          }} />

          {extra && extra.yAxis && extra.yAxis.imageMapping ?
           <CircleMask id={`${extra.yAxis.imageMask}-mask`} maskProperties={{
               cx: 15, cy: 15, r: 15
           }}/> : null
          }

          <XBubbleChartAxis formattedData={formattedData} label={extra.axisLabels.x} />
          <YBubbleChartAxis formattedData={formattedData} label={extra.axisLabels.y} />

          {marksSeries}
          {currentHover && <Tooltip value={currentHover} />}

        </FlexibleWidthXYPlot>
    );
};

const Pic = ({url, maskId}) => (
    <image
      href={url}
      clipPath={`url(#${maskId})`}
      width="30"
      height="30"
      transform="translate(-15,-15)"
    />
);

const CircleMask = ({id, maskProperties}) => (
    <defs>
      <clipPath id={id} fill="black">
        <circle {...maskProperties} />
      </clipPath>
    </defs>
);

CircleMask.requiresSVG = true;

const BubbleChartLogScale = ({ title, data, extra }) => {
    const [currentHover, setCurrentHover] = useState(null);

    if (data.length === 0) {
        return <></>;
    }

    const formattedData = formatData(data, extra);
    const marksSeries = buildSeries(title, formattedData, extra,
                                    currentHover, setCurrentHover);

    const legend = _(extra.groups)
          .map(v => ({ title: v.title, color: v.color }))
          .value();

    const maxValueX = _.maxBy(formattedData, 'x')['x'];
    const maxExpX = Math.floor(logScale(maxValueX) + 1);

    const maxValueY = _.maxBy(formattedData, 'y')['y'];
    const maxExpY = Math.floor(logScale(maxValueY) + 1);

    return (
        <FlexibleWidthXYPlot height={300} margin={{ left: 50, right: 30, bottom: 50 }}
                             xDomain={[0, maxExpX]} yDomain={[0, maxExpY]} >
          <DiscreteColorLegend items={legend} style={{
              position: 'absolute',
              left: '50px',
              top: '0px'
          }} />

          <XBubbleChartLogAxis formattedData={formattedData} label={extra.axisLabels.x} />
          <YBubbleChartLogAxis formattedData={formattedData} label={extra.axisLabels.y} />

          {marksSeries}
          {currentHover && <Tooltip value={currentHover} />}

        </FlexibleWidthXYPlot>
    );
};

const XBubbleChartLogAxis = ({formattedData, label, ...props}) => (
    <BubbleChartLogAxis {...props} formattedData={formattedData} label={label} which={'x'} />
);

XBubbleChartLogAxis.requiresSVG = true;

const YBubbleChartLogAxis = ({formattedData, label, ...props}) => (
    <BubbleChartLogAxis {...props} formattedData={formattedData} label={label} which={'y'} />
);

YBubbleChartLogAxis.requiresSVG = true;

const BubbleChartLogAxis = ({formattedData, which, label, ...props}) => {

    const buildGridLine = ({tickValues, ...props}) => {
        const params = {
            tickValues: tickValues
        };

        if (which === 'x') {
            return <VerticalGridLines {...props} {...params} />;
        } else {
            return <HorizontalGridLines {...props} {...params} />;
        }
    };

    const buildAxis = ({tickValues, which, ...props}) => {
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
            return <XAxis {...props} {...params} />;
        } else {
            return <YAxis {...props} {...params} />;
        }
    };

    const buildDecorativeAxis = ({which, max, ...props}) => {
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
        return <DecorativeAxis {...props} {...params} />;
    };

    const buildChartLabel = ({text, which, ...props}) => {
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

        return <ChartLabel {...props} text={text} {...labelParams} />;
    };

    const maxValue = _.maxBy(formattedData, which)[which];
    const tickValues = calculateLogScaleTickValues(maxValue);
    const maxExp = Math.floor(logScale(maxValue) + 1);

    const gridLineProps = {
        ...props,
        ...{tickValues: tickValues}
    };
    const decorativeAxisProps = {
        ...props,
        ...{which: which, max: maxExp}
    };
    const axisProps = {
        ...props,
        ...{which: which, tickValues: tickValues}
    };
    const labelProps = {
        ...props,
        ...{text: label, which: which}
    };

    return (
        <>
          {buildGridLine(gridLineProps)}
          {buildDecorativeAxis(decorativeAxisProps)}
          {buildAxis(axisProps)}
          {buildChartLabel(labelProps)}
        </>
    );
};

BubbleChartLogAxis.requiresSVG = true;

const XBubbleChartAxis = ({formattedData, label, ...props}) => (
    <BubbleChartAxis {...props} formattedData={formattedData} label={label} which={'x'} />
);

XBubbleChartAxis.requiresSVG = true;

const YBubbleChartAxis = ({formattedData, label, ...props}) => (
    <BubbleChartAxis {...props} formattedData={formattedData} label={label} which={'y'} />
);

YBubbleChartAxis.requiresSVG = true;

const BubbleChartAxis = ({formattedData, which, label, ...props}) => {

    const buildChartLabel = ({text, which, ...props}) => {
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

        return <ChartLabel {...props} text={text} {...labelParams} />;
    };

    const labelProps = {
        ...props,
        ...{text: label, which: which}
    };

    if (which === 'x') {
        return (
            <>
              <VerticalGridLines {...props} />
              <XAxis {...props} />
              {buildChartLabel(labelProps)}
            </>
        );
    } else {
        return (
            <>
              <HorizontalGridLines {...props} />
              <YAxis {...props} />
              {buildChartLabel(labelProps)}
            </>
        );
    }
};

BubbleChartAxis.requiresSVG = true;

const calculateLogScaleTickValues = (maxValue) => {
    const tickValuesSets = [1];
    for (let exp = 1; ; exp++) {
        tickValuesSets.push(_.range(2, 11).map(v => v * 10**(exp - 1)));
        if (maxValue < 10**exp) {
            break;
        }
    }

    return _.flatten(tickValuesSets).map(logScale);
};

const logScale = scaleLog().base(10);
