import React from 'react';

import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalBarSeries,
    DiscreteColorLegend,
    ChartLabel,
} from 'react-vis';

import { palette } from 'js/res/palette';

const dataA = {
    title: '% review',
    data: [
        { x: 15, y: 'david' },
        { x: 51, y: 'marvin' },
        { x: 10, y: 'vadim' },
        { x: 1, y: 'miguel' },
        { x: 3, y: 'alberto' },
    ],
};

const dataB = {
    title: '% comments',
    data: [
        { x: 10, y: 'david' },
        { x: 1, y: 'marvin' },
        { x: 22, y: 'vadim' },
        { x: 5, y: 'miguel' },
        { x: 11, y: 'alberto' },
    ],
};

export default () => (
    <div style={{ background: 'white' }}>
        <HorizontalBarChart data={[dataA, dataB]} />
    </div >
);

const HorizontalBarChart = ({ data }) => {
    // TODO: handle bar -> color (if more than available colors)
    const availableColor = palette.schemes.duoSimilar;
    const legend = data.map((bar, i) => ({ title: bar.title, color: availableColor[i], strokeWidth: 10 }));

    return (
        <FlexibleWidthXYPlot height={250} margin={{ left: 50 }} yType="ordinal">
            <svg>
                <defs>
                    <clipPath id="circular-mask" fill="black">
                        <circle cx="15" cy="15" r="15" />
                    </clipPath>
                </defs>
            </svg>
            <DiscreteColorLegend className="chart-legend" items={legend} orientation="horizontal" />
            <VerticalGridLines />
            <XAxis />
            <YAxis tickFormat={() => <image href="https://avatars2.githubusercontent.com/u/2437584?v=4" clipPath="url(#circular-mask)" width="30" height="30" transform="translate(-30,-15)" />} />
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
            {data.map((barData, i) => <HorizontalBarSeries data={barData.data} color={availableColor[i]} key={i} />)}
        </FlexibleWidthXYPlot>
    );
}
