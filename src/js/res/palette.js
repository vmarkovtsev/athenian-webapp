const primary = '#FF732B';
const secondary = '#147EEC';
const third = '#4DC7EE';
const fourth = '#2FCC71';
const fifth = '#000080';
const alert = '#F37373';
const alertStrong = '#EF3837';

export const palette = {
    stages: {
        // The following stage colors must be in sync with the ones in "src/sass/_variables.scss"
        leadtime: third,
        wip: primary,
        review: '#FFC508',
        merge: '#9260E2',
        release: '#2FCC71',
        done: 'red', // TODO (dpordomingo): 'done' stage is defined in the API, but not in the Product designs
    },
    schemes: {
        primary: primary,
        trend: secondary,
        duoSimilar: [secondary, third],
        duoContrast: [primary, third],
        positiveNegative: {
            good: third,
            goodTrend: fourth,
            bad: alert,
            badTrend: alertStrong,
        },
    },
};
