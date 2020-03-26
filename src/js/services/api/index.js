import {
  DefaultApi,
  ApiClient,
  PullRequestMetricsRequest,
  FilterContribsOrReposRequest,
  FilterPullRequestsRequest
} from 'js/services/api/openapi-client';
import ForSet from 'js/services/api/openapi-client/model/ForSet';
import PullRequestMetricID from 'js/services/api/openapi-client/model/PullRequestMetricID';
import { dateTime, github } from 'js/services/format';

export const getPRs = async (token, accountId, dateInterval, repos, contributors) => {
  const api = buildApi(token);
  const filter = new FilterPullRequestsRequest(accountId, dateTime.ymd(dateInterval.from), dateTime.ymd(dateInterval.to));
  filter.in = repos;
  filter.stages = ['wip', 'review', 'merge', 'release', 'done'];
  if (contributors.length) {
    filter.with = {
      author: contributors,
      reviewer: contributors,
      commit_author: contributors,
      commit_committer: contributors,
      commenter: contributors,
      merger: contributors,
    };
  }

  const prs = await api.filterPrs({ filterPullRequestsRequest: filter });

  return {
    prs: prs.data.map(pr => {
      const users = pr.participants.reduce((acc, participant) => {
        if (participant.status.indexOf('author') >= 0) {
          acc.authors.push(participant.id);
          return acc;
        }

        if (participant.status.indexOf('merger') >= 0) {
          acc.mergers.push(participant.id);
        }

        if (participant.status.indexOf('reviewer') >= 0 || participant.status.indexOf('commenter') >= 0) {
          acc.commentersReviewers.push(participant.id);
        }

        return acc;
      }, { authors: [], commentersReviewers: [], mergers: [] });
      return {
        ...pr,
        organization: github.repoOrg(pr.repository),
        repo: github.repoName(pr.repository),
        created: new Date(pr.created),
        updated: new Date(pr.updated),
        closed: new Date(pr.closed),
        authors: users.authors,
        mergers: users.mergers,
        commentersReviewers: users.commentersReviewers
      }
    }),
    users: (prs.include && prs.include.users) || {},
  };
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
  const filter = new FilterContribsOrReposRequest(userAccount, from, to);
  filter.in = repos;
  return api.filterRepositories({ body: filter }).then(repos => [...repos])
};

export const getContributors = (token, userAccount, from, to, repos) => {
  const api = buildApi(token);
  const filter = new FilterContribsOrReposRequest(userAccount, from, to);
  filter.in = repos;
  return api.filterContributors({ body: filter })
        .then(contribs => contribs.map(c => c.login));
};

export const getMetrics = (api, accountId, dateInterval, repos, contributors) => {
  const metrics = ['lead-time', 'wip-time', 'review-time', 'merging-time', 'release-time'];
  const result = {};
  metrics.forEach(metric => {
    result[metric] = {
      data: [],
      avg: 0,
      variation: 0,
      aux: {
        prevInterval: { sum: 0, count: 0 },
        mainInterval: { sum: 0, count: 0 },
      }
    };
  });

  const doubleDateInterval = {
    from: dateInterval.from - (dateInterval.to - dateInterval.from),
    to: dateInterval.to
  };

  return fetchApiMetricsLine(api, metrics, accountId, doubleDateInterval, repos, contributors).then(apiData => {
    if (!apiData.calculated || !apiData.calculated[0]) {
      throw new Error('API returned no calculated data');
    }

    // This will unfold values, to have separate data per different metric, instead of all metrics under the same day.
    apiData.calculated[0].values.forEach(step => {
      const stepDate = new Date(step.date);

      if (stepDate >= dateInterval.from) {
        step.values.forEach((value, metricNo) => {
          result[metrics[metricNo]].data.push({ x: stepDate, y: dateTime.milliseconds(value) });
          result[metrics[metricNo]].aux.mainInterval.sum += dateTime.milliseconds(value);
          result[metrics[metricNo]].aux.mainInterval.count++;
        });
      } else {
        step.values.forEach((value, metricNo) => {
          result[metrics[metricNo]].aux.prevInterval.sum += dateTime.milliseconds(value);
          result[metrics[metricNo]].aux.prevInterval.count++;
        });
      }
    });

    Object.keys(result).forEach(metricName => {
      let [prevAvg, mainAvg, variation] = [0, 0, 'inf'];
      if (result[metricName].aux.mainInterval.count) {
        mainAvg = result[metricName].aux.mainInterval.sum / result[metricName].aux.mainInterval.count;
      }

      if (result[metricName].aux.prevInterval.count) {
        prevAvg = result[metricName].aux.prevInterval.sum / result[metricName].aux.prevInterval.count;
      }

      if (prevAvg) {
        variation = (mainAvg - prevAvg) * 100 / prevAvg;
      } else if (!mainAvg) {
        variation = 0;
      }

      result[metricName].avg = mainAvg; // TODO(dpordomingo): Average should consider stage-complete PRs, not the stage-pending ones. It should be obtained from the API
      result[metricName].variation = variation;
      delete (result[metricName].aux);
    });

    return result;
  }).catch(error => {
    // TODO(dpordomingo): notify to an error handler which may rise a toast
    console.error('ERROR calling endpoint', error);
    throw error;
  });
};

// DEPRECATED: use `fetchPRsMetrics` instead
const fetchApiMetricsLine = (api, metrics, accountId, dateInterval = { from: null, to: null }, repos = [], contributors = []) => {
    return fetchPRsMetrics(api, accountId, 'week', dateInterval, metrics, {
        repositories: repos,
        developers: contributors
    });
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

  return new DefaultApi(client);
};

export const fetchApi = (token, apiCall, ...args) => {
  const api = buildApi(token);
  return apiCall(api, ...args);
};

export const fetchPRsMetrics = async (
    api, accountID,
    granularity,
    dateInterval,
    metrics = [],
    filter = { repositories: [], developers: [] }
) => {
    const metricIDs = new PullRequestMetricID();
    const forset = ForSet.constructFromObject(filter);

    const body = new PullRequestMetricsRequest(
        [forset], metrics.map(m => metricIDs[m]),
        dateTime.ymd(dateInterval.from),
        dateTime.ymd(dateInterval.to),
        granularity, accountID
    );

    return api.calcMetricsPrLinear(body);
};
