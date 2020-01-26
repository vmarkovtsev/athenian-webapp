import React from 'react';

import Badge from 'js/components/ui/Badge';
import { BigNumber } from 'js/components/ui/Typography';

export default () => (
    <div className="row mb-3">
        <div className="col-md-4">
            <MainMetric title="Lead time" value="11 days" variation={-5} />
        </div>
        <div className="col-md-4">
            <MainMetric title="Pull requests in progress" value="46" variation={20} />
        </div>
        <div className="col-md-4">
            <MainMetric title="Contributors" value="9" variation={10} />
        </div>
    </div >
);

const MainMetric = ({ title, value, variation }) => (
    <div className="card">
        <div className="card-body">
            <div className="card-title mb-0">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="font-weight-bold text-uppercase text-xs">{title}</div>
                    <div className="d-flex align-items-center">
                        <BigNumber content={value} />
                        <Badge value={variation} trend className="ml-4" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
