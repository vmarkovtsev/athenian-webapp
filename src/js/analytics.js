/* global process */
import _ from 'lodash';

import { isNotProd } from 'js/components/development';

const getAnalytics = (debug) => {
  const environment = window.ENV?.environment || process.env?.NODE_ENV || '';

  const wrapper = function(fn, fnName){
    var wrappedFunction = function(...args){
      console.log(`analytics: ${fnName} [${JSON.stringify(args)}]`);
      return fn(args);
    };
    return wrappedFunction;
  };

  const analytics = {};
  _(['page', 'identify', 'track', 'debug']).forEach(m => {
    if (window.ENV?.segment?.writeKey) {
      analytics[m] = wrapper(window.analytics[m], 'identify');
      window.analytics.on(m, (event, properties, options) => {
        console.log(`analytics emitter: ${m}`, event, properties, options);
      });
    } else {
      analytics[m] = (...args) => {console.log(`dummy analytics: ${m} [${JSON.stringify(args)}]`);};
    }
  });

  const identify = (user) => {
    if (!user) {
      return;
    }

    analytics.identify(user.id, {
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

  const page = (name, properties) => analytics.page(name, {...properties, environment});
  const track = (event, properties) => analytics.track(event, {...properties, environment});

  if (debug) {
    analytics.debug(true);
  }

  return {
    identify,
    page,
    track,
  };
};

export const analytics = getAnalytics(isNotProd);
