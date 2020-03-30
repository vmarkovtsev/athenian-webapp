import React from 'react';

import Page from 'js/pages/templates/Page';

import Body from 'js/pages/pipeline/Body';
import Filters from 'js/pages/pipeline/Filters';
import PullRequests from 'js/pages/pipeline/PullRequests';
import Pipeline from 'js/pages/pipeline/Pipeline';
import BreadcrumbsContext from 'js/context/Breadcrumbs';

export default ({ children }) => (
    <BreadcrumbsContext>
      <Page>
        <Filters>
          <PullRequests>
            <Pipeline>
              <Body>
                {children}
              </Body>
            </Pipeline>
          </PullRequests>
        </Filters>
      </Page>
    </BreadcrumbsContext>
);
