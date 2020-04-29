import {
  DefaultApi,
  ApiClient,
  PullRequestMetricsRequest,
  DeveloperMetricsRequest,
  GenericFilterRequest,
  FilterPullRequestsRequest
} from 'js/services/api/openapi-client';
import ForSet from 'js/services/api/openapi-client/model/ForSet';
import PullRequestMetricID from 'js/services/api/openapi-client/model/PullRequestMetricID';
import DeveloperMetricID from 'js/services/api/openapi-client/model/DeveloperMetricID';
import { dateTime } from 'js/services/format';
import processPR from 'js/services/prHelpers';

import _ from 'lodash';
import moment from 'moment';

export const getPRs = async (api, accountId, dateInterval, repos, contributors) => {
    const currResult = await fetchFilteredPRs(api, accountId, dateInterval, {
        repositories: repos,
        developers: contributors,
        stages: ['wip', 'review', 'merge', 'release', 'done']
    });

    return {
        prs: currResult.data.map(processPR),
        users: (currResult.include && currResult.include.users) || {},
    };
};

export const getPreviousInterval = (dateInterval) => {
    const diffDays = moment(dateInterval.to).diff(dateInterval.from, 'days');
    const prevTo = moment(dateInterval.from).subtract(1, 'days').endOf('day');
    const prevFrom = moment(prevTo).subtract(diffDays, 'days').startOf('day');
    return { from: prevFrom.unix() * 1000, to: prevTo.unix() * 1000 };
};

export const getUserWithAccountRepos = async token => {
  const api = buildApi(token);
  const user = await api.getUser();

  const getAccountRepos = async (accountID, isAdmin) => {
    let reposets;
    try {
      reposets = await api.listReposets(Number(accountID));
    } catch (err) {
      console.error(`Could not list reposets from account #${accountID}. Err#${err.body.status} ${err.body.type}. ${err.body.detail}`);
      return { id: Number(accountID), isAdmin, reposets: [] };
    }

    const reposetsContent = await Promise.all(reposets.map(async reposet => ({
      id: reposet.id,
      repos: await api.getReposet(reposet.id),
    })));

    return { id: Number(accountID), isAdmin, reposets: reposetsContent };
  };

  const accounts = await Promise.all(
    Object.keys(user.accounts).map(accountID => getAccountRepos(accountID, user.accounts[accountID]))
  );

  const defaultAccount = accounts[0] || { reposets: [] };
  const defaultReposet = (defaultAccount && defaultAccount.reposets && defaultAccount.reposets[0]) || { repos: [] }

  return { ...user, accounts, defaultAccount, defaultReposet };
};

export const getRepos = (token, userAccount, from, to, repos) => {
  const api = buildApi(token);
  const filter = new GenericFilterRequest(userAccount, from, to);
  filter.in = repos;
  filter.timezone = getOffset();
  return api.filterRepositories({ body: filter }).then(repos => [...repos])
};

export const getContributors = (token, userAccount, from, to, repos) => {
    const api = buildApi(token);
    return fetchContributors(
        api, userAccount,
        {from: new Date(from), to: new Date(to)},
        {repositories:repos}
    ).then(contribs => contribs.map(c => c.login));
};

export const getInvitation = async (token, accountID) => {
  const api = buildApi(token);
  const invitation = await api.genInvitation(accountID);
  return invitation.url;
};

export const buildApi = token => {
  const client = new ApiClient();
  client.authentications.bearerAuth.accessToken = token;
  client.basePath = window.ENV.api.basePath;
  client.timeout = 5 * 60 * 1000;

  return new DefaultApi(client);
};

export const fetchContributors = async (
    api, accountID,
    dateInterval,
    filter = {repositories :[]}
) => {
    const filter_ = new GenericFilterRequest(
        accountID, dateTime.ymd(dateInterval.from), dateTime.ymd(dateInterval.to));
    filter_.in = filter.repositories;
    filter_.timezone = getOffset();
    return api.filterContributors({ body: filter_ });
};

export const fetchFilteredPRs = async (
    api, accountID,
    dateInterval,
    filter = { repositories: [], developers: [], stages: [] },
) => {
    filter.repositories = filter.repositories || [];
    filter.developers = filter.developers || [];
    filter.stages = filter.stages || [];

    const filter_ = new FilterPullRequestsRequest(
        accountID, dateTime.ymd(dateInterval.from), dateTime.ymd(dateInterval.to));

    if (filter.repositories.length > 0) {
        filter_.in = filter.repositories;
    }

    if (filter.stages.length > 0) {
        filter_.stages = filter.stages;
    }

    if (filter.developers.length) {
        filter_.with = {
            author: filter.developers,
            reviewer: filter.developers,
            commit_author: filter.developers,
            commit_committer: filter.developers,
            commenter: filter.developers,
            merger: filter.developers,
        };
    }

    filter_.timezone = getOffset();
    return api.filterPrs({ filterPullRequestsRequest: filter_ });
};

export const fetchPRsMetrics = async (
  api, accountID,
  granularities,
  dateInterval,
  metrics = [],
  filter = { repositories: [], developers: [] },
  groupBy
) => {
  const metricIDs = new PullRequestMetricID();
  const forSet = buildForSet(filter, groupBy);
  const body = new PullRequestMetricsRequest(
    forSet, metrics.map(m => metricIDs[m]),
    dateTime.ymd(dateInterval.from),
    dateTime.ymd(dateInterval.to),
    granularities,
    accountID
  );

  body.timezone = getOffset();
  return api.calcMetricsPrLinear(body);
};

export const fetchDevsMetrics = async (
  api, accountID,
  dateInterval,
  metrics = [],
  filter = { repositories: [], developers: [] },
  groupBy
) => {
  const metricIDs = new DeveloperMetricID();
  const forSet = buildForSet(filter, groupBy);
  const body = new DeveloperMetricsRequest(
    forSet, metrics.map(m => metricIDs[m]),
    dateTime.ymd(dateInterval.from),
    dateTime.ymd(dateInterval.to),
    accountID
  );

  body.timezone = getOffset();
  return api.calcMetricsDeveloper(body);
};


const buildForSet = (filter, groupBy) => {
  const forSet = [];
  if (!groupBy) {
    forSet.push(ForSet.constructFromObject(filter));
  } else if (!['repositories', 'developers'].includes(groupBy)) {
    throw new Error('Invalid groupby');
  } else {
    for (const g of filter[groupBy]) {
      const f = _.clone(filter);
      f[groupBy] = [g];
      forSet.push(ForSet.constructFromObject(f));
    }
  }

  return forSet;
};

const getOffset = () => moment().utcOffset();
