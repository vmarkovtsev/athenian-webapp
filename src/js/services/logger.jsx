import React from 'react';
import { toast } from 'react-toastify';

export default {
    debug: (...msgs) => {
        console.log(...msgs);
    },
    info: (...msgs) => {
        toast.info(<Msgs msgs={msgs} />);
    },
    ok: (...msgs) => {
        toast.success(<Msgs msgs={msgs} />);
    },
    error: (...msgs) => {
        console.error(...msgs);
        toast.error(<Msgs msgs={msgs} />);
    },
    fatal: (...msgs) => {
        // TODO(dpordomingo): this kind of errors are not caused by user input, so we should send them to sentry, for example.
        // We could also use the chat to send feedback in real time.
        console.error(...msgs);
        toast.error(<Msgs msgs={msgs} />);
    },
};

const Msgs = ({ msgs }) => {
    const messages = msgs.reduce((acc, item) => { acc.push(...extractParts(item)); return acc; }, []);
    return messages.map((msg, key) => <div key={key}>{msg}</div>);
}

const extractParts = item => {
    if (!item) {
        return [];
    }

    if (['number', 'string'].includes(typeof item)) {
        return [item];
    }

    if (item.body?.title && item.body?.type) {
        // errors returned by the API, as proper HTTP response (see API errors schema)
        const parts = [];
        parts.push(item.body.detail);
        parts.push(`${item.body.title}. ${item.body.type}`);
        return parts.filter(v => !!v);
    }

    if (item.error) {
        // e.g. when JSON response could not be parsed (e.g. API returning NaN for old go-git '/filter/pull_requests')
        let parts = errorParts(item.error);
        return parts.length ? parts : ['Unhandled error'];
    }

    // errors or error-like
    return errorParts(item);
};

const errorParts = err => {
    let parts = [];
    const baseError = errMessage(err);
    const causeError = err.original && errMessage(err.original);

    if (baseError) {
        parts.push(baseError);
    }

    if (causeError) {
        parts.push(causeError);
    }

    return parts;
}

const errMessage = err => err instanceof Error ? err.toString() : err.message;