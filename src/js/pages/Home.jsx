import React, { useState, useEffect } from 'react';

import Pipeline from 'js/components/pipeline/Pipeline';
import PullRequests from 'js/components/pipeline/PullRequests';
import Page from 'js/pages/templates/Page';

import { getPipelineDataInitial, getPipelineDataAPI, getPRs, fetchApi } from 'js/services/api';

import { useAuth0 } from "../services/react-auth0-spa";

export default () => {
  const { loading, isAuthenticated, getTokenSilently } = useAuth0();

  const [pipelineState, setPipelineData] = useState(getPipelineDataInitial());
  const [prsState, _] = useState(getPRs());

  useEffect(() => {
    const callAPI = async () => {
      if (loading || !isAuthenticated) {
        return;
      };

      getTokenSilently()
        .then(token => {
          return fetchApi(token, getPipelineDataAPI);
        })
        .then(data => {
          setPipelineData(data);
        });
    };

    callAPI();
  }, [loading, isAuthenticated, getTokenSilently]);

  return (
    <Page>
      <Pipeline pipeline={pipelineState} />
      <PullRequests data={prsState} />
    </Page>
  );
};
