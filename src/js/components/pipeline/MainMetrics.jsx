import React from 'react';

import Badge, { NEGATIVE_IS_BETTER, POSITIVE_IS_BETTER } from 'js/components/ui/Badge';
import { BigNumber } from 'js/components/ui/Typography';
import Info from 'js/components/ui/Info';

import { dateTime, number } from 'js/services/format';

export default ({
    leadTimeAvg, leadTimeVariation,
    cycleTimeAvg, cycleTimeVariation,
    createdPRsAvg, createdPRsVariation,
    contribsAvg, contribsVariation,
}) => {
    return (
        <div className="row mb-4">
            <div className="col-md-3">
                <MainMetric title="Lead time" value={leadTimeAvg && dateTime.human(leadTimeAvg)} variation={leadTimeVariation}
                    hint="Elapsed time between the creation of the 1st commit in a pull request and the code being used in production"
                    negativeIsBetter
                />
            </div>
            <div className="col-md-3">
                <MainMetric
                    title="Cycle time" value={cycleTimeAvg && dateTime.human(cycleTimeAvg)} variation={cycleTimeVariation}
                    hint="Sum of the average time required in each development stage"
                    negativeIsBetter
                />
            </div>
            <div className="col-md-3">
                <MainMetric
                    title="Pull requests" value={createdPRsAvg} variation={createdPRsVariation}
                    hint="Number of created pull requests"
                />
            </div>
            <div className="col-md-3">
                <MainMetric title="Contributors" value={contribsAvg} variation={contribsVariation}
                    hint="Number of people participating in pull requests"
                />
            </div>
        </div >
    );
};

const MainMetric = ({ title, hint, value, variation, negativeIsBetter = false }) => (
    <div className="card">
        <div className="card-body py-2 px-3">
            <div className="card-title mb-0">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="font-weight-bold text-uppercase text-xs">
                        <span className="align-middle">{title}</span>
                        {hint && <Info content={hint} />}
                    </div>
                    <div className="d-flex align-items-center">
                        <BigNumber content={value} />
                        {value ? <Badge
                            value={number.round(variation)}
                            trend={negativeIsBetter ? NEGATIVE_IS_BETTER : POSITIVE_IS_BETTER}
                            className="ml-4"
                        /> : ''}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
