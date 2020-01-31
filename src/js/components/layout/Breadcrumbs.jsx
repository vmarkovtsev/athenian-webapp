import React from 'react';
import { Link } from 'react-router-dom';

export default ({ breadcrumbs }) => (
    <div className="navbar navbar-expand-sm navbar-light bg-white static-top border-bottom">
        <div className="container">
            <ol id="mainBreadcrumbs" className="breadcrumb bg-white mb-0 py-0 p-0" aria-label="breadcrumb">
                {breadcrumbs.ancestors && breadcrumbs.ancestors.map((link, i) => (
                    <li key={i} className="breadcrumb-item text-xs">
                        <Link to={link.url} className="text-secondary">{link.text}</Link>
                    </li>
                ))}
                <li className="breadcrumb-item active" aria-current="page">{breadcrumbs.current}</li>
            </ol>
        </div>
    </div>
);