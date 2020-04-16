import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'images/logos/logo-transparent.png';

export default ({ children, linkToHome = true }) => {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-12 text-center">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 text-center">
                    {children}
                    {linkToHome && (
                        <div className="mt-4">
                            <Link to="/" className="text-secondary">
                                &lt; Back to Home
                        </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
