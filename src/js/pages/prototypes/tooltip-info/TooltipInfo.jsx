import React, { useEffect } from 'react';
import $ from 'jquery';

export default ({ title, content}) => {
    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip && $('[data-toggle="tooltip"]').tooltip({
            template: '<div class="tooltip tooltip-light" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
        });
    }, [])

    return (
        <span data-toggle="tooltip" data-html="true" data-placement="bottom" title={content} className="tooltip-demo text-centerleft font-weight-light text-m mt-2 mb-3">
            <span>{title}</span>
        </span>
    );
};
