import React from 'react';

import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LabelSeries,
    CustomSVGSeries,
} from 'react-vis';


const data = [
    { x: 1, y: 12, label: 'david' },
    { x: 2, y: 5, label: 'marvin' },
    { x: 4, y: 7, label: 'vadim' },
    { x: 3, y: 15, label: 'miguel' },
    { x: 10, y: 15, label: 'alberto' },
];

export default () => (
    <div style={{ background: 'white' }}>
        <ScatterPlot data={data} />
    </div >
);

const ScatterPlot = ({ data }) => {
    return (
        <FlexibleWidthXYPlot height={250} margin={{ left: 50 }} xDomain={[0, 15]} yDomain={[0, 20]} sizeRange={[24, 26]}>
            <svg>
                <defs>
                    <clipPath id="circular-mask" fill="black">
                        <circle cx="15" cy="15" r="15" />
                    </clipPath>
                </defs>
            </svg>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <CustomSVGSeries
                data={data.map(datum => ({ ...datum, size: 25, customComponent: Pic }))}
            />
        </FlexibleWidthXYPlot>
    );
}

const Pic = () => <image href="https://avatars2.githubusercontent.com/u/2437584?v=4"
    clipPath="url(#circular-mask)"
    width="30"
    height="30"
    transform="translate(-30,-15)"
/>;