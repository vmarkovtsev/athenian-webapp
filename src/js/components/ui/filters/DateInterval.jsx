import React, { useEffect, useState } from 'react';

import AriaLabel from 'js/components/ui/AriaLabel';

import { dateTime } from 'js/services/format';

const max = (a, b) => a > b ? a : b;
const min = (a, b) => a < b ? a : b;

export default ({ id, name, className }) => {
    const today = Date.now();
    const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;

    const [fromState, setFromState] = useState(oneYearAgo);
    const [toState, setToState] = useState(today);

    const fromMin = oneYearAgo;
    const [fromMaxState, setFromMaxState] = useState(min(toState, today));
    const [toMinState, setToMinState] = useState(max(fromState, oneYearAgo));
    const toMax = today;

    useEffect(() => {
        setFromMaxState(min(toState, today));
        setToMinState(max(fromState, oneYearAgo));
    }, [fromState, toState]);

    return <>
        <AriaLabel id={`${id}FromLabel`} label={`${name} from filter`} />
        <input
            type="date"
            className={className}
            min={dateTime.ymd(fromMin)}
            max={dateTime.ymd(fromMaxState)}
            value={dateTime.ymd(fromState)}
            onChange={e => setFromState(Date.parse(e.target.value) || fromMin)}
            aria-labelledby={`${id}FromLabel`}
        />
        <AriaLabel id={`${id}ToLabel`} label={`${name} to filter`} />
        <input
            type="date"
            className={className}
            min={dateTime.ymd(toMinState)}
            max={dateTime.ymd(toMax)}
            value={dateTime.ymd(toState)}
            onChange={e => setToState(Date.parse(e.target.value) || toMax)}
            aria-labelledby={`${id}ToLabel`}
        />
    </>;
};
