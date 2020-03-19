import React from 'react';
import { scaleLog } from 'd3-scale';

import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    MarkSeries,
} from 'react-vis';


const data = [
    { x: 7, y: 2, label: 'PR#12', size: 5 },
    { x: 22, y: 9, label: 'PR#15', size: 30 },
    { x: 55, y: 3, label: 'PR#02', size: 20 },
    { x: 90, y: 5, label: 'PR#33', size: 15 },
    { x: 125, y: 21, label: 'PR#01', size: 35 },
    { x: 920, y: 33, label: 'PR#10', size: 60 },
];

export default () => (
    <div style={{ background: 'white' }}>
        <BubbleChart data={data} />
    </div >
);

const BubbleChart = ({ data }) => {
    return (
        <FlexibleWidthXYPlot height={250} margin={{ left: 50 }} xDomain={[0, 3]}>
            <svg>
                <defs>
                    <clipPath id="circular-mask" fill="black">
                        <circle cx="15" cy="15" r="15" />
                    </clipPath>
                </defs>
            </svg>
            <VerticalGridLines tickValues={[1, 2, 4, 6, 8, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map(logScale)} />
            <HorizontalGridLines tickValues={[1, 2, 4, 6, 8, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(logScale)} />
            <XAxis
                tickValues={[0, 10, 100, 1000].map(v => logScale(v))}
                tickFormat={v => Math.pow(10, v)}
            />
            <YAxis
                tickValues={[0, 10, 100].map(v => logScale(v))}
                tickFormat={v => Math.pow(10, v)}
            />
            <MarkSeries
                className="mark-series-example"
                strokeWidth={2}
                onValueMouseOver={v => console.log(v.label)}
                data={data.map(v => ({ x: logScale(v.x), y: logScale(v.y), size: v.size }))}
            />
        </FlexibleWidthXYPlot>
    );
}

const logScale = scaleLog().base(10);
const logEScale = scaleLog().base(5);