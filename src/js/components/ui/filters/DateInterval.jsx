
import React, { useState, useEffect } from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';
import classnames from 'classnames';

const isInRange = (candidate, lower, upper) => lower.isBefore(candidate) && upper.isAfter(candidate);

/**
 * validateOrFixFn returns a function that calls resetFn if the passed dateInterval is empty,
 * or it will run fixFn over the field that could be missing in dateInterval; in both cases
 * it will also return false; otherwise it will return true.
 * @param {()=>{}} resetFn Function to be called in case the passed dateInterval is empty.
 * @param {(string)=>{}} fixFn Function to be called in case the passed dateInterval lacks of any field.
 * @returns {(<moment>)=>bolean}
 */
const validateOrFixFn = (resetFn, fixFn) => dateInterval => {
    if (!dateInterval.startDate && !dateInterval.endDate) {
        resetFn();
        return false;
    }

    if (!dateInterval.startDate) {
        fixFn(START_DATE);
        return false;
    } else if (!dateInterval.endDate) {
        fixFn(END_DATE);
        return false;
    }

    return true;
};

const isValidInterval = ({ startDate, endDate }) => startDate && endDate;

const isSameDateInterval = (momentA, momentB) => {
    return momentA.startDate.isSame(momentB.startDate) && momentA.endDate.isSame(momentB.endDate);
};

export const EOD = moment().valueOf();
export const YEAR_AGO = moment().subtract(1, 'year').valueOf();
export const TWO_WEEKS_AGO = moment().subtract(2, 'weeks').valueOf();

export default ({
    minDate = YEAR_AGO,
    maxDate = EOD,
    initialFrom = TWO_WEEKS_AGO,
    initialTo = EOD,
    onChange = dateInteval => console.log('APPLY', dateInteval)
}) => {
    minDate = moment(minDate);
    maxDate = moment(maxDate);
    initialFrom = moment(initialFrom);
    initialTo = moment(initialTo);

    const initialDateInterval = {
        startDate: initialFrom,
        endDate: initialTo,
    };

    const [dateIntervalState, setDateIntervalState] = useState(initialDateInterval);
    const [prevDateIntervalState, setPrevDateIntervalState] = useState(initialDateInterval);

    const [focusedInputState, setFocusedInputState] = useState(null);
    const [validState, setValidState] = useState(true);

    const validateOrFix = validateOrFixFn(() => setDateIntervalState(initialDateInterval), setFocusedInputState);

    // It will only call the passed onChange callback if the process of changing it is finished
    // (the calendar is not opened, and the date interval is valid) and if the date interval changed.
    useEffect(() => {
        if (focusedInputState) { // the calendar is opened (the changing process didn't finished)
            setValidState(isValidInterval(dateIntervalState));
            return;
        }

        if (!validateOrFix(dateIntervalState) || // the date interval lacks of any field (e.g. the calendar is closed after choosing start and end dates)
            isSameDateInterval(dateIntervalState, prevDateIntervalState) // when the date interval has not changed
        ) {
            return;
        };

        setPrevDateIntervalState(dateIntervalState);
        onChange({
            from: dateIntervalState.startDate.valueOf(),
            to: dateIntervalState.endDate.valueOf(),
        });
    }, [dateIntervalState, prevDateIntervalState, validateOrFix, focusedInputState, onChange]);

    const cancel = () => {
        setDateIntervalState(prevDateIntervalState);
        setFocusedInputState(null);
    };

    return (
        <div style={{ float: 'right' }}>
            <DateRangePicker
                startDate={dateIntervalState.startDate}
                endDate={dateIntervalState.endDate}
                minDate={minDate}
                maxDate={maxDate}
                //behavior
                minimumNights={0}
                keepOpenOnDateSelect={true}
                reopenPickerOnClearDates={false}
                showClearDates={true}
                renderCalendarInfo={() => (
                    <CustomInfoPanel
                        onCancel={cancel}
                        onAccept={() => setFocusedInputState(null)}
                        isAcceptable={validState}
                    />
                )}
                //Look and feel
                firstDayOfWeek={0}
                anchorDirection="right"
                displayFormat="MMM Do, YYYY"
                endDatePlaceholderText="End Date"
                startDatePlaceholderText="Start Date"
                showDefaultInputIcon={true}
                hideKeyboardShortcutsPanel={true}
                customArrowIcon="-"
                small={true}
                daySize={30}
                //Internals
                onDatesChange={setDateIntervalState}
                onFocusChange={setFocusedInputState}
                focusedInput={focusedInputState}
                startDateId="dateIntervalFrom"
                endDateId="dateIntervalTo"
                isOutsideRange={day => !isInRange(day, minDate, maxDate)}
            />
        </div>
    );
};

const CustomInfoPanel = ({ onCancel, onAccept, isAcceptable }) => (
    <div className="bg-white border-top px-4 py-3 text-right">
        <button onClick={onCancel} className="btn btn-link text-secondary px-3">Cancel</button>
        <button
            disabled={!isAcceptable}
            onClick={onAccept}
            className={classnames('btn btn-orange px-3', !isAcceptable && 'btn-disabled')}
        >
            Apply
        </button>
    </div>
);
