/* global process */
import _ from 'lodash';

const getAnalytics = () => {
  const environment = window.ENV?.environment || process.env?.NODE_ENV || '';

  const wrapper = function(fn, fnName){
    var wrappedFunction = function(...args){
      console.log(`analytics: ${fnName} [${JSON.stringify(args)}]`);
      return fn(args);
    };
    return wrappedFunction;
  };

  const analytics = {};
  if (window.ENV?.segment?.writeKey) {
    analytics.identify = wrapper(window.analytics.identify, 'identify');
    analytics.page = wrapper(window.analytics.page, 'page');
    analytics.track = wrapper(window.analytics.track, 'track');
  } else {
    analytics.identify = (...args) => {console.log(`dummy analytics: identify [${JSON.stringify(args)}]`);};
    analytics.page = (...args) => {console.log(`dummy analytics: page [${JSON.stringify(args)}]`);};
    analytics.track = (...args) => {console.log(`dummy analytics: track [${JSON.stringify(args)}]`);};
  }

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

  return {
    identify,
    page,
    track,
  };
};

export const analytics = getAnalytics();
