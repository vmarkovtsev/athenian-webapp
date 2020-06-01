import React from 'react';
import ReactTooltip from 'react-tooltip';
import classnames from 'classnames';
import _ from 'lodash';

export const tooltip_conf = {
    html: true,
    placement: 'bottom',
    template: `<div class="tooltip athenian-tooltip-table" role="tooltip">
        <div class="arrow"></div>
        <div class="tooltip-inner athenian-tooltip"></div>
      </div>`,
};

export default ({ content }) => {
  return (
    <Tooltip content={content} className="ml-2 info-tooltip align-middle">
      <i className="icon-info"></i>
    </Tooltip>
  );
};

export const Tooltip = ({ content, className, style = {}, children }) => {
  const id = _.uniqueId("prefix-");
  return (
    <>
      <div
        data-tip
        data-for={id}
        className={classnames('d-inline-block', className)}
        style={_.assign({ pointerEvents: 'auto' }, style)}
      >
        {children}
      </div>

      <ReactTooltip
        id={id}
        className="athenian-tooltip"
        offset={{ top: '4px', left: '0' }}
        place="bottom"
        type="light"
        effect="solid"
        multiline
        html
      >
        {content}
      </ReactTooltip>
    </>
  );
};
