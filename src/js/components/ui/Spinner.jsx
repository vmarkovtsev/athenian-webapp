import React from 'react';

import BeatLoader from "react-spinners/BeatLoader";

const DEFAULT_SIZE = 10;
const DEFAULT_COLOR = "#FF6C37";

export default ({loading, size, color}) => (
    <BeatLoader
      size={size || DEFAULT_SIZE}
      color={color || DEFAULT_COLOR}
      loading={loading}
    />
);
