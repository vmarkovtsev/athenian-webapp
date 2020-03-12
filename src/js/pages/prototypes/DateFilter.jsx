import React from 'react';
import { LinkedCalendar } from 'rb-datepicker';

export default () => {
    const onDatesChange = ({ startDate, endDate }) => {
        console.log(({ startDate, endDate }));
    };

    return (
        <div style={{ height: '2000px' }}>
            <div className="row">
                <div className="col-12">
                    <LinkedCalendar onDatesChange={onDatesChange} showDropdowns={false} />
                </div>
            </div>
        </div>
    );
};
