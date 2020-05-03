import React from 'react';

import defaultImage from 'images/default-user-image.png';

import Page from 'js/pages/templates/Page';

import { useUserContext } from 'js/context/User';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default () => {
  const userContext = useUserContext();

  if (!userContext) return null;

  return (
    <Page>
      <div className="row">
        <div className="col-2">
          <div className="card mb-5">
            <div className="card-header text-center bg-white">
              <img className="rounded-circle mt-2 mb-4" src={userContext.picture || defaultImage} alt="" width="100" />
              <h3 className="text-dark h5">{userContext.name}</h3>
              <p className="text-secondary font-weight-light">{userContext.email}</p>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <a className="list-group-item py-2" href>Profile</a>
                <a className="list-group-item py-2 active" href>Teams</a>
                <a className="list-group-item py-2" href>Releases</a>
                <Link to="/logout" className="list-group-item bg-light text-right py-2 rounded-bottom">Logout</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-10">

          <div className="card mb-5">
            <div className="card-header d-flex align-items-center p-4 bg-white font-weight-bold text-dark p-4">
              <span className="text-m">Teams</span>
              <div className="dropdown ml-auto">
                <button type="button" className="btn btn-orange" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                  &#43; Add New Team
                </button>
                <form className="dropdown-menu dropdown-card dropdown-menu-right p-0">
                  <div className="p-3">
                    <h3 className="text-dark h6">New team</h3>
                    <div className="form-group mt-3">
                      <label htmlFor="groupName">Name:</label>
                      <input type="email" className="form-control" id="groupName" />
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="bg-white font-weight-light d-flex align-items-center justify-content-end p-3">
                    <a className="text-s text-secondary mr-3" href="">Cancel</a>
                    <a href="" className="btn btn-orange">Add</a>
                  </div>
                </form>
              </div>
            </div>
            <div className="card-body p-4">
              <p className="text-secondary mt-2 mb-3">Manage and add teams for your organization</p>
              <div className="input-search mb-5">
                <label>
                  <i className="field-icon fas fa-search" aria-hidden="true"></i>
                  <input type="search" className="form-control form-control-sm" placeholder="Find a team..." aria-controls="dataTable"/>
                </label>
              </div>
              <div id="accordion" className="accordion w-dropdowns">
                <div className="card mb-4 rounded-0 border-bottom">
                  <div className="card-header d-flex align-items-center p-0" id="headingOne">
                    <h5 className="mb-0">
                      <button className="btn text-dark d-flex align-items-center w-100 py-3 pl-3" data-toggle="collapse" data-target="#collapseOne"
                              aria-expanded="true" aria-controls="collapseOne">
                        <i className="fas fa-angle-right accordion-icon mr-3"></i>
                        <span>Mobile development <span className="text-secondary font-weight-light d-inline-block ml-2">4 members</span></span>
                      </button>
                    </h5>
                    <div className="ml-auto d-flex mr-4">
                      <div className="mr-3">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" className="pr-user-avatar"/>
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" className="pr-user-avatar"/>
                        <img src="https://randomuser.me/api/portraits/men/46.jpg" className="pr-user-avatar"/>
                        <img src="https://randomuser.me/api/portraits/women/79.jpg" className="pr-user-avatar"/>
                      </div>
                      <div className="dropdown">
                        <button type="button" className="btn btn-small btn-transparent" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                          <FontAwesomeIcon icon={faEllipsisH} />
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">Rename</a>
                          <a className="dropdown-item" href="#">Remove</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Dannie Kemmer</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Christine Balistreri</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/men/46.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Percy Marquardt</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/women/79.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Sonya Bogan</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="dropdown ml-4">
                            <button className="btn btn-orange" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              &#43; Add user
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              USERS
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card mb-4 rounded-0 border-bottom">
                  <div className="card-header d-flex align-items-center p-0" id="headingOne">
                    <h5 className="mb-0">
                      <button className="btn text-dark d-flex align-items-center w-100 py-3 pl-3" data-toggle="collapse" data-target="#collapseTwo"
                              aria-expanded="true" aria-controls="collapseTwo">
                        <i className="fas fa-angle-right accordion-icon mr-3"></i>
                        <span>Mobile development <span className="text-secondary font-weight-light d-inline-block ml-2">4 members</span></span>
                      </button>
                    </h5>
                    <div className="ml-auto d-flex mr-4">
                      <div className="mr-3">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" className="pr-user-avatar"/>
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" className="pr-user-avatar"/>
                        <img src="https://randomuser.me/api/portraits/men/46.jpg" className="pr-user-avatar"/>
                        <img src="https://randomuser.me/api/portraits/women/79.jpg" className="pr-user-avatar"/>
                      </div>
                      <div className="dropdown">
                        <button type="button" className="btn btn-small btn-transparent" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                          <FontAwesomeIcon icon={faEllipsisH} />
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">Rename</a>
                          <a className="dropdown-item" href="#">Remove</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Dannie Kemmer</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Christine Balistreri</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/men/46.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Percy Marquardt</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/women/79.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Sonya Bogan</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="dropdown ml-4">
                            <button className="btn btn-orange" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              &#43; Add user
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              USERS
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card mb-4 rounded-0 border-bottom">
                  <div className="card-header d-flex align-items-center p-0" id="headingOne">
                    <h5 className="mb-0">
                      <button className="btn text-dark d-flex align-items-center w-100 py-3 pl-3" data-toggle="collapse" data-target="#collapseThree"
                              aria-expanded="true" aria-controls="collapseThree">
                        <i className="fas fa-angle-right accordion-icon mr-3"></i>
                        <span>Mobile development <span className="text-secondary font-weight-light d-inline-block ml-2">4 members</span></span>
                      </button>
                    </h5>
                    <div className="ml-auto d-flex mr-4">
                      <div className="mr-3">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" className="pr-user-avatar"/>
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" className="pr-user-avatar"/>
                        <img src="https://randomuser.me/api/portraits/men/46.jpg" className="pr-user-avatar"/>
                        <img src="https://randomuser.me/api/portraits/women/79.jpg" className="pr-user-avatar"/>
                      </div>
                      <div className="dropdown">
                        <button type="button" className="btn btn-small btn-transparent" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                          <FontAwesomeIcon icon={faEllipsisH} />
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">Rename</a>
                          <a className="dropdown-item" href="#">Remove</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/men/32.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Dannie Kemmer</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/women/44.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Christine Balistreri</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/men/46.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Percy Marquardt</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="row">
                            <div className="col-6 d-flex">
                              <img src="https://randomuser.me/api/portraits/women/79.jpg" className="pr-user-avatar mr-2 ml-4"/>
                              <p className="text-dark text-truncate my-1">Sonya Bogan</p>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                              <span className="btn btn-transparent text-bright ml-auto"><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-white font-weight-normal">
                          <div className="dropdown ml-4">
                            <button className="btn btn-orange" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              &#43; Add user
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              USERS
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
