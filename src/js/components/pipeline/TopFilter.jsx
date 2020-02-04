import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { timeFormat } from 'd3-time-format';

import { getRepos, getContributors } from 'js/services/api';
import { getRepoName, getUserName } from 'js/services/github';
import AriaLabel from 'js/components/ui/AriaLabel';

export default () => {
    const [reposState, setReposState] = useState([]);
    const [reposReadyState, setReposReadyState] = useState(false);
    const [contributorsState, setContributorsState] = useState([]);
    const [contributorsReadyState, setContributorsReadyState] = useState(false);

    useEffect(() => {
        getRepos().then(repos => {
            setReposState(repos);
            setReposReadyState(true);
        });
    }, []);

    useEffect(() => {
        getContributors().then(contributors => {
            setContributorsState(contributors);
            setContributorsReadyState(true);
        });
    }, []);

    return (
        <div className="filters row mb-3">
            <div className="col-12">
                <div style={{ maxWidth: '300px' }}>
                </div>
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
                    <div className="form-row">

                        <div className="col text-xs">
                            <MultiSelect
                                id="reposFilter"
                                className="filter"
                                name="Repositories"
                                noDataMsg="There are no repositories for the time-frame filter"
                                options={reposState}
                                isReady={reposReadyState}
                                labelFormat={getRepoName}
                            />
                        </div>
                        <div className="col text-xs">
                            <MultiSelect
                                id="contribsFilter"
                                className="filter"
                                name="Contributors"
                                noDataMsg="There are no contributors for the time-frame and repositories filters"
                                options={contributorsState}
                                isReady={contributorsReadyState}
                                labelFormat={getUserName}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col input-group">
                            <TimeFrameFilter
                                id="timeFrameFilter"
                                name="Time frame"
                                className="datepicker form-control text-xs text-gray-900"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MultiSelect = ({ name, options, isReady, id, className, noDataMsg, labelFormat }) => {
    const [selectedState, setSelectedState] = useState(options);
    const howMany = selectedState.length === options.length ? 'all' : selectedState.length;
    useEffect(() => setSelectedState(options), [options]);
    return <>
        <AriaLabel id={`${id}Label`} label={`${name} filter`} />
        <Select
            isMulti
            isSearchable
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            controlShouldRenderValue={false}
            isLoading={!isReady}
            id={id}
            className={className}
            options={options}
            value={selectedState}
            onChange={setSelectedState}
            placeholder={`${name} (${howMany})`}
            aria-labelledby={`${id}Label`}
            noOptionsMessage={() => <em>{noDataMsg}</em>}
            loadingMessage={() => <em>loading...</em>}
            getOptionLabel={labelFormat}
            getOptionValue={value => value}
        />
    </>;
}

const formatDate = timeFormat("%Y-%m-%d");
const max = (a, b) => a > b ? a : b;
const min = (a, b) => a < b ? a : b;

const TimeFrameFilter = ({ id, name, className }) => {
    const today = Date.now();
    const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;

    const [fromState, setFromState] = useState(oneYearAgo);
    const [toState, setToState] = useState(today);

    const fromMin = oneYearAgo;
    const [fromMaxState, setFromMaxState] = useState(min(toState, today));
    const [toMinState, setToMinState] = useState(max(fromState, oneYearAgo));
    const toMax = today;

    useEffect(() => {
        setFromMaxState(min(toState, today));
        setToMinState(max(fromState, oneYearAgo));
    }, [fromState, toState]);

    return <>
        <AriaLabel id={`${id}FromLabel`} label={`${name} from filter`} />
        <input
            type="date"
            className={className}
            min={formatDate(fromMin)}
            max={formatDate(fromMaxState)}
            value={formatDate(fromState)}
            onChange={e => setFromState(Date.parse(e.target.value) || fromMin)}
            aria-labelledby={`${id}FromLabel`}
        />
        <AriaLabel id={`${id}ToLabel`} label={`${name} to filter`} />
        <input
            type="date"
            className={className}
            min={formatDate(toMinState)}
            max={formatDate(toMax)}
            value={formatDate(toState)}
            onChange={e => setToState(Date.parse(e.target.value) || toMax)}
            aria-labelledby={`${id}ToLabel`}
        />
    </>;
};
