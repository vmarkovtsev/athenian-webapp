import React, { useEffect, useState } from 'react';

import { getRepos, getContributors } from 'js/services/api';
import { github, } from 'js/services/format';

import TopFilter from 'js/components/pipeline/TopFilter';

import MultiSelect from 'js/components/ui/filters/MultiSelect';
import DateInterval from 'js/components/ui/filters/DateInterval';

export default ({ children }) => {
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
        <>
            <TopFilter
                reposFilter={
                    <MultiSelect
                        id="reposFilter"
                        className="filter"
                        name="Repositories"
                        noDataMsg="There are no repositories for the date interval filter"
                        options={reposState}
                        isReady={reposReadyState}
                        labelFormat={repo => (github.repoName(repo) || 'UNKNOWN')}
                    />
                }
                contribsFilter={
                    <MultiSelect
                        id="contribsFilter"
                        className="filter"
                        name="Contributors"
                        noDataMsg="There are no contributors for the date interval and repositories filters"
                        options={contributorsState}
                        isReady={contributorsReadyState}
                        labelFormat={repo => (github.userName(repo) || 'ANONYMOUS')}
                    />
                }
                dateIntervalFilter={
                    <DateInterval
                        id="dateIntervalFilter"
                        name="Date interval"
                        className="datepicker form-control text-xs text-gray-900"
                    />
                }
            />
            {children}
        </>
    );
};
