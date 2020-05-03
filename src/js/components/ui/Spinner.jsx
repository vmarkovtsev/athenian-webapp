import React from 'react';
import classnames from 'classnames';

import BeatLoader from "react-spinners/BeatLoader";

import { palette } from 'js/res/palette';
import { NoData } from 'js/components/layout/Empty';

const DEFAULT_SIZE = 10;
const DEFAULT_COLOR = palette.schemes.grey;

export const READY = 'ready';
export const LOADING = 'loading';
export const FAILED = 'failed';
export const EMPTY = 'empty';

const Spinner = ({loading, size = DEFAULT_SIZE, color = DEFAULT_COLOR}) => (
    <BeatLoader size={size} color={color} loading={loading} />
);

export default Spinner;

export const StatusIndicator = ({ status, color = DEFAULT_COLOR, margin = 5, textOnly = false }) => {
  let message;
  switch (status) {
      case LOADING:
          message = <Spinner loading={true} color={color} />;
          break;
      case FAILED:
          message = 'error loading data';
          break;
      case EMPTY:
          message = <NoData textOnly={textOnly} />;
          break;
      case READY:
      default:
          return null;
  };

  return (
    <div className={classnames(`my-${margin}`, 'mx-auto align-middle text-center')}>{message}</div>
  );
};
