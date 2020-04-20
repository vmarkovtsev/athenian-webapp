import React from 'react';
import user from 'images/default-user-image.png';
import welcome from 'images/settings-welcome.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default () => {
  return (
    <>
      <div className="row">
        <div className="col-2">
          <div className="card mb-5">
            <div className="card-header text-center bg-white">
              <img className="rounded-circle mt-2 mb-4" src={user} alt="" width="100"/>
              <h3 className="text-dark h5">John Doe</h3>
              <p className="text-secondary font-weight-light">nick_evans@myemail.com</p>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <a className="list-group-item py-2 active" href="">
                  Account Settings
                </a>
                <a className="list-group-item py-2" href="">
                  Team Preferences
                </a>
                <a className="list-group-item bg-light text-right py-2 rounded-bottom" href="">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-10">

          <div className="alert alert-default py-0 mb-4">
            <div className="d-flex align-items-center">
              <div class="p-4 w-50">
                <h4 className="alert-heading h2 mb-2">Welcome to your personal settings area</h4>
                <p className="font-weight-light">Here you can check your Athenian setup information and choose your
                  organization preferences</p>
              </div>
              <div className="w-50 text-center mt-4">
                <img src={welcome} alt="" width="220"/>
              </div>
            </div>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="card mb-5">
            <div className="card-header p-4 bg-white font-weight-bold text-dark p-4">
              <span className="text-m">Account Settings</span>
            </div>
            <div className="card-body p-4">
              <p className="text-dark mt-2 mb-3">User Information</p>
              <div className="card bg-light mb-5">
                <div className="card-body d-flex align-items-center">
                  <img className="rounded-circle mr-3" src={user} alt="" width="80"/>
                  <div>
                    <h3 className="text-dark h5">John Doe <FontAwesomeIcon icon={faGithub} /></h3>
                    <p className="text-secondary font-weight-light mb-0">nick_evans@myemail.com</p>
                  </div>
                </div>
              </div>
              <p className="text-dark mt-2 mb-3">Organization Information</p>
              <div className="row mb-3">
                <div className="form-group col-6">
                  <label>GitHub Handle</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <FontAwesomeIcon icon={faGithub} />
                    </div>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="QuickRelease" disabled="true"/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <label>GitHub Organization Name</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <FontAwesomeIcon icon={faGithub} />
                    </div>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="naomi" disabled="true"/>
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
