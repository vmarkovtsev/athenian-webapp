import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import moment from 'moment';
import { Hint } from 'react-vis';

import { number } from 'js/services/format';

export default ({value, ...props}) => {
    if (!value) return null;

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

export const DateBigNumber = ({ value, renderBigFn = v => <BigText content={number.round(v.y)} />, ...props }) => {
    if (!value) return null;

    return (
        <Hint {...props} value={value}>
            <TooltipContainer left>
                <Group>
                    <SmallTitle content={<SmallDate date={moment(value.x)} />} />
                    {renderBigFn(value)}
                </Group>
            </TooltipContainer>
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

export const TooltipContainer = ({ left = false, children }) => {
    return (
        <div className="chart-tooltip">
            <div className="card">
                <div className={classnames('card-body p-1', left ? 'text-left' : 'text-center')}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export const Group = ({ className, children }) => (
    <div className={classnames('w-100 mb-2', className)}>
        {children}
    </div>
);

export const SmallTitle = ({ uppercase = false, content }) => (
    <p className={classnames('text-secondary text-xs mb-1', uppercase && 'text-uppercase')}>
        {content}
    </p>
);

export const BigText = ({ content, extra }) => (
    <span className="big-number font-weight-bold d-inline-block align-middle text-dark text-lg">
        <span>{content} </span>
        {extra && <span className="text-secondary font-weight-normal text-m">({extra})</span>}
    </span>
);

export const SmallDate = ({ date }) => (
    <>
        <span className="text-uppercase">{date.format('ddd')}</span>, {date.format('Do')} <span className="text-uppercase">{date.format('MMM')}</span>
    </>
);
