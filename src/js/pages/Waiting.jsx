import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Simple from './templates/Simple';

export default () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/');
    }, 30000);
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <Simple linkToHome={false}>
      We are loading your data from GitHub, this is going to take a while.
    </Simple>
  );
};
