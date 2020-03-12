import React, { useEffect } from 'react';
import $ from 'jquery';

export default ({ content }) => {
    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip && $('[data-toggle="tooltip"]').tooltip();
    }, [])

    return (
        <span data-toggle="tooltip" data-placement="bottom" title={content} className="ml-2">
            <i className="icon-info align-middle"></i>
        </span>
    );
};
