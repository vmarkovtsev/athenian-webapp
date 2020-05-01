import React from 'react';

import defaultImage from 'images/default-user-image.png';

import Page from 'js/pages/templates/Page';

import { useUserContext } from 'js/context/User';
import { Link } from 'react-router-dom';

export default () => {
  const { user } = useUserContext();

  if (!user) return null;

  return (
    <Page>
      <div className="row">
        <div className="col-2">
          <div className="card mb-5">
            <div className="card-header text-center bg-white">
              <img className="rounded-circle mt-2 mb-4" src={user.picture || defaultImage} alt="" width="100" />
              <h3 className="text-dark h5">{user.name}</h3>
              <p className="text-secondary font-weight-light">{user.email}</p>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <a className="list-group-item py-2" href>Account Settings</a>
                <a className="list-group-item py-2 active" href>Team Preferences</a>
                <Link to="/logout" className="list-group-item bg-light text-right py-2 rounded-bottom">Logout</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-10">

          <div className="card mb-5">
            <div className="card-header p-4 bg-white font-weight-bold text-dark p-4">
              <span className="text-m">Releases</span>
            </div>
            <div className="card-body p-4">
              <p className="text-dark mt-2 mb-3">Select your release workflow</p>
              <div className="input-search mb-5">
                <label>
                  <i className="field-icon fas fa-search" aria-hidden="true"></i>
                  <input type="search" className="form-control form-control-sm" placeholder="Find a repository..." aria-controls="dataTable"/>
                </label>
              </div>
              <div id="accordion" className="accordion">
                <div className="card">
                  <div className="card-header p-0" id="headingOne">
                    <h5 className="mb-0">
                      <button className="btn text-dark d-flex align-items-center w-100 py-3 pl-3" data-toggle="collapse" data-target="#collapseOne"
                              aria-expanded="true" aria-controls="collapseOne">
                        <i className="fas fa-angle-right accordion-icon mr-3"></i>
                        <span>cloudfoundry</span>
                      </button>
                    </h5>
                  </div>
                  <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-4">
                              <p className="text-secondary text-truncate my-3 pl-5">cloudfoundry/<span className="text-dark">addition_network</span></p>
                            </div>
                            <div className="col-8 d-flex align-items-center">
                              <div className="dropdown mr-5">
                                <button className="btn btn-white dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                  Branch
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a className="dropdown-item" href>Branch</a>
                                  <a className="dropdown-item" href>Tag</a>
                                </div>
                              </div>
                              <div className="mr-5">
                                <div className="custom-control custom-radio">
                                  <input className="custom-control-input" type="radio" name="repoRadios1"
                                         id="repoRadios1-1" value="option2" checked/>
                                  <label className="custom-control-label" htmlFor="repoRadios1-1">
                                    Default (master)
                                  </label>
                                </div>
                              </div>
                              <div className="form-check d-flex align-items-center">
                                <div className="custom-control custom-radio">
                                  <input className="custom-control-input" type="radio" name="repoRadios1"
                                         id="repoRadios1-2" value="option3"/>
                                  <label className="custom-control-label" htmlFor="repoRadios1-2">
                                    <span>Pattern:</span>
                                  </label>
                                </div>
                                <input className="form-control d-inline-block w-200 ml-3" type="text"/>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-4">
                              <p className="text-secondary text-truncate my-3 pl-5">cloudfoundry/<span
                                  className="text-dark">addition_network</span></p>
                            </div>
                            <div className="col-8 d-flex align-items-center">
                              <div className="dropdown mr-5">
                                <button className="btn btn-white dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                  Branch
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a className="dropdown-item" href>Branch</a>
                                  <a className="dropdown-item" href>Tag</a>
                                </div>
                              </div>
                              <div className="mr-5">
                                <div className="custom-control custom-radio">
                                  <input className="custom-control-input" type="radio" name="repoRadios2"
                                         id="repoRadios2-1" value="option2" checked/>
                                  <label className="custom-control-label" htmlFor="repoRadios2-1">
                                    Default (master)
                                  </label>
                                </div>
                              </div>
                              <div className="form-check d-flex align-items-center">
                                <div className="custom-control custom-radio">
                                  <input className="custom-control-input" type="radio" name="repoRadios2"
                                         id="repoRadios2-2" value="option3"/>
                                  <label className="custom-control-label" htmlFor="repoRadios2-2">
                                    <span>Pattern:</span>
                                  </label>
                                </div>
                                <input className="form-control d-inline-block w-200 ml-3" type="text"/>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-4">
                              <p className="text-secondary text-truncate my-3 pl-5">cloudfoundry/<span
                                  className="text-dark">addition_network</span></p>
                            </div>
                            <div className="col-8 d-flex align-items-center">
                              <div className="dropdown mr-5">
                                <button className="btn btn-white dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                  Branch
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a className="dropdown-item" href>Branch</a>
                                  <a className="dropdown-item" href>Tag</a>
                                </div>
                              </div>

                              <div className="mr-5">
                                <div className="custom-control custom-radio">
                                  <input className="custom-control-input" type="radio" name="repoRadios3"
                                         id="repoRadios3-1" value="option2" checked/>
                                  <label className="custom-control-label" htmlFor="repoRadios3-1">
                                    Default (master)
                                  </label>
                                </div>
                              </div>
                              <div className="form-check d-flex align-items-center">
                                <div className="custom-control custom-radio">
                                  <input className="custom-control-input" type="radio" name="repoRadios3"
                                         id="repoRadios3-2" value="option3"/>
                                  <label className="custom-control-label" htmlFor="repoRadios3-2">
                                    <span>Pattern:</span>
                                  </label>
                                </div>
                                <input className="form-control d-inline-block w-200 ml-3" type="text"/>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header p-0" id="headingTwo">
                    <h5 className="mb-0">
                      <button className="btn text-dark d-flex align-items-center w-100 py-3 pl-3" data-toggle="collapse" data-target="#collapseTwo"
                              aria-expanded="false" aria-controls="collapseTwo">
                        <i className="fas fa-angle-right accordion-icon mr-3"></i>
                        <span>cloudfoundry</span>
                      </button>
                    </h5>
                  </div>
                  <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-4">
                              <p className="text-secondary text-truncate my-3 pl-5">cloudfoundry/<span
                                  className="text-dark">addition_network</span></p>
                            </div>
                            <div className="col-8 d-flex align-items-center">
                              <div className="dropdown mr-5">
                                <button className="btn btn-white dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                  Branch
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a className="dropdown-item" href>Branch</a>
                                  <a className="dropdown-item" href>Tag</a>
                                </div>
                              </div>
                              <div className="mr-5">
                                <div className="custom-control custom-radio">
                                  <input className="custom-control-input" type="radio" name="repoRadios4"
                                         id="repoRadios4-1" value="option2" checked/>
                                  <label className="custom-control-label" htmlFor="repoRadios4-1">
                                    Default (master)
                                  </label>
                                </div>
                              </div>
                              <div className="form-check d-flex align-items-center">
                                <div className="custom-control custom-radio">
                                  <input className="custom-control-input" type="radio" name="repoRadios4"
                                         id="repoRadios4-2" value="option3"/>
                                  <label className="custom-control-label" htmlFor="repoRadios4-2">
                                    <span>Pattern:</span>
                                  </label>
                                </div>
                                <input className="form-control d-inline-block w-200 ml-3" type="text"/>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header p-0" id="headingThree">
                    <h5 className="mb-0">
                      <button className="btn text-dark d-flex align-items-center w-100 py-3 pl-3" data-toggle="collapse" data-target="#collapseThree"
                              aria-expanded="false" aria-controls="collapseThree">
                        <i className="fas fa-angle-right accordion-icon mr-3"></i>
                        <span>cloudfoundry</span>
                      </button>
                    </h5>
                  </div>
                  <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-4">
                              <p className="text-secondary text-truncate my-3 pl-5">cloudfoundry/<span
                                  className="text-dark">addition_network</span></p>
                            </div>
                            <div className="col-8 d-flex align-items-center">
                              <div className="dropdown mr-5">
                                <button className="btn btn-white dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                  Branch
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                  <a className="dropdown-item" href>Branch</a>
                                  <a className="dropdown-item" href>Tag</a>
                                </div>
                              </div>
                              <div className="mr-5">
                                <div className="custom-control custom-radio">
                                  <input className="custom-control-input" type="radio" name="repoRadios5"
                                         id="repoRadios5-1" value="option2" checked/>
                                  <label className="custom-control-label" htmlFor="repoRadios5-1">
                                    Default (master)
                                  </label>
                                </div>
                              </div>
                              <div className="form-check d-flex align-items-center">
                                <div className="custom-control custom-radio">
                                  <input className="custom-control-input" type="radio" name="repoRadios5"
                                         id="repoRadios5-2" value="option3"/>
                                  <label className="custom-control-label" htmlFor="repoRadios5-2">
                                    <span>Pattern:</span>
                                  </label>
                                </div>
                                <input className="form-control d-inline-block w-200 ml-3" type="text"/>
                              </div>
                            </div>
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
    </Page>
  );
};
