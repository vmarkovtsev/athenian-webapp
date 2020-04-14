import React from 'react';
import classnames from 'classnames';

export const nbsp = '\u00A0';

export const BigNumber = ({ content, isXL, className }) => (
    <span className={classnames('big-number font-weight-bold d-inline-block align-middle text-gray-900', isXL ? 'text-xl' : 'text-lg', className)}>{content || nbsp}</span>
);

export const SmallTitle = ({ content, isBlack, className }) => (
    <span className={classnames('small-title font-weight-bold text-xs text-uppercase align-middle', isBlack && 'text-gray-900', className)}>{content || nbsp}</span>
);
