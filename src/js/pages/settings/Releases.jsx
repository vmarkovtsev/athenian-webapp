import React, { useState } from 'react';
import Select from 'react-select';

import { SettingsGroup, Search, Accordion } from 'js/pages/Settings';

const BRANCH = 'branch';
const TAG = 'tag';

const repoGroupsConfigs = [
  {
    name: 'athenianco',
    repos: [
      {
        name: 'web',
        type: BRANCH,
        useDefault: true,
        defaultBranch: 'production',
      }, {
        name: 'api',
        type: TAG,
        useDefault: true,
        defaultBranch: 'development',
        pattern: 'v\\d+-stable',
      }, {
        name: 'metadata',
        type: TAG,
        useDefault: false,
        defaultBranch: 'master',
        pattern: 'v\\d+',
      }
    ],
  }, {
    name: 'linux',
    repos: [
      {
        name: 'kernel',
        type: BRANCH,
        useDefault: false,
        defaultBranch: 'master',
        pattern: 'v\\d+\\.\\d+',
      },
    ],
  },
];

export default () => {
  return (
    <SettingsGroup title="Releases">
      <p className="text-secondary mt-2 mb-3">Select your release workflow</p>
      <Search placeholder="Find a repository..." />
      <RepoGroups groups={repoGroupsConfigs} />
    </SettingsGroup>
  );
};

const RepoGroups = ({ groups }) => {
  return (
    <Accordion
      id="accordion"
      items={groups.map(repoGroup => ({
        title: repoGroup.name,
        content: <RepoGroup configs={repoGroup} />,
      }))}
    />
  );
}

const RepoGroup = ({ configs }) => {
  return (
    <ul className="list-group list-group-flush">
      {configs.repos.map((repoConfig, key) => <RepoConfig key={key} config={{ owner: configs.name, ...repoConfig }} />)}
    </ul>
  );
};

const getId = (config) => `${config.owner}-${config.name}`.replace(' ', '');

var typeOptions = [
  { value: BRANCH, label: 'Branch' },
  { value: TAG, label: 'Tag' }
];

const RepoConfig = ({ config }) => {
  const [typeState, setTypeState] = useState(config.type);
  const [useDefaultState, setUseDefaultState] = useState(config.useDefault);
  const [patternState, setPatternState] = useState(config.pattern || '');

  const id = getId(config);

  return (
    <li className="list-group-item bg-white font-weight-normal">
      <div className="row">
        <div className="col-4">
          <p className="text-secondary text-truncate my-3 pl-5">{config.owner}/<span className="text-dark">{config.name}</span></p>
        </div>
        <div className="col-8 d-flex align-items-center">
          <div className="dropdown mr-5">
            <Select
              id={`type-${id}-true`}
              className="release-dropdown"
              placeholder={(typeOptions.filter(type => type.value === typeState))?.[0]?.label}
              value={typeState}
              options={typeOptions}
              onChange={setTypeState}
            />
          </div>
          <div className="mr-5">
            <div className="custom-control custom-radio">
              <input
                className="custom-control-input"
                type="radio"
                name={`useDefault-${id}`}
                id={`useDefault-${id}-true`}
                value={true}
                checked={useDefaultState}
                onChange={() => setUseDefaultState(true)}
              />
              <label className="custom-control-label" htmlFor={`useDefault-${id}-true`}>
                {typeState === BRANCH ?
                  `Default (${config.defaultBranch})` :
                  'Any'
                }
              </label>
            </div>
          </div>
          <div className="form-check d-flex align-items-center">
            <div className="custom-control custom-radio">
              <input
                className="custom-control-input"
                type="radio"
                name={`useDefault-${id}`}
                id={`useDefault-${id}-false`}
                value={false}
                checked={!useDefaultState}
                onChange={() => setUseDefaultState(false)}
              />
              <label className="custom-control-label" htmlFor={`useDefault-${id}-false`}>
                <span>Pattern:</span>
              </label>
            </div>
            <input
              className="form-control d-inline-block w-200 ml-3"
              type="text"
              value={patternState}
              onChange={e => setPatternState(e.target.value)}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
