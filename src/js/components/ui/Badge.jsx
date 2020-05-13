import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import { isNumber } from 'js/services/format';
import { reportToSentry } from 'js/services/api';

import development from 'js/components/development';

export const POSITIVE_IS_BETTER = 'positive-variation-is-better'; // default
export const NEGATIVE_IS_BETTER = 'negative-variation-is-better';

export default ({ value, trend = false, className }) => {
  const commonClasses = ['badge', 'font-weight-normal', 'align-middle', 'd-inline-block'];
  let customClasses, icon;
  let suffix = '%';

  if (typeof value === 'number' && !isFinite(value)) {
    const err = new Error(`Not a valid number in a Badge; got "${value}" instead`);
    reportToSentry(err);
    return  <span className={classnames(className, ...commonClasses, development.errorBoxClass)} />;
  }

  if (!isNumber(value) && (typeof value !== 'string' || value === '')) {
    return '';
  }

  if (!trend) {
    customClasses = ['badge-pill', 'badge-secondary', 'py-1', 'px-2'];
  } else if (value === 0 || !isNumber(value) ) {
    return '';
  } else if (value < 0) {
    customClasses = [trend === NEGATIVE_IS_BETTER ? 'badge-success' : 'badge-danger'];
    icon = faCaretDown;
  } else {
    customClasses = [trend === NEGATIVE_IS_BETTER ? 'badge-danger' : 'badge-success'];
    icon = faCaretUp;
  }

  return (
    <span className={classnames(className, ...commonClasses, ...customClasses)}>
      {trend ? (
        <>
          <FontAwesomeIcon icon={icon} className="align-bottom" />
          <span className="ml-1">{Math.abs(value)}{suffix}</span>
        </>
      ) : (
          <>{value}</>
        )
      }
    </span >
  );
};
