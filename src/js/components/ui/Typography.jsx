import React from 'react';
import classnames from 'classnames';

export const nbsp = '\u00A0';

export const BigNumber = ({ content }) => (
    <span className="big-number text-lg font-weight-bold d-inline-block align-middle text-gray-900">{content || nbsp}</span>
);

export const SmallTitle = ({ content, isBlack }) => (
    <span className={classnames('small-title font-weight-bold text-xs text-uppercase', isBlack && 'text-gray-900')}>{content || nbsp}</span>
);
