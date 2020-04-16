import React from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import classnames from 'classnames';

import Page from 'js/pages/templates/Page';

import BreadcrumbsContext from 'js/context/Breadcrumbs';

export default ({ prototypes }) => {
    const { name: activePrototype } = useParams();

    return (
        <BreadcrumbsContext>
            <Page>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    #root > .container {
                        padding: 0;
                        max-width: unset;
                        margin: 0 !important;
                    }
            `.replace(/\s{2,}/g, ' ')
                }} />
                <div className="navbar navbar-expand-sm navbar-light bg-white static-top border-bottom">
                    <div className="container">
                        <ol id="mainBreadcrumbs" className="breadcrumb bg-white mb-0 py-0 p-0" aria-label="breadcrumb">
                            {Object.keys(prototypes).map(prototype => (
                                <li
                                    className={classnames('breadcrumb-item', prototype === activePrototype ? 'active' : 'text-xs')}
                                    aria-current={prototype === activePrototype ? 'page' : 'false'}
                                    key={prototype}
                                >
                                    {
                                        prototype === activePrototype ? (
                                            prototype
                                        ) : (
                                                <Link to={`/prototypes/${prototype}`} className="text-bright">{prototype}</Link>
                                            )
                                    }
                                </li>
                            ))}
                        </ol>
                    </div>
                </div >
                <div className="container mt-4">
                    {Object.keys(prototypes).map(prototype => (
                        <Route path={`/prototypes/${prototype}`} key={prototype}>
                            {prototypes[prototype]}
                        </Route>
                    ))}
                </div>
            </Page >
        </BreadcrumbsContext>
    );
};
