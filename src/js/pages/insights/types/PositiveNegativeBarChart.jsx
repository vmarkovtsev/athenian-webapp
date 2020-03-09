import React from 'react';

import {
    FlexibleWidthXYPlot,
    YAxis,
    HorizontalGridLines,
    VerticalBarSeries,
} from 'react-vis';

import { palette } from 'js/res/palette';

const data = [5, 15, -51, 10, -1, -3, 9, 7, 2, 55, 40, 10, -20, -10, -5, -1, 0, 0, 15, -5, -20, -25, -30, -32, -15, -10, -8, -1, 0, 3, 10, 15, 20, 20, 30, 40];

export default () => (
    <div style={{ background: 'white' }}>
        <PositiveNegativeBarChart data={data} />
    </div >
);

const PositiveNegativeBarChart = ({ data }) => {
    const averages = data.reduce((acc, v) => {
        let side;
        if (v > 0) {
            side = acc.gt;
        } else if (v < 0) {
            side = acc.lt;
        } else {
            return acc;
        }

        side.sum += v;
        side.length++;
        side.avg = side.sum / side.length;
        return acc;
    }, { gt: { sum: 0, length: 0, avg: 0 }, lt: { sum: 0, length: 0, avg: 0 } });

    const scheme = palette.schemes.positiveNegative;
    return (
        <FlexibleWidthXYPlot height={250}>
            <HorizontalGridLines />
            <YAxis />
            <HorizontalGridLines tickValues={[averages.gt.avg]} style={{ stroke: scheme.goodTrend, strokeWidth: '2px', strokeDasharray: [4, 4] }} />
            <HorizontalGridLines tickValues={[averages.lt.avg]} style={{ stroke: scheme.badTrend, strokeWidth: '2px', strokeDasharray: [4, 4] }} />
            <VerticalBarSeries data={data.map((v, i) => ({ x: i, y: v }))} colorType="literal" getColor={v => v.y < 0 ? scheme.bad : scheme.good} />
        </FlexibleWidthXYPlot>
    );
}
