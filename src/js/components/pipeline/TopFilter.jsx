import React from 'react';

export default function TopFilter({ reposFilter, contribsFilter, dateIntervalFilter }) {
  return (
    <div className="filters row mb-4">
      <div className="col-12">
        <div style={{ maxWidth: '300px' }}>
        </div>
        <div className="d-flex justify-content-between align-items-center pb-4 border-bottom">
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
  )
}
