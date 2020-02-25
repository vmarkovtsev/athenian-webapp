import React from 'react';

import { FlexibleXYPlot, AreaSeries, LineSeries, GradientDefs } from 'react-vis';

import { hexToRGBA } from 'js/services/colors';

import { extent } from 'd3-array';

export default ({ fill, stroke, data }) => {

  const key = () => Math.random().toString(36).substring(2, 15);
  const gradients = [];

  var fillColor, strokeColor;

  if (fill && fill.stops) {
    const id = 'FillGradient-' + key();
    gradients.push(<LinearGradient key={id} id={id} config={fill} />);
    fillColor = 'url(#' + id + ')';
  } else {
    fillColor = fill;
  }

  if (stroke && stroke.stops) {
    const id = 'StrokeGradient-' + key();
    gradients.push(<LinearGradient key={id} id={id} config={stroke} />);
    strokeColor = 'url(#' + id + ')';
  } else {
    strokeColor = stroke;
  }

  const [yMin, yMax] = extent(data, d => d.y);
  const newYMin = (yMin || 0) - ((yMax || 0) - (yMin || 0)) * .2

  return (
    <FlexibleXYPlot yDomain={[newYMin, yMax]} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
      <GradientDefs>
        {gradients}
      </GradientDefs>
      <LineSeries data={data} color={strokeColor} animation="stiff" />
      <AreaSeries data={data} stroke="none" fill={fillColor} animation="stiff" />
    </FlexibleXYPlot>
  );
};

const LinearGradient = ({ id, config }) => (
  <linearGradient id={id} gradientTransform={`rotate(${getRotation(config.direction)})`}>
    <GradientStops stops={config.stops} />
  </linearGradient>
);

const GradientStops = ({ stops }) => stops.map((stop, i) => (
  <stop offset={stop.offset} key={i}
    stopColor={hexToRGBA(stop.color)}
    stopOpacity={stop.opacity}
  />
));

export const vertical = 'vertical';
export const horizontal = 'horizontal';
const getRotation = direction => {
  switch (direction) {
    case vertical:
      return 90;
    case horizontal:
      return 0;
    default:
      return typeof direction === 'number' ? direction : 0;
  }
};
