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

export const getPipelineDataAPI = () => {
  const metrics = ['pr-lead-time', 'pr-wip-time', 'pr-wait-first-review-time', 'pr-review-time', 'pr-merging-time', 'pr-release-time'];

  return api(metrics).then(apiData => {
    const thumbsData = [];

    apiData.calculated[0].values.forEach(day => {
      day.values.forEach((value, metricNo) => {
        if (!thumbsData[metricNo]) {
          thumbsData[metricNo] = [];
        }

        thumbsData[metricNo].push({ x: new Date(day.date), y: getHours(value) });
      });
    });

    return getPipelineData(thumbsData, getRandData);
  })
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
    tab: { title: 'PR created', color: '#FF7D3A', text: '2 days', badge: 10, metric: 'pr-lead-time' },
    body: { charts: sampleCharts }
  },
  {
    tab: { title: 'Work in progress', color: '#FA1D62', text: '5 weeks', badge: 235, metric: 'pr-wip-time' },
    body: { charts: sampleCharts }
  },
  {
    tab: { title: 'first review', color: '#FF7D3A', text: '10 months', badge: 5, metric: 'pr-wait-first-review-time' },
    body: { charts: sampleCharts }
  },
  {
    tab: { title: 'approval', color: '#9460DA', text: '4 days', badge: 15, metric: 'pr-review-time' },
    body: { charts: sampleCharts }
  },
  {
    tab: { title: 'PR merged', color: '#FF7D3A', text: '5 weeks', badge: 33, metric: 'pr-merging-time' },
    body: { charts: sampleCharts }
  },
  {
    tab: { title: 'release', color: '#62C2DF', text: '3 days', badge: 12, metric: 'pr-release-time' },
    body: { charts: sampleCharts }
  },
];

const api = metrics => {
  const repos = [
    'github.com/athenianco/athenian-webapp',
    'github.com/athenianco/athenian-api',
    'github.com/athenianco/metadata',
    'https://github.com/athenianco/metadata-retrieval'
  ];
  const granularity = 'week';

  const dateFrom = '2019-11-19';
  const dateTo = '2020-02-11';

  const query = {
    'for': [{
      'repositories': repos,
    }],
    'metrics': metrics,
    'date_from': dateFrom,
    'date_to': dateTo,
    'granularity': granularity,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(query)
  };

  let url = 'https://api.owl.athenian.co/v1/metrics_line';

  return fetch(url, options)
    .then(response => response.json());
};


const getPipelineData = (thumbData, randGenerator) => pipeline.map((stage, i) => {
  return {
    tab: { ...stage.tab, data: thumbData[i] },
    body: {
      charts: stage.body.charts.map(c => ({ ...c, title: c.title + ' ' + i, data: randGenerator() }))
    }
  }
});

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
