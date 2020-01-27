import React, { useState, useEffect } from 'react';

import Pipeline from 'js/components/pipeline/Pipeline';
import PullRequests from 'js/components/pipeline/PullRequests';
import Page from 'js/pages/templates/Page';

import { getPipelineDataInitial, getPipelineDataAPI, getPRs } from 'js/services/api';

export default () => {
  const [pipelineState, setPipelineData] = useState(getPipelineDataInitial());
  const [prsState, _] = useState(getPRs);

  useEffect(() => {
    getPipelineDataAPI().then(data => {
      setPipelineData(data);
    });
  }, []);

  return (
    <Page>
      <Pipeline pipeline={pipelineState} />
      <PullRequests data={prsState} />
    </Page>
  );
};
