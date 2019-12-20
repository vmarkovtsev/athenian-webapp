import React from 'react';

import { XYPlot, AreaSeries, GradientDefs } from 'react-vis';

function hexToRGB(hex) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

class CleanAreaChart extends React.Component {

  buildLinearGradient = (key, ns, config) => {
    const gpc = this.buildGradientPointsCoords(
      config.direction, config.sense);
    const stops = this.buildGradientStops(config.stops);

    return (
      <linearGradient id={ ns + '-' + key }
                      x1={ gpc.x1 } x2={ gpc.x2 }
                      y1={ gpc.y1 } y2={ gpc.y2 }>
        { stops }
      </linearGradient>
    );
  }

  buildGradientPointsCoords = (direction, sense) => {
    const gradientPointsCoords = {};
    if (direction === 'vertical') {
      if (sense === 0) {
        gradientPointsCoords.x1 = 0;
        gradientPointsCoords.x2 = 0;
        gradientPointsCoords.y1 = 0;
        gradientPointsCoords.y2 = 1;
      } else {
        gradientPointsCoords.x1 = 0;
        gradientPointsCoords.x2 = 0;
        gradientPointsCoords.y1 = 1;
        gradientPointsCoords.y2 = 0;
      }
    } else {
      if (sense === 0) {
        gradientPointsCoords.x1 = 0;
        gradientPointsCoords.x2 = 1;
        gradientPointsCoords.y1 = 0;
        gradientPointsCoords.y2 = 0;
      } else {
        gradientPointsCoords.x1 = 1;
        gradientPointsCoords.x2 = 0;
        gradientPointsCoords.y1 = 0;
        gradientPointsCoords.y2 = 0;
      }
    }

    return gradientPointsCoords;
  }

  buildGradientStops = (stops) => {
    return stops.map(s => (
      <stop offset={ s.offset }
            stopColor={ hexToRGB(s.stopColor) }
            stopOpacity={s.stopOpacity }/>
    ));
  }

  render = () => {
    const key = Math.random().toString(36).substring(2, 15);
    const gradients = [];

    var fillColor, strokeColor;
    if (typeof this.props.fill === 'object' && this.props.fill !== null) {
      gradients.push(this.buildLinearGradient(key, 'FillGradient', this.props.fill));
      fillColor = 'url(#FillGradient-' + key + ')';
    } else {
      fillColor = this.props.fill;
    }

    if (typeof this.props.stroke === 'object' && this.props.stroke !== null) {
      gradients.push(this.buildLinearGradient(key, 'StrokeGradient', this.props.stroke));
      strokeColor = 'url(#StrokeGradient-' + key + ')';
    } else {
      strokeColor = this.props.stroke;
    }

    return (
      <XYPlot width={ this.props.width } height={ this.props.height }>
        <GradientDefs>{ gradients }</GradientDefs>
        <AreaSeries data={ this.props.data }
                    fill={ fillColor }
                    stroke={ strokeColor }
        />
      </XYPlot>
    );
  }

}

export default CleanAreaChart;
