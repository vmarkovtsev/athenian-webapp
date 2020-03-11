import React from 'react';

import Page from 'js/pages/templates/Page';
import {LinkedCalendar} from 'rb-datepicker';

export default class ExampleComponent extends React.Component {
        onDatesChange = ({ startDate, endDate }) => {
            console.log(({ startDate, endDate }));
        }
        render() {
            return (
                <Page>
                    <div>
                        <div className="row">
                            <div className="col-12">
                                <p className="text-centerleft font-weight-bold text-lg">Date Filter</p>
                                <LinkedCalendar onDatesChange={this.onDatesChange} showDropdowns={false} />
                            </div>
                        </div>
                    </div>
                </Page>
            );
        }
};
