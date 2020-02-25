import React from 'react';

import Page from 'js/pages/templates/Page';

import Body from 'js/pages/pipeline/Body';
import Filters from 'js/pages/pipeline/Filters';
import PullRequests from 'js/pages/pipeline/PullRequests';

export default ({ children }) => {
    return (
        <Page>
            <Filters>
                <PullRequests>
                    <Body>
                        {children}
                    </Body>
                </PullRequests>
            </Filters>
        </Page>
    );
};
