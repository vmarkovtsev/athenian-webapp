import React from 'react';

import CleanAreaChart, { vertical } from 'js/components/charts/CleanAreaChart';

export default ({data, config}) => {
    const color = config.color;
    const fill = {
        direction: vertical,
        stops: [
            {
                offset: "0%",
                color,
                opacity: .8
            },
            {
                offset: "100%",
                color,
                opacity: .1
            }
        ]
    };

    const stroke = {
        direction: vertical,
        stops: [
            {
                offset: "0%",
                color,
                opacity: 1
            },
            {
                offset: "100%",
                color,
                opacity: 1
            }
        ]
    };

    return <CleanAreaChart fill={fill} stroke={stroke} data={data}/>;
};
