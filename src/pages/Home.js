import React, { useState, useEffect } from 'react';

import Pipeline from '../components/pipeline/Pipeline';
import Page from '../components/layout/Page';

import { getPipelineDataInitial, getPipelineDataAPI, getUser } from '../services/api';

export default () => {
  const [pipelineState, setPipelineData] = useState(getPipelineDataInitial());

  useEffect(() => {
    getPipelineDataAPI().then(data => {
      setPipelineData(data);
    });
  }, []);

  return (
    <Page>
      <Pipeline pipeline={pipelineState} />
    </Page>
  );
};
