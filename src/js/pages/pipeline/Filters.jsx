import React, { useState, useEffect } from 'react';

import { useAuth0 } from 'js/context/Auth0';
import { useUserContext } from 'js/context/User';
import FiltersContext from 'js/context/Filters';

import TopFilter from 'js/components/pipeline/TopFilter';

import MultiSelect from 'js/components/ui/filters/MultiSelect';
import DateInterval from 'js/components/ui/filters/DateInterval';

import { getRepos, getContributors } from 'js/services/api';
import { dateTime, github } from 'js/services/format';

const historyMaxDaysInterval = 365
const historyMaxDateInterval = historyMaxDaysInterval * 24 * 60 * 60 * 1000;

export default ({ children }) => {
    const { getTokenSilently } = useAuth0();
    const userContext = useUserContext();

    const [allReposState, setAllReposState] = useState([]);
    const [reposReadyState, setReposReadyState] = useState(false);
    const [filteredReposState, setFilteredReposState] = useState([]);

    const [allContribsState, setAllContribsState] = useState([]);
    const [contribsReadyState, setContribsReadyState] = useState(false);
    const [filteredContribsState, setFilteredContribsState] = useState([]);

    const allowedDateInterval = { from: Date.now() - historyMaxDateInterval, to: Date.now() };
    const [filteredDateIntervalState, setFilteredDateIntervalState] = useState(allowedDateInterval);

    useEffect(() => {
        if (!userContext) {
            return;
        }

        let token;
        (async () => {
            token = await getTokenSilently();

            setReposReadyState(false);
            getReposForFilter(
                token,
                userContext.defaultAccount.id,
                allowedDateInterval,
                userContext.defaultReposet.repos
            ).then(
                repos => {
                    setAllReposState(repos);
                    setFilteredReposState(repos);
                    setReposReadyState(true);
                });

            setContribsReadyState(false);
            getContribsForFilter(
                token,
                userContext.defaultAccount.id,
                allowedDateInterval,
                userContext.defaultReposet.repos
            ).then(
                contribs => {
                    setAllContribsState(contribs);
                    setContribsReadyState(true);
                });
        })()

    }, [userContext, getTokenSilently]);

    const onDateIntervalChange = async dateInterval => {
        console.info('DateInterval changed', dateTime.ymd(dateInterval.from), dateTime.ymd(dateInterval.from));
        setReposReadyState(false);
        setContribsReadyState(false);

        getTokenSilently()
            .then(token => getReposForFilter(
                token,
                userContext.defaultAccount.id,
                dateInterval,
                userContext.defaultReposet.repos
            )).then(repos => {
                setAllReposState(repos);
                setFilteredReposState(repos.length === 0 ? userContext.defaultAccount.repos : repos);
                return onReposChange(repos, dateInterval);
            }).finally(() => {
                setReposReadyState(true);
                setContribsReadyState(true);
                setFilteredDateIntervalState(dateInterval);
            });
    };

    const onReposChange = (filteredRepos, dateInterval) => {
        console.info('Repositories changed', filteredRepos);
        filteredRepos = filteredRepos.length ? filteredRepos : userContext.defaultReposet.repos;
        dateInterval = dateInterval || filteredDateIntervalState;
        setContribsReadyState(false);
        getTokenSilently()
            .then(token => getContribsForFilter(
                token,
                userContext.defaultAccount.id,
                dateInterval,
                filteredRepos
            )).then(contribs => {
                setAllContribsState(contribs);
                onContribsChange(contribs);
            }).finally(() => {
                setContribsReadyState(true);
                setFilteredReposState(filteredRepos);
            });
    };

    const onContribsChange = filteredContribs => {
        console.info('Contributors changed', filteredContribs);
        setFilteredContribsState(filteredContribs);
    };

    return (
        <FiltersContext
            repositories={filteredReposState}
            contributors={filteredContribsState}
            dateInterval={filteredDateIntervalState}
        >
            <TopFilter
                reposFilter={
                    <MultiSelect
                        id="reposFilter"
                        className="filter"
                        name="Repositories"
                        noDataMsg="There are no repositories for the date interval filter"
                        options={allReposState}
                        isReady={reposReadyState}
                        labelFormat={repo => (github.repoName(repo) || 'UNKNOWN')}
                        onChange={onReposChange}
                    />
                }
                contribsFilter={
                    <MultiSelect
                        id="contribsFilter"
                        className="filter"
                        name="Contributors"
                        noDataMsg="There are no contributors for the date interval and repositories filters"
                        options={allContribsState}
                        isReady={contribsReadyState}
                        labelFormat={repo => (github.userName(repo) || 'ANONYMOUS')}
                        onChange={onContribsChange}
                    />
                }
                dateIntervalFilter={
                    <DateInterval
                        id="dateInterval"
                        name="Date interval"
                        className="datepicker form-control text-xs text-gray-900"
                        dateIntervalLimits={allowedDateInterval}
                        onChange={onDateIntervalChange}
                    />
                }
            />
            {children}
        </FiltersContext >
    );
};

const getDataForFilter = async (dataName, dataFetcherFn, token, accountID, dateInterval, inRepos = []) => {
    try {
        return await dataFetcherFn(
            token,
            accountID,
            dateTime.ymd(dateInterval.from),
            dateTime.ymd(dateInterval.to),
            inRepos,
        );
    } catch (err) {
        console.error(`could not fetch ${dataName} to filter`, err);
        return [];
    }
};

const getReposForFilter = (token, accountID, dateInterval, inRepos) => {
    return getDataForFilter('repositories', getRepos, token, accountID, dateInterval, inRepos);
};

const getContribsForFilter = (token, accountID, dateInterval, inRepos) => {
    return getDataForFilter('contributors', getContributors, token, accountID, dateInterval, inRepos);
};