import React, { useEffect, useState } from 'react';

import AriaLabel from 'js/components/ui/AriaLabel';

import { dateTime } from 'js/services/format';

const max = (a, b) => a > b ? a : b;
const min = (a, b) => a < b ? a : b;

export default ({ id, name, className, dateIntervalLimits = { from: null, to: null }, onChange = () => { } }) => {
    const fromMin = dateIntervalLimits.from || Date.now() - 365 * 24 * 60 * 60 * 1000;
    const toMax = dateIntervalLimits.to || Date.now();
    if (fromMin > toMax) {
        throw new Error(`${id} date interval limits are wrong. ` +
            `From:(${dateTime.ymd(fromMin)}) must be smaller than To:(${dateTime.ymd(toMax)})`);
    }

    const [fromMaxState, setFromMaxState] = useState(toMax);
    const [toMinState, setToMinState] = useState(fromMin);

    const [fromState, setFromState] = useState(fromMin);
    const [toState, setToState] = useState(toMax);

    useEffect(() => {
        setFromMaxState(min(toState, toMax));
        setToMinState(max(fromState, fromMin));
    }, [fromState, toState]);

    const onFromChange = event => {
        const newFromDateInterval = Date.parse(event.target.value) || fromMin;
        setFromState(newFromDateInterval);
        onChange({ from: newFromDateInterval, to: toState });
    };

    const onToChange = event => {
        const newToDateInterval = Date.parse(event.target.value) || toMax;
        setToState(newToDateInterval);
        onChange({ from: fromState, to: newToDateInterval });
    };

    return <>
        <AriaLabel id={`${id}FromLabel`} label={`${name} from filter`} />
        <input
            type="date"
            className={className}
            min={dateTime.ymd(fromMin)}
            max={dateTime.ymd(fromMaxState)}
            value={dateTime.ymd(fromState)}
            onChange={onFromChange}
            aria-labelledby={`${id}FromLabel`}
        />
        <AriaLabel id={`${id}ToLabel`} label={`${name} to filter`} />
        <input
            type="date"
            className={className}
            min={dateTime.ymd(toMinState)}
            max={dateTime.ymd(toMax)}
            value={dateTime.ymd(toState)}
            onChange={onToChange}
            aria-labelledby={`${id}ToLabel`}
        />
    </>;
};
