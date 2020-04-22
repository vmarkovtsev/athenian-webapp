import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'images/logos/logo-transparent.svg';
import login from 'images/login.svg';

export default ({ children, linkToHome = true }) => {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-12 text-center">
                    <img src={logo} className="App-logo" alt="logo" width="200" />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-4 offset-4 text-center">
                    <div className="card">
                        <div className="card-body p-5">
                            <img className="my-5" src={login} alt="" width="200" />
                            <div>
                                {children}
                            </div>
                        </div>
                    </div>
                    {linkToHome && (
                        <div className="mt-5">
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
