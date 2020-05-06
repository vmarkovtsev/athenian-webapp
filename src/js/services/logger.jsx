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
    return msgs.map((msg, key) => <div key={key}>{msg.toString()}</div>);
}
