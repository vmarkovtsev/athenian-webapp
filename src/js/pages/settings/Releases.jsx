import React, { useState, useEffect, useRef, useReducer } from 'react';
import Select from 'react-select';

import { SettingsGroup, Search, Accordion } from 'js/pages/Settings';

import { useApi } from 'js/hooks';
import { fetchReleaseSettings, saveRepoSettings } from 'js/services/api';
import { github } from 'js/services/format';
import log from 'js/services/logger';

const BRANCH = 'branch';
const TAG = 'tag';
const AUTOMATIC = 'tag_or_branch';

const typeOptions = [BRANCH, TAG, AUTOMATIC];

const defaultPatterns = {
  [BRANCH]: '{{default}}',
  [TAG]: '.*',
};

const placeholderPatterns = {
  [BRANCH]: 'branch_name',
  [TAG]: '.*',
};

const isFilteredIn = (conf, term) => !term ||
  github.repoName(conf.url).toLowerCase().includes(term.toLowerCase());

export default () => {
  const { api, ready: apiReady, context } = useApi(true, false);

  const [repoGroupsConfigsState, setRepoGroupsConfigsState] = useState([]);
  const [filterTermState, setFilterTermState] = useState('');
  const [accountIdState, setAccountIdState] = useState();

  const accountId = context.account;

  useEffect(() => {
    if (!apiReady) {
      return;
    };

    (async () => {
      const releaseSettings = await fetchReleaseSettings(api, accountId);
      setAccountIdState(accountId);

      const sortedSettings = releaseSettings.map(repoGroup => Object.keys(repoGroup)
        .sort((url1, url2) => github.repoName(url1) > github.repoName(url2) ? 1 : -1)
        .map(repoUrl => ({ url: repoUrl, ...repoGroup[repoUrl] }))
      );

      setRepoGroupsConfigsState(sortedSettings);
    })();
  }, [api, apiReady, accountId]);

  return (
    <SettingsGroup title="Releases">
      <p className="text-secondary mt-2 mb-3">Select your release workflow</p>
      <Search
        placeholder="Find a repository..."
        onFilter={setFilterTermState}
      />
      <RepoGroups
        accountId={accountIdState}
        groups={repoGroupsConfigsState}
        filterTerm={filterTermState}
      />
    </SettingsGroup>
  );
};

const RepoGroups = ({ accountId, groups, filterTerm }) => {
  return (
    <Accordion
      id="accordion"
      items={groups.map(repoGroup => ({
        title: github.repoOrg(repoGroup[0].url),
        description: `(${repoGroup.filter(config => isFilteredIn(config, filterTerm)).length} repositories)`,
        content: <RepoGroup
          accountId={accountId}
          configs={repoGroup}
          filterTerm={filterTerm}
        />,
      }))}
    />
  );
}

const RepoGroup = ({ accountId, configs, filterTerm }) => {
  return (
    <ul className="list-group list-group-flush">
      {configs.map((config, key) => <RepoConfig
        key={config.url}
        accountId={accountId}
        config={config}
        filterTerm={filterTerm}
      />)}
    </ul>
  );
};

const RepoConfig = ({ accountId, config, filterTerm }) => {
  const { api, ready: apiReady } = useApi(true, false);
  const [matchState, setMatchState] = useState(config.match);
  const [branchState, setBranchState] = useState(config.branches);
  const [tagState, setTagsState] = useState(config.tags);

  const changeMatchStrategy = async strategy => {
    try {
      if (!apiReady) {
        throw new Error('Could not obtain an API client');
      };
      await saveRepoSettings(api, accountId, [config.url], strategy, branchState, tagState);
      setMatchState(strategy);
      if (strategy === AUTOMATIC) {
        log.ok(`Releases from "${config.url}" will be guessed automatically from tags or default branch if there are no tags available`);
      } else {
        log.ok(`Releases from "${config.url}" will be read from "${strategy}"`);
      }
    } catch (e) {
      if (strategy === AUTOMATIC) {
        log.fatal(`Could not save the new settings to automatically read new releases of "${config.url}"`, e);
      } else {
        log.fatal(`Could not save the new settings to read new releases of "${config.url}" from "${strategy}"`, e);
      }
    }
  };

  const changePattern = async (strategy, pattern, onSuccess, onError) => {
    try {
      if (!apiReady) {
        throw new Error('Could not obtain an API client');
      };
      switch (strategy) {
        case BRANCH:
          await saveRepoSettings(api, accountId, [config.url], strategy, pattern, tagState);
          setBranchState(pattern);
          break;
        case TAG:
          await saveRepoSettings(api, accountId, [config.url], strategy, branchState, pattern);
          setTagsState(pattern);
          break;
        default:
          throw new Error('Automatic strategy does not support patterns');
      }
      onSuccess && onSuccess();
      if (strategy === AUTOMATIC) {
        log.ok(`Releases from "${config.url}" will be guessed automatically from tags or default branch if there are no tags available`);
      } else {
        log.ok(`Releases from "${config.url}" will be read from "${strategy}" using "${pattern}"`);
      }
    } catch (e) {
      onError && onError();
      if (strategy === AUTOMATIC) {
        log.fatal(`Could not configure automatic releases of "${config.url}"`, e);
      } else {
        log.fatal(`Could not save the new pattern to read new releases of "${config.url}" from "${strategy}"`, e);
      }
    }
  };

  return (
    <li
      className="list-group-item bg-white font-weight-normal"
      style={{ display: isFilteredIn(config, filterTerm) ? 'block' : 'none' }}
    >
      <div className="row">

        <div className="col-3">
          <p className="text-secondary text-truncate my-3 pl-5">
            {github.repoOrg(config.url)}/
            <span className="text-dark">{github.repoName(config.url)}</span>
          </p>
        </div>

        <div className="col-9 d-flex align-items-center">
          <div className="dropdown mr-5">
            <Select
              className="releases-dropdown simple-dropdown ucfirst"
              value={[matchState]}
              onChange={changeMatchStrategy}
              options={typeOptions}
              getOptionLabel={value => value === AUTOMATIC ? 'automatic' : value}
              getOptionValue={value => value}
              isMulti={false}
              isSearchable={false}
              hideSelectedOptions={false}
              controlShouldRenderValue={true}
            />
          </div>

          <Strategy
            id={`${github.repoOrg(config.url)}-${github.repoName(config.url)}`}
            name={matchState}
            pattern={matchState === BRANCH ? branchState : tagState}
            defaultText={getDefaultText(matchState, config.default_branch)}
            onChange={changePattern}
          />

        </div>
      </div>
    </li>
  );
};

const getDefaultText = (strategy, defaultBranch) => {
  switch (strategy) {
    case BRANCH:
      return `Default (${defaultBranch})`;
    case TAG:
      return 'Any';
    default:
      return 'Reading releases from tags, and repo default branch if there are no available tags.';
  }
}

const inputPatternReducer = (_, action) => {
  return action.pattern && action.pattern !== defaultPatterns[action?.name] ? action.pattern : '';
};

const USE_DEFAULT_PATTERN = 'default';
const USE_CUSTOM_PATTERN = 'custom';

const Strategy = ({ id, name, pattern, defaultText, onChange }) => {
  const [edittingState, setEdittingState] = useState(false);
  const [inputPatternState, dispatchInputPattern] = useReducer(inputPatternReducer, '');
  const inputPatternRef = useRef();

  const saveDefault = () => {
    if (pattern !== defaultPatterns[name]) {
      onChange(name, defaultPatterns[name], () => dispatchInputPattern({}));
    }
  };

  const savePattern = event => {
    const inputPattern = event.target.value;
    setEdittingState(false);
    if (inputPattern === '' || inputPattern === defaultPatterns[name]) {
      saveDefault();
    } else if (pattern !== inputPattern) {
      onChange(name, inputPattern, null, () => { dispatchInputPattern({ name, pattern }) });
    }
  };

  const changeUseDefaultPattern = event => {
    const useDefault = event.target.value === USE_DEFAULT_PATTERN;
    if (useDefault) {
      setEdittingState(false);
      saveDefault();
    } else {
      setEdittingState(true);
      inputPatternRef.current.focus();
    }
  };

  useEffect(() => {
    dispatchInputPattern({ name, pattern });
  }, [pattern, name]);

  if (name === AUTOMATIC) {
    return <div>{defaultText}</div>;
  }

  const radioFormName = `${id}-${name}`;
  const radioFormDefaultId = `${radioFormName}-default`;
  const radioFormCustomId = `${radioFormName}-custom`;

  return (
    <>
      <div className="mr-5">
        <div className="custom-control custom-radio">
          <input
            className="custom-control-input"
            type="radio"
            name={radioFormName}
            id={radioFormDefaultId}
            checked={!edittingState && pattern === defaultPatterns[name]}
            value={USE_DEFAULT_PATTERN}
            onChange={changeUseDefaultPattern}
          />
          <label className="custom-control-label" htmlFor={radioFormDefaultId}>{defaultText}</label>
        </div>
      </div>

      <div className="form-check d-flex align-items-center ml-auto">
        <div className="custom-control custom-radio">
          <input
            className="custom-control-input"
            type="radio"
            name={radioFormName}
            id={radioFormCustomId}
            checked={edittingState || pattern !== defaultPatterns[name]}
            value={USE_CUSTOM_PATTERN}
            onChange={changeUseDefaultPattern}
          />
          <label className="custom-control-label" htmlFor={radioFormCustomId}>
            <span>Pattern:</span>
          </label>
        </div>
        <input
          ref={inputPatternRef}
          className="form-control d-inline-block w-200 ml-3"
          type="text"
          value={inputPatternState}
          placeholder={placeholderPatterns[name]}
          onFocus={() => setEdittingState(true)}
          onBlur={savePattern}
          onChange={e => dispatchInputPattern({ name, pattern: e.target.value })}
        />
      </div>
    </>
  );
};
