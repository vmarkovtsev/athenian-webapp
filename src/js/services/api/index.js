import {
  DefaultApi,
  ApiClient,
  MetricsRequest,
  FilterItemsRequest,
  FilterPullRequestsRequest
} from 'js/services/api/openapi-client';
import ForSet from 'js/services/api/openapi-client/model/ForSet';
import MetricID from 'js/services/api/openapi-client/model/MetricID';
import { dateTime, github } from 'js/services/format';

export const getPipelineDataInitial = () => getPipelineThumbs([]);

export const getPRs = async (token, accountId, dateInterval, repos, contributors) => {
  const api = buildApi(token);
  const filter = new FilterPullRequestsRequest(accountId, dateTime.ymd(dateInterval.from), dateTime.ymd(dateInterval.to));
  filter.in = repos;
  filter.stages = ['wip', 'review', 'merge', 'release'];
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
          acc.creators.push(participant.id);
        } else {
          acc.participants.push(participant.id);
        }

        return acc;
      }, { creators: [], participants: [] });
      return {
        ...pr,
        organization: github.repoOrg(pr.repository),
        repo: github.repoName(pr.repository),
        created: new Date(pr.created),
        updated: new Date(pr.updated),
        closed: new Date(pr.closed),
        creators: users.creators,
        participants: users.participants,
      }
    }),
    users: prs.include && prs.include.users || {},
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
  const defaultReposet = defaultAccount && defaultAccount.reposets && defaultAccount.reposets[0] || { repos: [] }

  return { ...user, accounts, defaultAccount, defaultReposet };
};

export const getRepos = (token, userAccount, from, to, repos) => {
  const api = buildApi(token);
  const filter = new FilterItemsRequest(userAccount, from, to);
  filter.in = repos;
  return api.filterRepositories({ body: filter }).then(repos => [...repos])
};

export const getContributors = (token, userAccount, from, to, repos) => {
  const api = buildApi(token);
  const filter = new FilterItemsRequest(userAccount, from, to);
  filter.in = repos;
  return api.filterContributors({ body: filter })
};

export const getPipelineDataAPI = (api, accountId, dateInterval, repos, contributors) => {
  const metrics = ['wip-time', 'review-time', 'merging-time', 'release-time'];

  return fetchApiMetricsLine(api, metrics, accountId, dateInterval, repos, contributors).then(apiData => {
    const thumbsData = [];

    if (apiData.calculated) {
      apiData.calculated[0].values.forEach(day => {
        day.values.forEach((value, metricNo) => {
          if (!thumbsData[metricNo]) {
            thumbsData[metricNo] = [];
          }

          thumbsData[metricNo].push({ x: new Date(day.date), y: dateTime.secondsToHours(value) });
        });
      });

    }

    return getPipelineThumbs(thumbsData);
  }).catch(error => {
    // TODO(dpordomingo): notify to an error handler which may rise a toast
    console.error('ERROR calling endpoint', error);
    throw error;
  });
};

const sampleCharts = [
  {
    title: 'Time to Commit in Base Branch',
    color: '#62C2DF',
    insights: [
      { title: { text: "insight 1", bold: true }, subtitle: { text: "subtitle 1" }, value: 15 },
      { title: { text: "insight 2", bold: false }, value: -20 }
    ]
  },
  {
    title: 'Time to Release',
    color: '#FA1D62',
    insights: [
      { title: { text: "insight 3" }, value: 5 }
    ]
  },
  {
    title: 'Merged Pull Request',
    color: '#FF7D3A',
    insights: []
  },
];

const pipeline = [
  {
    tab: { title: 'Work in progress', slug: 'work-in-progress', color: '#FF7D3A', text: '5 weeks', badge: 235, metric: 'pr-wip-time' },
    body: { charts: sampleCharts }
  },
  {
    tab: { title: 'Review', slug: 'review', color: '#FECD33', text: '10 months', badge: 5, metric: 'pr-review-time' },
    body: { charts: sampleCharts }
  },
  {
    tab: { title: 'Merge', slug: 'merge', color: '#9460DA', text: '5 weeks', badge: 33, metric: 'pr-merging-time' },
    body: { charts: sampleCharts }
  },
  {
    tab: { title: 'Release', slug: 'release', color: '#37CB70', text: '3 days', badge: 12, metric: 'pr-release-time' },
    body: { charts: sampleCharts }
  },
];

const fetchApiMetricsLine = (api, metrics, accountId, dateInterval = { from: null, to: null }, repos = [], contributors = []) => {
  const granularity = 'week';
  const metricsIDs = metrics.map(metric => (new MetricID())[metric]);

  const forset = new ForSet(repos);
  forset.developers = contributors;

  const body = new MetricsRequest(metrics.map(() => forset), metricsIDs, dateTime.ymd(dateInterval.from), dateTime.ymd(dateInterval.to), granularity, accountId);
  return api.calcMetricsLine(body);
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

const getPipelineThumbs = thumbData => pipeline.map((stage, i) => ({
  tab: { ...stage.tab, data: thumbData[i] }
}));

export const getPipelineMetrics = () => pipeline.map((stage, i) => ({
  tab: { ...stage.tab },
  body: {
    charts: stage.body.charts.map(c => ({ ...c, title: c.title + ' ' + i, data: getRandData() }))
  }
}));

const getRandData = () => [
  { x: 0, y: 10 * Math.random() },
  { x: 1, y: 10 * Math.random() },
  { x: 2, y: 10 * Math.random() },
  { x: 3, y: 10 * Math.random() },
  { x: 4, y: 10 * Math.random() },
  { x: 5, y: 10 * Math.random() },
  { x: 6, y: 10 * Math.random() },
  { x: 7, y: 10 * Math.random() },
  { x: 8, y: 10 * Math.random() },
  { x: 9, y: 10 * Math.random() }
];

const getRand = (min, max) => Math.round(min + (Math.random() * (max - min)));
const getRandElement = (...args) => args[getRand(0, args.length - 1)];
