import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import defaultImage from 'images/default-user-image.png';

import { useUserContext } from 'js/context/User';
import { SettingsGroup, getOrg } from 'js/pages/Settings';

export default () => {
  const { user } = useUserContext();
  const org = getOrg(user);

  return (
    <SettingsGroup title="Profile">
      <p className="text-secondary mt-2 mb-3">User Information</p>
      <div className="card bg-light mb-5">
        <div className="card-body d-flex align-items-center">
          <img className="rounded-circle mr-3" src={user.picture || defaultImage} alt="" width="80" />
          <div>
            <h3 className="text-dark text-truncate h5">{user.name} <FontAwesomeIcon icon={faGithub} /></h3>
            <p className="text-secondary text-truncate font-weight-light mb-0">{user.email}</p>
          </div>
        </div>
      </div>
      <p className="text-secondary mt-2 mb-3">Organization Information</p>
      <div className="row mb-3">
        <div className="form-group col-6">
          <label>GitHub Handle</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <FontAwesomeIcon icon={faGithub} />
            </div>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder={org.name} disabled={true} />
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
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder={org.handler} disabled={true} />
          </div>
        </div>
      </div>
    </SettingsGroup>
  );
};
