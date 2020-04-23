import React from 'react';

import Page from 'js/pages/templates/Page';

import Body from 'js/pages/pipeline/Body';
import Filters from 'js/pages/pipeline/Filters';
import BreadcrumbsContext from 'js/context/Breadcrumbs';
import DataContext from 'js/context/Data';

export default ({ children }) => (
    <BreadcrumbsContext>
      <Page>
        <DataContext>
          <Filters>
            <Body>
              {children}
            </Body>
          </Filters>
        </DataContext>
      </Page>
    </BreadcrumbsContext>
);
