import { timeFormat } from 'd3-time-format';

const ymd = timeFormat("%Y-%m-%d");
const monthDay = timeFormat("%b %d");
const monthDayYear = timeFormat("%b %d, %Y");

const MILLISECOND = 1;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

/**
 * Returns the human format for the passed number of milliseconds.
 * e.g. if passed the equivalent of 242 seconds it will return '4 mins'
 * @param {int} milliseconds
 * @return {string}
 */
const human = milliseconds => {
    if (isNaN(milliseconds)) {
        return '';
    }

    if (milliseconds < MINUTE) {
        return '<1 min';
    } else if (milliseconds <= 1.75 * MINUTE) {
        return '~1 min';
    } else if (milliseconds <= 1.75 * HOUR) {
        return Math.round(milliseconds / MINUTE) + ' mins';
    } else if (milliseconds <= 1.75 * DAY) {
        return Math.round(milliseconds / HOUR) + ' hours';
    } else if (milliseconds <= 12 * DAY) {
        return Math.round(milliseconds / DAY) + ' days';
    } else if (milliseconds <= 8 * WEEK) {
        return Math.round(milliseconds / WEEK) + ' weeks';
    } else if (milliseconds <= 22 * MONTH) {
        return Math.round(milliseconds / MONTH) + ' months';
    } else if (milliseconds <= 5 * YEAR) {
        return Math.round(milliseconds / YEAR) + ' years';
    }

    return '>5 years';
};

export const dateTime = {
    formater: timeFormat,
    ymd,
    monthDay,
    monthDayYear,

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

const round = (n, decimals = 0) => {
    return Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

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
    },
    round,
    percentage: (n, decimals = 0) => {
        return round(n, decimals) + '%';
    },
};
