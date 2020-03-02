import React from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faEquals } from '@fortawesome/free-solid-svg-icons';

export default ({ value, trend, className }) => {
  const commonClasses = ['badge', 'font-weight-normal', 'align-middle', 'd-inline-block'];
  let customClasses, icon;
  let suffix = '%';
  if (!trend) {
    customClasses = ['badge-pill', 'badge-secondary', 'py-1', 'px-2'];
  } else if (value < 0) {
    customClasses = ['badge-danger'];
    icon = faCaretDown;
  } else if (value > 0) {
    customClasses = ['badge-success'];
    icon = faCaretUp;
  } else {
    customClasses = ['badge-secondary'];
    icon = faEquals;
    suffix = '';
  }

  return (
    <span className={classnames('badge', className, ...commonClasses, ...customClasses)}>
      {trend ? (
        <>
          <FontAwesomeIcon icon={icon} className="align-bottom" />
          {value ? <span className="ml-1">{Math.abs(value)}{suffix}</span> : ''}
        </>
      ) : (
          <>{value}</>
        )
      }
    </span >
  );
};
