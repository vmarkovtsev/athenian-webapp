import {
  DefaultApi,
  ApiClient,
  PullRequestMetricsRequest,
  DeveloperMetricsRequest,
  GenericFilterRequest,
  FilterPullRequestsRequest,
  CalculatedPullRequestMetrics,
  ReleaseMatchRequest,
} from 'js/services/api/openapi-client';
import * as Sentry from '@sentry/browser';
import ForSet from 'js/services/api/openapi-client/model/ForSet';
import PullRequestMetricID from 'js/services/api/openapi-client/model/PullRequestMetricID';
import DeveloperMetricID from 'js/services/api/openapi-client/model/DeveloperMetricID';
import InvitationLink from 'js/services/api/openapi-client/model/InvitationLink';
import { dateTime } from 'js/services/format';
import processPR from 'js/services/prHelpers';

import _ from 'lodash';
import moment from 'moment';

class APIError extends Error {

    constructor(message) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, APIError);
        }

        this.name = 'APIError';
    }
}

export const reportToSentry = (error, context = {}) => Sentry.withScope(scope => {
    scope.setTags(context.tags);
    scope.setExtras(context.extra);
    Sentry.captureException(error);
    console.error('Reported to Sentry', error, context);
});

const withSentryCapture = (p, message, rethrow = false) => p.catch(e => {
    if (e instanceof Error) {
        reportToSentry(e);
    } else {
        const err = new APIError(`${message}: ${e.status} - ${e.statusText}`);
        const sentryCtx = {
            extra: {
                status: e.status,
                statusText: e.statusText,
                body: e.body,
                response: e.response,
                err: e.error
            }
        };

        reportToSentry(err, sentryCtx);
    }

    if (rethrow) {
      throw e;
    }
});

export const getPreviousInterval = (dateInterval) => {
    const diffDays = moment(dateInterval.to).diff(dateInterval.from, 'days');
    const prevTo = moment(dateInterval.from).subtract(1, 'days').endOf('day');
    const prevFrom = moment(prevTo).subtract(diffDays, 'days').startOf('day');
    return { from: prevFrom.unix() * 1000, to: prevTo.unix() * 1000 };
};

export const getUserWithAccountRepos = async token => {
  const api = buildApi(token);
  const user = await withSentryCapture(api.getUser(), "Cannot get user");

  const getAccountRepos = async (accountID, isAdmin) => {
    let reposets;
    try {
      reposets = await withSentryCapture(
        api.listReposets(Number(accountID)), "Cannot list reposets"
      );
    } catch (err) {
      console.error(`Could not list reposets from account #${accountID}. Err#${err.body.status} ${err.body.type}. ${err.body.detail}`);
      return { id: Number(accountID), isAdmin, reposets: [] };
    }

    const reposetsContent = await Promise.all(reposets.map(async reposet => ({
      id: reposet.id,
      repos: await withSentryCapture(api.getReposet(reposet.id), "Cannot get reposet"),
    })));

    return { id: Number(accountID), isAdmin, reposets: reposetsContent };
  };

  const defaultAccountID = getDefaultAccountID(user.accounts);
  if (!defaultAccountID) {
      return null;
  }

  const defaultAccount = await getAccountRepos(defaultAccountID, user.accounts[defaultAccountID]);
  const defaultReposet = (defaultAccount.reposets && defaultAccount.reposets[0]) || { repos: [] };

  return { ...user, defaultAccount, defaultReposet };
};

const getDefaultAccountID = (accounts) => {
    if (!accounts) {
        return null;
    }

    const accounts_ = _(accounts)
        .reduce((result, value, key) => {
            (result[value] || (result[value] = [])).push(key);
            return result;
        }, {});

    const adminAccounts = accounts_[true] || [];
    const nonAdminAccoubnst = accounts_[false] || [];

    return adminAccounts[0] || nonAdminAccoubnst[0];
};

export const acceptInvite = async (api, inviteLink) => {
    const body = new InvitationLink(inviteLink);

    let check;
    try {
        check = await withSentryCapture(
            api.checkInvitation(body), "Cannot check invitation"
        );
    } catch (err) {
        throw new Error(`Error reading the invitation ${err.error.message}`);
    }

    if (!check.valid || !check.active) {
        const cause = !check.valid ? 'valid' : 'active';
        throw new Error(`Invitation is not ${cause}`);
    }

    try {
        await withSentryCapture(api.acceptInvitation(body), "Cannot accept invitation");
    } catch (err) {
        throw new Error(`Could not accept the invitation. Err#${err.body.status} ${err.body.type}. ${err.body.detail}`);
    }

    return check;
};

export const getRepos = (token, userAccount, from, to, repos) => {
    const api = buildApi(token);
    const filter = new GenericFilterRequest(userAccount, from, to);
    filter.in = repos;
    filter.timezone = getOffset();

    return withSentryCapture(
        api.filterRepositories({ body: filter }),
        "Cannot fetch repos"
    ).then(repos => [...repos]);
};

export const getContributors = (token, userAccount, from, to, repos) => {
    const api = buildApi(token);
    return fetchContributors(
        api, userAccount,
        {from: new Date(from), to: new Date(to)},
        {repositories:repos}
    )
    .then(contribs => contribs.map(({ login, name, avatar }) => ({ login, name, avatar })));
};

export const getDevelopers = (token, userAccount) => {
  const api = buildApi(token)
  return api.getContributors(userAccount)
}

export const createTeam = ({ token, body }) => {
  const api = buildApi(token)
  return api.createTeam({ body })
}

export const removeTeam = (token, id) => {
  const api = buildApi(token)
  return api.deleteTeam(id)
}

export const updateTeam = (token, team) => {
  const { id, ...body } = team
  const api = buildApi(token)
  return api.updateTeam(id, { body })
}

export const getTeams = (token, accountID) => {
  const api = buildApi(token)
  return api.listTeams(accountID)
}

export const getInvitation = async (token, accountID) => {
  const api = buildApi(token);
  const invitation = await withSentryCapture(
    api.genInvitation(accountID),
    "Cannot get invitation link"
  );
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
    filter.repositories = filter.repositories || [];

    const filter_ = new GenericFilterRequest(
        accountID, dateTime.ymd(dateInterval.from), dateTime.ymd(dateInterval.to));
    filter_.in = filter.repositories;
    filter_.timezone = getOffset();

    return withSentryCapture(
        api.filterContributors({ body: filter_ }),
        "Cannot fetch contributors"
    );
};

export const fetchFilteredPRs = async (
    api, accountID,
    dateInterval,
    filter = { repositories: [], developers: [], properties: [] },
) => {
    filter.repositories = filter.repositories || [];
    filter.developers = _(filter.developers || []).map(v => v.login).value();
    filter.properties = filter.properties || [];

    const filter_ = new FilterPullRequestsRequest(
        accountID, dateTime.ymd(dateInterval.from), dateTime.ymd(dateInterval.to));

    if (filter.repositories.length > 0) {
        filter_.in = filter.repositories;
    }

    if (filter.properties.length > 0) {
        filter_.properties = filter.properties;
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

    const prs = await withSentryCapture(
        api.filterPrs({ filterPullRequestsRequest: filter_ }),
        "Cannot fetch filtered pull requests"
    );

    return {
        prs: prs.data.map(processPR),
        users: prs?.include?.users || {},
    };
};

export const fetchPRsMetrics = async (
  api, accountID,
  granularities,
  dateInterval,
  metrics = [],
  filter = { repositories: [], developers: [] },
  groupBy
) => {
  filter.repositories = filter.repositories || [];
  filter.developers = _(filter.developers || []).map(v => v.login).value();

  const metricIDs = new PullRequestMetricID();

  if (!filter.repositories?.length) {
    const emptyResponse = new CalculatedPullRequestMetrics(
      [],
      metrics.map(m => metricIDs[m]),
      dateTime.ymd(dateInterval.from),
      dateTime.ymd(dateInterval.to),
      granularities,
    );

    return emptyResponse;
  }

  const forSet = buildForSet(filter, groupBy);
  const body = new PullRequestMetricsRequest(
    forSet, metrics.map(m => metricIDs[m]),
    dateTime.ymd(dateInterval.from),
    dateTime.ymd(dateInterval.to),
    granularities,
    accountID
  );

  body.timezone = getOffset();
  return withSentryCapture(
    api.calcMetricsPrLinear(body),
    "Cannot fetch pull requests metrics"
  );
};

export const fetchDevsMetrics = async (
  api, accountID,
  dateInterval,
  metrics = [],
  filter = { repositories: [], developers: [] },
  groupBy
) => {
  filter.repositories = filter.repositories || [];
  filter.developers = _(filter.developers || []).map(v => v.login).value();

  const metricIDs = new DeveloperMetricID();
  const forSet = buildForSet(filter, groupBy);
  const body = new DeveloperMetricsRequest(
    forSet, metrics.map(m => metricIDs[m]),
    dateTime.ymd(dateInterval.from),
    dateTime.ymd(dateInterval.to),
    accountID
  );

  body.timezone = getOffset();
  return withSentryCapture(
    api.calcMetricsDeveloper(body),
    "Cannot fetch developers metrics"
  );
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

export const fetchReleaseSettings = async (api, accountID) => {
  const config = await withSentryCapture(
    api.listReleaseMatchSettings(accountID),
    "Cannot fetch release settings"
  );
  return [config];
};

export const saveRepoSettings = async (api, accountId, repos, strategy, branchPattern, tagPattern) => {
  const repoSettings = new ReleaseMatchRequest(accountId, repos, strategy);
  repoSettings.branches = branchPattern;
  repoSettings.tags = tagPattern;

  return withSentryCapture(
    api.setReleaseMatch({ body: repoSettings }),
    "Cannot set release match",
    true,
  );
};
