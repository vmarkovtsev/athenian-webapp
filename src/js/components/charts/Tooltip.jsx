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

export const onValueChange = (datapoint, eventType, current, setCurrent, blacklist) => {
    console.log(`START: ${eventType}`);

    if (current && sameObjects(datapoint, current, blacklist)) {
        console.log(`END: ${eventType}`);
        return;
    }

    console.log('setting datapoint');
    setCurrent(getFilteredObject(datapoint, blacklist));
    console.log(`END: ${eventType}`);
};

export const onValueReset = (datapoint, eventType, current, setCurrent) => {
    console.log(`START: ${eventType}`);
    setCurrent(null);
    console.log(`END: ${eventType}`);
};

const sameObjects = (previous, current, blacklist) => {
    const filteredPrev = getFilteredObject(previous, blacklist);
    const filteredCurr = getFilteredObject(current, blacklist);

    return _.isEqual(filteredPrev, filteredCurr);
};

const getFilteredObject = (obj, blacklist) => _(obj).omit(blacklist).value();
