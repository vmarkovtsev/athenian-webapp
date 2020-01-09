import React from 'react';

import { XYPlot, AreaSeries, GradientDefs } from 'react-vis';

import { hexToRGBA } from '../../utils/colors';

export default ({ fill, stroke, width, height, data }) => {

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
    gradients.push(<LinearGradient key={id} config={stroke} />);
    strokeColor = 'url(#' + id + ')';
  } else {
    strokeColor = stroke;
  }

  return (
    <XYPlot width={width} height={height}>
      <GradientDefs>
        {gradients}
      </GradientDefs>
      <AreaSeries data={data}
        fill={fillColor}
        stroke={strokeColor}
      />
    </XYPlot>
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
