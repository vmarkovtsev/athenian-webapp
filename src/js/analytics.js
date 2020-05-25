/* global process */
import _ from 'lodash';

import { isNotProd } from 'js/components/development';

const getAnalytics = (debug) => {
  const environment = window.ENV?.environment || process.env?.NODE_ENV || '';

  _(['page', 'identify', 'track', 'debug']).forEach(m => {
    if (window.ENV?.segment?.writeKey) {
      window.analytics.on(m, (event, properties, options) => {
        console.log(`analytics emitter: ${m}`, event, properties, options);
      });
    } else {
      window.analytics[m] = (...args) => {console.log(`dummy analytics: ${m} [${JSON.stringify(args)}]`);};
    }
  });

  const identify = (user) => {
    if (!user || window.ENV.segment.identifyCalled) {
      return;
    }

    window.ENV.segment.identifyCalled = true;
    window.analytics.identify(user.id, {
      name: user.name,
      email: user.email,
      picture: user.picture,
      updated: (new Date(parseInt(user.updated.getTime() / 1000))).toString(),
      isAdmin: user.defaultAccount.isAdmin,
      githubOrgs: _(user.defaultReposet.repos)
        .map(r => r.split('/')[1])
        .uniq()
        .value()
        .toString()
    });
  };

  const page = (name, properties) => window.analytics.page(name, {...properties, environment});
  const track = (event, properties) => window.analytics.track(event, {...properties, environment});

  if (debug) {
    window.analytics.debug(true);
  }

  return {
    identify,
    page,
    track,
  };
};

export const analytics = getAnalytics(isNotProd);
