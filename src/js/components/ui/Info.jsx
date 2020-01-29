import React, { useEffect } from 'react';
import $ from 'jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export default ({ content }) => {
    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip && $('[data-toggle="tooltip"]').tooltip();
    }, [])

    return (
        <span data-toggle="tooltip" data-placement="bottom" title={content} className="ml-2">
            <FontAwesomeIcon icon={faInfoCircle} className="text-secondary" />
        </span>
    );
};
