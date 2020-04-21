import React, { useState } from 'react';

import { useAuth0 } from 'js/context/Auth0';
import { useUserContext } from 'js/context/User';
import { useDataContext } from 'js/context/Data';
import FiltersContext from 'js/context/Filters';

import TopFilter from 'js/components/pipeline/TopFilter';

import MultiSelect from 'js/components/ui/filters/MultiSelect';
import DateInterval, { EOD, YEAR_AGO, TWO_WEEKS_AGO } from 'js/components/ui/filters/DateInterval';

import { getRepos, getContributors } from 'js/services/api';
import { dateTime, github } from 'js/services/format';

import { useMountEffect } from 'js/hooks';

const allowedDateInterval = { from: YEAR_AGO, to: EOD };
const defaultDateInterval = { from: TWO_WEEKS_AGO, to: EOD };

export default ({ children }) => {
    const { getTokenSilently } = useAuth0();
    const userContext = useUserContext();
    const { reset: resetData, setGlobal: setGlobalData } = useDataContext();

    const [readyState, setReadyState] = useState(false);

    const [reposReadyState, setReposReadyState] = useState(false);
    const [allReposState, setAllReposState] = useState([]);
    const [filteredReposState, setFilteredReposState] = useState([]);

    const [contribsReadyState, setContribsReadyState] = useState(false);
    const [allContribsState, setAllContribsState] = useState([]);
    const [filteredContribsState, setFilteredContribsState] = useState([]);

    const [filteredDateIntervalState, setFilteredDateIntervalState] = useState(defaultDateInterval);

    const context = {
        account: userContext.defaultAccount.id,
        dateInterval: defaultDateInterval,
        repos: userContext.defaultReposet.repos
    };

    const reposSetters = {
        ready: setReposReadyState,
        all: setAllReposState,
        filtered: setFilteredReposState
    };

    const contribsSetters = {
        ready: setContribsReadyState,
        all: setAllContribsState,
        filtered: setFilteredContribsState
    };

    useMountEffect(() => {
        (async () => {
            const token = await getTokenSilently();
            const initialRepos = await updateReposFilter({...context, token, setters: reposSetters});
            setGlobalData('filter.repos', initialRepos);
            const initialContribs = await updateContribsFilter({...context, token, setters: contribsSetters});
            setGlobalData('filter.contribs', initialContribs);
            setReadyState(true);
        })();
    });

    const onDateIntervalChange = async (selectedDateInterval) => {
        setReadyState(false);
        resetData();
        console.info('DateInterval selection changed',
                     dateTime.ymd(selectedDateInterval.from), dateTime.ymd(selectedDateInterval.to));

        setFilteredDateIntervalState(selectedDateInterval);

        const token = await getTokenSilently();
        const updatedRepos = await updateReposFilter(
            {...context, token, dateInterval: selectedDateInterval,
             setters: reposSetters});
        await updateContribsFilter(
            {...context, token, repos: updatedRepos, dateInterval: selectedDateInterval,
             setters: contribsSetters});
        setReadyState(true);
    };

    const onReposChange = async (selectedRepos, dateInterval) => {
        setReadyState(false);
        resetData();
        console.info('Repositories selection changed', selectedRepos);
        selectedRepos = selectedRepos.length > 0 ? selectedRepos : context.repos;
        dateInterval = dateInterval || filteredDateIntervalState;

        setFilteredReposState(selectedRepos);
        setGlobalData('filter.repos', selectedRepos);

        const token = await getTokenSilently();
        await updateContribsFilter({...context, token, dateInterval, repos: selectedRepos,
                                    setters: contribsSetters});
        setReadyState(true);
    };

    const onContribsChange = async (selectedContribs) => {
        setReadyState(false);
        resetData();
        console.info('Contributors selection changed', selectedContribs);
        setFilteredContribsState(selectedContribs);
        console.log("XXXX");
        setGlobalData('filter.contribs', selectedContribs);
        console.log("YYY");
        setReadyState(true);
    };

    return (
        <FiltersContext
          ready={readyState}
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
                  minDate={allowedDateInterval.from}
                  maxDate={allowedDateInterval.to}
                  initialFrom={defaultDateInterval.from}
                  initialTo={defaultDateInterval.to}
                  onChange={onDateIntervalChange}
                />
            }
          />
          {children}
        </FiltersContext >
    );
};

const updateFilter = async ({token, account, dateInterval, repos, setters, getter}) => {
    setters.ready(false);

    const updatedValues = await getter(token, account, dateInterval, repos);

    setters.all(updatedValues);
    setters.filtered(updatedValues);
    setters.ready(true);

    return updatedValues;
};

const updateReposFilter = async ({token, account, dateInterval, repos, setters}) => {
    console.log('Updating repos filter', dateInterval, repos);
    const updatedRepos = await updateFilter(
        {token, account, dateInterval, repos, setters, getter: getReposForFilter});
    console.log('Updated repos filter', updatedRepos);
    return updatedRepos;
};

const updateContribsFilter = async ({token, account, dateInterval, repos, setters}) => {
    console.log('Updating contribs filter', dateInterval, repos);
    const updatedContribs = await updateFilter(
        {token, account, dateInterval, repos, setters, getter: getContribsForFilter});
    console.log('Updated contribs filter', updatedContribs);
    return updatedContribs;
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

const getReposForFilter = (token, accountID, dateInterval, inRepos) => getDataForFilter(
    'repositories', getRepos, token, accountID, dateInterval, inRepos);

const getContribsForFilter = (token, accountID, dateInterval, inRepos) => getDataForFilter(
    'contributors', getContributors, token, accountID, dateInterval, inRepos);
