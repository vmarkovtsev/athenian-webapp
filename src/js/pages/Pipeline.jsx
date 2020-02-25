import React from 'react';

import Page from 'js/pages/templates/Page';

import Body from 'js/pages/pipeline/Body';
import Filters from 'js/pages/pipeline/Filters';

export default ({ children }) => {
    return (
        <Page>
            <Filters>
                <Body>{children}</Body>
            </Filters>
        </Page>
    );
};
