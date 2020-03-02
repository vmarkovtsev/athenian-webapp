import { timeFormat } from 'd3-time-format';

const ymdFormat = timeFormat("%Y-%m-%d");

const MILLISECOND = 1;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

/**
 * Returns the human format for the passed number of seconds.
 * e.g. if passed 242 seconds it will return '4 mins'
 * @param {int} seconds
 * @return {string}
 */
const human = seconds => {
    if (isNaN(seconds)) {
        return '';
    }

    if (seconds < MINUTE) {
        return '<1 min';
    } else if (seconds <= 1.75 * MINUTE) {
        return '~1 min';
    } else if (seconds <= 1.75 * HOUR) {
        return Math.round(seconds / MINUTE) + ' mins';
    } else if (seconds <= 1.75 * DAY) {
        return Math.round(seconds / HOUR) + ' hours';
    } else if (seconds <= 12 * DAY) {
        return Math.round(seconds / DAY) + ' days';
    } else if (seconds <= 8 * WEEK) {
        return Math.round(seconds / WEEK) + ' weeks';
    } else if (seconds <= 24 * MONTH) {
        return Math.round(seconds / MONTH) + ' months';
    } else if (seconds <= 5 * YEAR) {
        return Math.round(seconds / YEAR) + ' years';
    }

    return '>5 years';
};

export const dateTime = {
    ymd: ymdFormat,
    milliseconds: secondsString => {
        if (!secondsString) {
            return 0;
        };

        const seconds = parseInt(secondsString);
        if (!seconds) {
            return 0;
        };

        return 1000 * seconds;
    },
    ago: date => human(Date.now() - date),
    interval: (dateFrom, dateTo) => human(dateTo - dateFrom),
    human,
};

export const github = {
    repoOrg: fullName => fullName.split('/')[1],
    repoName: fullName => fullName.split('/')[2],
    userName: fullName => fullName.split('/')[1],
    prLink: (repoUrl, number) => `https://${repoUrl}/pull/${number}`,
};

const KILO = 1000;
const MEGA = 1000 * KILO;

export const number = {
    si: n => {
        if (n < KILO) {
            return n;
        } else if (n < MEGA) {
            return (Math.round(n * 10 / KILO) / 10) + 'K';
        } else if (n < 500 * MEGA) {
            return (Math.round(n * 10 / MEGA) / 10) + 'M';
        }

        return '>500M';
    }
};
