import React from 'react';

export default ({ reposFilter, contribsFilter, dateIntervalFilter }) => {
    return (
        <div className="filters row mb-3">
            <div className="col-12">
                <div style={{ maxWidth: '300px' }}>
                </div>
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
                    <div className="form-row">
                        <div className="col text-xs">
                            {reposFilter}
                        </div>
                        <div className="col text-xs">
                            {contribsFilter}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col input-group">
                            {dateIntervalFilter}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
