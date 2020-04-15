import React from 'react';
import noData from 'js/pages/prototypes/empty-states/no-data.svg';

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

      <div className="row">
          <div className="col-12 text-center my-5 py-5">
            <img className="mb-5" src={noData} alt="" width="300" />
            <h3 class="text-secondary font-weight-light mb-3">There is no data for the selected time period</h3>
            <p class="text-secondary font-weight-light">You can filter for different dates</p>
          </div>
      </div>
    </div >
  );
};
