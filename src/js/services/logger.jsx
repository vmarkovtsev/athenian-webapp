import React from 'react';
import { toast } from 'react-toastify';

export default {
    debug: (...msgs) => {
        console.log(...msgs);
    },
    info: (...msgs) => {
        toast.info(<Msgs msgs={msgs} />, {
            autoClose: 5000,
        });
    },
    ok: (...msgs) => {
        toast.success(<Msgs msgs={msgs} />, {
            autoClose: 1000,
        });
    },
    error: (...msgs) => {
        console.error(...msgs);
        toast.error(<Msgs msgs={msgs} />, {
            autoClose: 5000,
        });
    },
    fatal: (...msgs) => {
        // TODO(dpordomingo): this kind of errors are not caused by user input, so we should send them to sentry, for example.
        // We could also use the chat to send feedback in real time.
        console.error(...msgs);
        toast.error(<Msgs msgs={msgs} />, {
            autoClose: 5000,
        });
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
        return [item.body.detail || item.body.title];
    }

    if (item.error) {
        // e.g. when JSON response could not be parsed
        // e.g. Request has been terminated (connectivity loss; no HTTP response)
        let parts = errorParts(item.error)
            .map(s => s.includes('Request has been terminated') ? 'Connectivity loss' : s);
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
