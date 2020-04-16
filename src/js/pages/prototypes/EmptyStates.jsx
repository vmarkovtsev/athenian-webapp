import React from 'react';
import noData from 'js/pages/prototypes/empty-states/no-data.svg';
import comingSoon from 'js/pages/prototypes/empty-states/coming-soon.svg';

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

        <div className="row mt-5">
            <div className="col-12 mb-3">
                <h4 className="text-left text-dark font-weight-light mr-2 mb-2">Coming soon</h4>
            </div>
        </div>

        <div className="row">
            <div className="col-12 text-center my-5 py-5">
                <img className="mb-5" src={comingSoon} alt="" width="300"/>
                <h3 className="text-secondary font-weight-light mb-3">We are working on this page</h3>
                <p className="text-secondary font-weight-light mb-5">It will be available soon. Meanwhile, feel free to send us your feedback.</p>
                <a href="" className="btn btn-large btn-orange">Add feature requests</a>
            </div>
        </div>
    </div >
  );
};
