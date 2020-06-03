import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useHistory} from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

import defaultImage from 'images/default-user-image.png';

import { useUserContext } from 'js/context/User';
import { SettingsGroup, getOrg } from 'js/pages/Settings';
import { useApi } from 'js/hooks';
import { becomeUser, testGodUser } from 'js/services/api';
import log from 'js/services/logger';

export default () => {
  const { user, godMode } = useUserContext();
  const org = getOrg(user);

  return (
    <>
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
              <input type="text" className="form-control" id="orgHandlerInput" placeholder={org.name} disabled={true} />
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
              <input type="text" className="form-control" id="orgNameInput" placeholder={org.handler} disabled={true} />
            </div>
          </div>
        </div>
      </SettingsGroup>

      <Admin userId={user.id} isGodMode={godMode} />
    </>
  );
};

const Admin = ({ userId, isGodMode }) => {
  const history = useHistory();
  const { api, ready: apiReady } = useApi(true, false);
  const [targetUserState, setTargetUserState] = useState(isGodMode ? userId : '');
  const [godUserState, setGodUserState] = useState(isGodMode);

  useEffect(() => {
    if (!apiReady || isGodMode) {
      return;
    }

    (async () => {
      setGodUserState(await testGodUser(api));
    })();
  }, [api, apiReady, isGodMode]);

  const impersonate = async () => {
    try {
      await becomeUser(api, targetUserState);
      history.go();
    } catch (e) {
      log.fatal(`Could not impersonate user`, e);
    }
  };

  const revert = async () => {
    try {
      await becomeUser(api, null);
      history.go();
    } catch (e) {
      log.fatal(`Could not restore user`, e);
    }
  };

  if (!godUserState || !apiReady) return null;

  return (
      <SettingsGroup title="Admin">
        <p className="text-secondary mb-3">Impersonate user</p>
        <div className="row">
          <div className="form-group col-6">
            <label>User id</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <FontAwesomeIcon icon={faUserSecret} />
              </div>
              <input
                type="text"
                className={classnames('form-control', !isGodMode && 'enabled')}
                id="targetUserIdInput"
                placeholder="github|0000000"
                value={targetUserState}
                onChange={e => setTargetUserState(e.target.value)}
                disabled={isGodMode}
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={isGodMode ? revert : impersonate}>
                  {isGodMode ? 'revert' : 'become'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </SettingsGroup>
    );
};
