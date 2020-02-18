import React from 'react';
import { timeFormat } from 'd3-time-format';

import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalBarSeries,
    DiscreteColorLegend,
    ChartLabel,
} from 'react-vis';
import { palette } from 'js/res/palette';

const dataA = {
    title: 'one',
    data: [
        { x: 3, y: 5 },
        { x: 5, y: 15 },
        { x: 8, y: 51 },
        { x: 11, y: 10 },
        { x: 13, y: 1 },
        { x: 12, y: 3 },
        { x: 18, y: 9 },
        { x: 21, y: 7 },
        { x: 22, y: 2 },
    ],
};

const dataB = {
    title: 'two',
    data: [
        { x: 3, y: 1 },
        { x: 5, y: 18 },
        { x: 8, y: 56 },
        { x: 11, y: 20 },
        { x: 13, y: 10 },
        { x: 12, y: 1 },
        { x: 18, y: 20 },
        { x: 21, y: 20 },
        { x: 22, y: 30 },
    ],
};



export default () => (
    <div style={{ background: 'white' }}>
        <VerticalBarChart data={[dataA, dataB]} />
    </div >
);

const VerticalBarChart = ({ data }) => {
    // TODO: handle bar -> color (if more than available colors)
    const availableColor = Object.keys(palette.charts);
    const legend = data.map((bar, i) => ({ title: bar.title, color: palette.charts[availableColor[i]] }));

    return (
        <FlexibleWidthXYPlot height={250} xType="ordinal" xDistance={100} margin={{ bottom: 100, left: 50 }}>
            <DiscreteColorLegend items={legend} orientation="horizontal" style={{ position: 'absolute', top: '-30px', right: '50%', transform: 'translateX(50%)' }} />
            <HorizontalGridLines />
            <XAxis tickTotal={6}
                tickFormat={timeFormat("%B %d, %Y")}
                tickLabelAngle={-45}
            />
            <YAxis title="something" />
            <ChartLabel
                text="Y Axis"
                className="alt-y-label"
                includeMargin={false}
                xPercent={-0.06}
                yPercent={0.06}
                style={{
                    transform: 'rotate(-90)',
                    textAnchor: 'end'
                }}
            />
            {data.map((barData, i) => <VerticalBarSeries data={barData.data} color={palette.charts[availableColor[i]]} key={i} />)}
        </FlexibleWidthXYPlot>
    );
}
