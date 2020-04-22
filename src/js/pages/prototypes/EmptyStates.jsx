import React from 'react';
import { NoData, ComingSoon } from 'js/components/layout/Empty';

export default () => {
  return (
    <div>
      <div className="row">
        <div className="col-12 mb-3">
          <p className="text-left font-weight-light text-dark text-lg">Empty States</p>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mb-3">
          <h4 className="text-left text-dark font-weight-light mr-2 mb-2">Not enough data</h4>
        </div>
      </div>

      <NoData />

      <div className="row mt-5">
        <div className="col-12 mb-3">
          <h4 className="text-left text-dark font-weight-light mr-2 mb-2">Coming soon</h4>
        </div>
      </div>

      <ComingSoon />
    </div >
  );
};
