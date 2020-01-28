import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export default ({ content }) => (
    <span data-toggle="tooltip" data-placement="bottom" title={content} className="ml-2">
        <FontAwesomeIcon icon={faInfoCircle} className="text-secondary" />
    </span>
);
