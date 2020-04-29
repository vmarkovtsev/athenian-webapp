/* global process */
import _ from 'lodash';

const getAnalytics = () => {
    const environment = window.ENV?.environment || process.env?.NODE_ENV || '';

    const analytics = {};
    if (window.ENV?.segment?.writeKey) {
        analytics.identify = window.analytics.identify;
        analytics.page = window.analytics.page;
        analytics.track = window.analytics.track;
    } else {
        analytics.identify = (...args) => {console.log(`dummy analytics: identify [${args}]`);};
        analytics.page = (...args) => {console.log(`dummy analytics: page [${args}]`);};
        analytics.track = (...args) => {console.log(`dummy analytics: track [${args}]`);};
    }

    const identify = (user) => {
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
