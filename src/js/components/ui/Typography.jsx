import React from 'react';
import classnames from 'classnames';

export const BigNumber = ({ content }) => (
    <span className="text-lg font-weight-bold d-inline-block align-middle text-gray-900">{content}</span>
);

export const SmallTitle = ({ content, isBlack }) => (
    <span className={classnames('font-weight-bold text-xs text-uppercase', isBlack && 'text-gray-900')}>{content}</span>
);
