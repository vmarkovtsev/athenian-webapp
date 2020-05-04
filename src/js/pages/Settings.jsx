import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import _ from 'lodash';
import classnames from 'classnames';

import defaultImage from 'images/default-user-image.png';
import welcome from 'images/settings-welcome.svg';

import Page from 'js/pages/templates/Page';

import { useUserContext } from 'js/context/User';

export const getOrg = user => {
  const orgName = _(user.defaultReposet.repos)
    .map(r => r.split('/')[1])
    .uniq()
    .value();

  return {
    name: orgName,
    handler: orgName,
  };
};

export default ({ children }) => {
  const { user } = useUserContext();

  if (!user) return <Page />;

  return (
    <Page>
      <div className="row">
        <div className="col-2">
          <div className="card mb-5">
            <div className="card-header text-center bg-white">
              <img className="rounded-circle mt-2 mb-4" src={user.picture || defaultImage} alt="" width="100" />
              <h3 className="text-dark text-truncate h5">{user.name}</h3>
              <p className="text-secondary text-truncate font-weight-light">{user.email}</p>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <NavLink className="list-group-item py-2" to="/settings/profile">Profile</NavLink>
                <NavLink className="list-group-item py-2" to="/settings/teams">Teams</NavLink>
                <NavLink className="list-group-item py-2" to="/settings/releases">Releases</NavLink>
                <Link to="/logout" className="list-group-item bg-light text-right py-2 rounded-bottom">Logout</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-10">
          <Welcome />
          {children}
        </div>
      </div>
    </Page>
  );
};

const Welcome = () => {
  return (
    <div className="alert alert-default py-0 mb-4">
      <div className="d-flex align-items-center">
        <div className="p-4 w-50">
          <h4 className="alert-heading h2 mb-2">Welcome to your personal settings area</h4>
          <p className="font-weight-light">Here you can check your Athenian setup information and choose your
          organization preferences</p>
        </div>
        <div className="w-50 text-center mt-4">
          <img src={welcome} alt="" width="220" />
        </div>
      </div>
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export const SettingsGroup = ({ title, extra, children }) => {
  return (
    <div className="card mb-5">
      <div className="card-header p-4 bg-white font-weight-bold text-dark d-flex align-items-center">
        <span className="text-m">{title}</span>
        {extra && <div className="dropdown ml-auto">{extra}</div>}
      </div>
      <div className="card-body p-4">
        {children}
      </div>
    </div>
  );
};

export const Search = ({ placeholder }) => {
  return (
    <div className="input-search mb-5">
      <label>
        <i className="field-icon fas fa-search" aria-hidden="true"></i>
        <input type="search" className="form-control form-control-sm" placeholder={placeholder} aria-controls="dataTable" />
      </label>
    </div>
  );
};

export const Accordion = ({ id, items }) => (
  <div id={id} className="accordion w-dropdowns">
    {items.map((item, key) => <AccordionItem parentId={id} key={key} pos={key} shown={key === 0} item={item} />)}
  </div>
);

const AccordionItem = ({ parentId, pos, shown, item }) => {
  const itemId = `${parentId}-heading-${pos}`;
  return (
    <div className="card mb-4 rounded-0 border-bottom">
      <div className="card-header d-flex align-items-center p-0" id={itemId}>
        <h5 className="mb-0">
          <button
            className="btn text-dark d-flex align-items-center w-100 py-3 pl-3"
            data-toggle="collapse"
            data-target={`#collapse-${itemId}`}
            aria-expanded="true"
            aria-controls={`collapse-${itemId}`}
          >
            <i className="fas fa-angle-right accordion-icon mr-3" />
            <span>
              {item.title}
              {item.description && <span className="text-secondary font-weight-light d-inline-block ml-2">{item.description}</span>}
            </span>
          </button>
        </h5>
        {item.extra && <div className="ml-auto d-flex mr-4">{item.extra}</div>}
      </div>
      <div
        id={`collapse-${itemId}`}
        className={classnames('collapse', shown && 'show')}
        aria-labelledby={itemId}
        data-parent={`#${parentId}`}
      >
        <div className="card-body p-0">
          {item.content}
        </div>
      </div>
    </div>
  );
};
