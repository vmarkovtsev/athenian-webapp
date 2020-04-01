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
                    hint="Average of time elapsed between the creation of the 1st commit in the Pull Requests within the active filters, and the code being used in production"
                    negativeIsBetter
                />
            </div>
            <div className="col-md-3">
                <MainMetric
                    title="Cycle time" value={cycleTimeAvg} variation={cycleTimeVariation}
                    hint="The sum of each stage average time from start to finish"
                    negativeIsBetter
                />
            </div>
            <div className="col-md-3">
                <MainMetric
                    title="Pull requests" value={createdPRsAvg} variation={createdPRsVariation}
                    hint="Number of Pull Requests that hav been created within the active filters"
                />
            </div>
            <div className="col-md-3">
                <MainMetric title="Contributors" value={contribsAvg} variation={contribsVariation}
                    hint="Number of people participating in the PRs within the active filters"
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
