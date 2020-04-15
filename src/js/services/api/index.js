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

    const query = async (interval) => fetchFilteredPRs(api, accountId, interval, {
        repositories: repos,
        developers: contributors,
        stages: ['wip', 'review', 'merge', 'release', 'done']
    });

    const currInterval = dateInterval;
    const prevInterval = getPreviousInterval(currInterval);

    const currResult = await query(currInterval);
    const prevResult = await query(prevInterval);

    return {
        prev: {
            prs: prevResult.data.map(processPR),
            users: (prevResult.include && prevResult.include.users) || {},

        },
        curr: {
            prs: currResult.data.map(processPR),
            users: (currResult.include && currResult.include.users) || {},
        }
    };
};

export const getPreviousInterval = (dateInterval) => {
    const diffDays = moment(dateInterval.to).diff(dateInterval.from, 'days');
    const prevTo = moment(dateInterval.from).subtract(1, 'days');
    const prevFrom = moment(prevTo).subtract(diffDays, 'days');
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
      return { id: Number(accountID), reposets: [] };
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
  return api.filterRepositories({ body: filter }).then(repos => [...repos])
};

export const getContributors = (token, userAccount, from, to, repos) => {
  const api = buildApi(token);
  const filter = new GenericFilterRequest(userAccount, from, to);
  filter.in = repos;
  return api.filterContributors({ body: filter })
    .then(contribs => contribs.map(c => c.login));
};

export const getMetrics = async (api, accountId, dateInterval, repos, contributors) => {
    const metrics = ['lead-time', 'cycle-time', 'wip-time', 'review-time', 'merging-time', 'release-time'];

    const query = async (interval) => fetchPRsMetrics(
        api, accountId, 'all', interval, metrics,
        { repositories: repos, developers: contributors}
    );

    const currInterval = dateInterval;
    const prevInterval = getPreviousInterval(currInterval);

    const currResult = await query(currInterval);
    const prevResult = await query(prevInterval);
    const result = {};

    _(metrics)
        .forEach((m, index) => {
            const prevAvg = dateTime.milliseconds(
                prevResult.calculated[0].values[0].values[index]) || 0;
            const currAvg = dateTime.milliseconds(
                currResult.calculated[0].values[0].values[index]) || 0;

            const variation = prevAvg > 0 ? (currAvg - prevAvg) * 100 / prevAvg : 0;

            result[m] = {
                data: [
                    {
                        x: prevResult.calculated[0].values[0].date,
                        y: prevAvg
                    },
                    {
                        x: currResult.calculated[0].values[0].date,
                        y: currAvg
                    }
                ],
                avg: currAvg,
                variation: variation
            };
        });

    return result;
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

export const fetchApi = (token, apiCall, ...args) => {
  const api = buildApi(token);
  return apiCall(api, ...args);
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

    return api.filterPrs({ filterPullRequestsRequest: filter_ });
};

export const fetchPRsMetrics = async (
  api, accountID,
  granularity,
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
    granularity, accountID
  );

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
