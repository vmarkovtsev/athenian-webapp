import React from 'react';

import _ from 'lodash';

import {
    Hint
} from 'react-vis';

export default ({value, ...props}) => {
    // TODO: This needs to be styled.
    // `value` is a flat key-value object
    return (
        <Hint {...props} value={value}>
          <div style={{background: 'black'}}>
            <h4>Value of hint</h4>

            {
                _(value).map((v, k) => {
                    // How each key-value is rendered
                    return <p key={k}>{k}: {v.toString()}</p>;
                }).value()
            }

          </div>
        </Hint>
    );
};

export const onValueChange = (datapoint, eventType, current, setCurrent) => {
    console.log(`START: ${eventType}`);

    if (!current ||
        (current && (datapoint.x.toString() !== current.x.toString() ||
                          datapoint.y !== current.y))) {
        console.log('setting datapoint');
        setCurrent(datapoint);
    }

    console.log(`END: ${eventType}`);
};

export const onValueReset = (datapoint, eventType, current, setCurrent) => {
    console.log(`START: ${eventType}`);
    setCurrent(null);
    console.log(`END: ${eventType}`);
};
