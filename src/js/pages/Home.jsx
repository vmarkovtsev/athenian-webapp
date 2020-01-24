import React, { useState, useEffect } from 'react';

import Pipeline from 'js/components/pipeline/Pipeline';
import Page from 'js/pages/templates/Page';

import { getPipelineDataInitial, getPipelineDataAPI, getUser } from 'js/services/api';

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
