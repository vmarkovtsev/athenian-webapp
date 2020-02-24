import React from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faEquals } from '@fortawesome/free-solid-svg-icons';

export default ({ value, trend, className }) => {
  const commonClasses = ['badge', 'font-weight-normal', 'align-middle', 'd-inline-block'];
  let customClasses, icon;
  if (!trend) {
    customClasses = ['badge-pill', 'badge-secondary', 'py-1', 'px-2'];
  } else if (value < 0) {
    customClasses = ['badge-danger'];
    icon = faAngleDown;
  } else if (value > 0) {
    customClasses = ['badge-success'];
    icon = faAngleUp;
  } else {
    customClasses = ['badge-secondary'];
    icon = faEquals;
  }

  return (
    <span className={classnames('badge', className, ...commonClasses, ...customClasses)}>
      {trend ? (
        <>
          <FontAwesomeIcon icon={icon} className="align-bottom mr-1" />
          {value < 0 ? -value : value}%
        </>
      ) : (
          <>{value}</>
        )
      }
    </span >
  );
};
