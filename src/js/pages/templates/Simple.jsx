import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'images/logos/logo-transparent.png';

export default ({ children }) => {
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
                    <div className="mt-4">
                        <Link to="/">
                            &lt; Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
