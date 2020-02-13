import { DefaultApi, ApiClient, MetricsRequest } from 'js/services/api/openapi-client';
import ForSet from 'js/services/api/openapi-client/model/ForSet';
import MetricID from 'js/services/api/openapi-client/model/MetricID';

export const getPipelineDataInitial = () => getPipelineData([], () => []);

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const getHours = secondsString => {
  if (!secondsString) {
    return 0;
  };

  const seconds = parseFloat(secondsString);
  if (!seconds) {
    return 0;
  };

  return seconds / HOUR;
};

export const getPRs = () => {
  const getRandItem = () => ({
    organization: getRandElement('athenian', 'bblfsh'),
    repo: getRandElement('webapp'),
    title: getRandElement('Make the table responsive again', 'Lorem Ipsum', '[RFC] Responsive design'),
    creator: getRandElement('dpordomingo'),
    size: getRand(1, 1000),
    lines: { add: getRand(20, 200), remove: getRand(1, 200) },
    comments: getRand(0, 5),
    participants: getRandElement(['marcos', 'lucas'], ['marcos', 'dpordomingo', 'vmarkotsev'], ['vmarkotsev']),
    age: getRandElement('1 hour', '5 days', '2 weeks', '1 month'),
    status: getRandElement('wip', 'merged', 'closed')
  });

  return Array.from(Array(57)).map(() => getRandItem());
}

export const getUserWithAccountRepos = async token => {
  const api = buildApi(token);
  const user = await api.getUser();

  const getAccountRepos = async (accountID, isAdmin) => {
    let reposets;
    try {
      reposets = await api.listReposets(Number(accountID));
    } catch (err) {
      console.error(`Could not list reposets from account #${accountID}. Err#${err.body.status} ${err.body.type}. ${err.body.detail}`);
      return { id: Number(accountID), isAdmin, repos: [] };
    }

    const reposetsContent = await Promise.all(reposets.map(async reposet => await api.getReposet(reposet.id)));

    return { id: Number(accountID), repos: reposetsContent };
  };

  const accountRepos = await Promise.all(
    Object.keys(user.accounts).map(accountID => getAccountRepos(accountID, user.accounts[accountID]))
  );

  return { ...user, accounts: accountRepos, defaultAccount: accountRepos[0] };
};

export const getRepos = () => {
  return new Promise(resolve => window.setTimeout(() => {
    resolve([
      'github.com/athenianco/athenian-webapp',
      'github.com/athenianco/athenian-api',
      'github.com/athenianco/metadata',
      'github.com/athenianco/metadata-retrieval',
      'github.com/bblfsh/metadata-retrieval',
    ]);
  }, 1000));
};

export const getContributors = () => {
  return new Promise(resolve => window.setTimeout(() => {
    resolve([
      'github.com/dennwc',
      'github.com/dpordomingo',
      'github.com/eiso',
      'github.com/lwsanty',
      'github.com/marnovo',
      'github.com/se7entyse7en',
      'github.com/vmarkovtsev',
      'github.com/warenlg',
    ]);
  }, 1500));
};

export const getPipelineDataAPI = (api) => {
  const metrics = ['wip-time', 'review-time', 'merging-time', 'release-time'];

  return fetchApiMetricsLine(api, metrics).then(apiData => {
    const thumbsData = [];

    if (apiData.calculated) {
      apiData.calculated[0].values.forEach(day => {
        day.values.forEach((value, metricNo) => {
          if (!thumbsData[metricNo]) {
            thumbsData[metricNo] = [];
          }

          thumbsData[metricNo].push({ x: new Date(day.date), y: getHours(value) });
        });
      });

    }

    return getPipelineData(thumbsData, getRandData);
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

const fetchApiMetricsLine = (api, metrics) => {
  const forset = [new ForSet([
    'github.com/athenianco/athenian-webapp',
    'github.com/athenianco/athenian-api',
    'github.com/athenianco/metadata',
    'github.com/athenianco/metadata-retrieval'
  ])];
  const granularity = 'week';
  const dateFrom = new Date('2019-11-19');
  const dateTo = new Date('2020-02-11');
  const metricsIDs = metrics.map(metric => (new MetricID())[metric]);
  const account = 1;

  const body = new MetricsRequest(forset, metricsIDs, dateFrom, dateTo, granularity, account);
  return api.calcMetricsLine(body);
};

export const buildApi = (token) => {
  const client = new ApiClient();
  client.authentications.bearerAuth.accessToken = token;
  client.basePath = window.ENV.api.basePath;

  return new DefaultApi(client);
};

export const fetchApi = (token, apiCall, ...args) => {
  const api = buildApi(token);
  return apiCall(api, ...args);
};

const getPipelineData = (thumbData, randGenerator) => pipeline.map((stage, i) => ({
  tab: { ...stage.tab, data: thumbData[i] },
  body: {
    charts: stage.body.charts.map(c => ({ ...c, title: c.title + ' ' + i, data: randGenerator() }))
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
