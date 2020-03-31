import React, { useState } from 'react';

import {
  FlexibleWidthXYPlot, LineMarkSeries, AreaSeries,
  VerticalGridLines, HorizontalGridLines,
  XAxis, YAxis, Hint
} from 'react-vis';

import { palette } from 'js/res/palette';

import { dateTime } from 'js/services/format';
import { hexToRGBA } from 'js/services/colors';

export default ({ data, average, color = palette.schemes.primary, height = 300 }) => {
  const fillColor = hexToRGBA(color, .2);
  const [currentHover, setCurrentHover] = useState(null);
  return (
    <div style={{ background: 'white' }}>
      <FlexibleWidthXYPlot
        height={height}
        margin={{ left: 100 }}
      >
        <XAxis tickTotal={6}
          tickFormat={dateTime.monthDay}
        />
        <YAxis tickTotal={3} tickFormat={dateTime.human} />
        <HorizontalGridLines tickTotal={3} />
        <VerticalGridLines tickTotal={6} />
        <AreaSeries data={data} stroke="none" fill={fillColor} animation="stiff" />
        <LineMarkSeries
          data={data}
          strokeWidth={2}
          stroke={color}
          fill="white"
          animation="stiff"
          onValueMouseOver={(datapoint, event)=>{
              console.log('START: mouseover');

              if (!currentHover ||
                  (currentHover && (datapoint.x.toString() !== currentHover.x.toString() ||
                                    datapoint.y !== currentHover.y))) {
                  console.log('setting datapoint for current hover');
                  setCurrentHover(datapoint);
              }

              console.log('END: mouseover');
          }}
          onValueMouseOut={(datapoint, event)=>{
              console.log('START: mouseout');
              setCurrentHover(null);
              console.log('END: mouseout');
          }}
        />
        <HorizontalGridLines
          tickValues={[average]}
          style={{ stroke: palette.schemes.trend, strokeWidth: '2px', strokeDasharray: [4, 4] }}
          animation="stiff"
        />

        {currentHover &&
         <Hint value={currentHover}>
           // TODO: This needs to be styled.
           // `currentHover.x` is a datetime, `currentHover.y` is a number
           <div style={{background: 'black'}}>
             <h4>Value of hint</h4>
             <p>x: {currentHover.x.toString()}</p>
             <p>y: {currentHover.y}</p>
           </div>
         </Hint>}

      </FlexibleWidthXYPlot>
    </div>
  );
};
