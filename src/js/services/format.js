import { timeFormat } from 'd3-time-format';

const ymdFormat = timeFormat("%Y-%m-%d");

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

export const dateTime = {
    ymd: ymdFormat,
    secondsToHours: secondsString => {
        if (!secondsString) {
            return 0;
        };

        const seconds = parseFloat(secondsString);
        if (!seconds) {
            return 0;
        };

        return seconds / HOUR;
    },
};

export const github = {
    repoOrg: fullName => fullName.split('/')[1],
    repoName: fullName => fullName.split('/')[2],
    userName: fullName => fullName.split('/')[1],
};
