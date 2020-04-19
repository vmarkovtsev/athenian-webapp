import React, { useState } from 'react';
import { timeFormat } from 'd3-time-format';

import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalBarSeries,
    DiscreteColorLegend,
    ChartLabel,
    Hint,
} from 'react-vis';

import { palette } from 'js/res/palette';

const dataA = {
    title: 'one',
    data: [
        { x: Date.now() + 3 * 1000 * 60 * 60 * 24, y: 5 },
        { x: Date.now() + 5 * 1000 * 60 * 60 * 24, y: 15 },
        { x: Date.now() + 8 * 1000 * 60 * 60 * 24, y: 51 },
        { x: Date.now() + 11 * 1000 * 60 * 60 * 24, y: 10 },
        { x: Date.now() + 13 * 1000 * 60 * 60 * 24, y: 1 },
        { x: Date.now() + 12 * 1000 * 60 * 60 * 24, y: 3 },
        { x: Date.now() + 18 * 1000 * 60 * 60 * 24, y: 9 },
        { x: Date.now() + 21 * 1000 * 60 * 60 * 24, y: 7 },
        { x: Date.now() + 22 * 1000 * 60 * 60 * 24, y: 2 },
    ],
};

const dataB = {
    title: 'two',
    data: [
        { x: Date.now() + 3 * 1000 * 60 * 60 * 24, y: 1 },
        { x: Date.now() + 5 * 1000 * 60 * 60 * 24, y: 18 },
        { x: Date.now() + 8 * 1000 * 60 * 60 * 24, y: 56 },
        { x: Date.now() + 11 * 1000 * 60 * 60 * 24, y: 20 },
        { x: Date.now() + 13 * 1000 * 60 * 60 * 24, y: 10 },
        { x: Date.now() + 12 * 1000 * 60 * 60 * 24, y: 1 },
        { x: Date.now() + 18 * 1000 * 60 * 60 * 24, y: 20 },
        { x: Date.now() + 21 * 1000 * 60 * 60 * 24, y: 20 },
        { x: Date.now() + 22 * 1000 * 60 * 60 * 24, y: 30 },
    ],
};

export default () => (
    <div style={{ background: 'white' }}>
        <VerticalBarChart data={[dataA, dataB]} />
    </div >
);

const VerticalBarChart = ({ data }) => {
    // TODO: handle bar -> color (if more than available colors)
    const availableColor = palette.schemes.duoSimilar;
    const legend = data.map((bar, i) => ({ title: bar.title, color: availableColor[i], strokeWidth: 10  }));
    const [activeValueState, setActiveValueState] = useState(null);

    const persistentHint = true;
    const removeHint = () => setActiveValueState();

    return (
        <div className="container"
            onMouseLeave={removeHint}
            onClick={removeHint}
        >
            <FlexibleWidthXYPlot
                height={250}
                xType="ordinal"
                xDistance={100}
                margin={{ bottom: 100, left: 50 }}
            >
                <DiscreteColorLegend className="chart-legend" items={legend} orientation="horizontal" />
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
                {data.map((barData, i) => <VerticalBarSeries
                    data={barData.data}
                    color={availableColor[i]}
                    key={i}
                    onValueMouseOver={setActiveValueState}
                    onValueClick={(_, event) => event.event.stopPropagation()}
                    onValueMouseOut={() => { !persistentHint && removeHint() }}
                />)}

                {activeValueState && (
                    <Hint value={activeValueState} style={{ pointerEvents: 'auto' }}>
                        <div style={{ background: 'white', border: '1px solid black' }} onClick={event => event.stopPropagation()}>
                            {JSON.stringify(activeValueState)} |
                            <a href="http://google.es" target="_blank" rel="noopener noreferrer">google</a>
                        </div>
                    </Hint>
                )}
            </FlexibleWidthXYPlot>
        </div>
    );
}
