import React from 'react';
import logo from 'images/logos/logo-transparent.svg';
import waiting from 'images/waiting.svg';

export default () => {
  return (
    <>
      <div className="row h-100">
        <div className="col-12 my-auto">
          <div className="mt-3 mb-5 text-center">
            <img src={logo} alt="" width="200" />
          </div>
          <div className="col-8 offset-2 mb-5">
            <div className="card waiting py-5">
              <div className="card-body py-5">
                <div className="row">
                  <div className="col">
                    <h2 className="h1 text-dark font-weight-normal mt-5 mb-2 pl-4">Welcome to Athenian</h2>
                    <p className="h4 text-secondary font-weight-light pl-4 mb-5">Please, wait while we are fetching your data…</p>

                    <div className="pl-4">
                      <ul className="m-0 p-0">
                        <li className="waiting-container mb-1">
                          <div className="waiting-chart">
                            <span className="waiting-box"></span>
                          </div>
                        </li>
                        <li className="waiting-container mb-1">
                          <div className="waiting-table">
                            <span className="waiting-box"></span>
                          </div>
                        </li>
                        <li className="waiting-container mb-1">
                          <div className="waiting-table">
                            <span className="waiting-box"></span>
                          </div>
                        </li>
                        <li className="waiting-container mb-1">
                          <div className="waiting-table">
                            <span className="waiting-box"></span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
