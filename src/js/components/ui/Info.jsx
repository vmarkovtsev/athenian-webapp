import React, { useEffect } from 'react';
import $ from 'jquery';

export const tooltip_conf = {
    html: true,
    placement: 'bottom',
    template: `<div class="tooltip athenian-tooltip" role="tooltip">
        <div class="arrow"></div>
        <div class="tooltip-inner"></div>
      </div>`,
};

export default ({ content }) => {
    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip && $('[data-toggle="tooltip"]').tooltip(tooltip_conf);
    }, [])

    return (
        <span data-toggle="tooltip" title={content} className="ml-2 info-tooltip align-middle">
            <i className="icon-info"></i>
        </span>
    );
};
