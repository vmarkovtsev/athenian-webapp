import React from 'react';

export default () => (
    <div className="row mb-3">
        <div className="col-12">
            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom">
                <div className="form-row">
                    <div className="dropdown col">
                        <button
                            className="btn btn-secondary dropdown-toggle bg-white text-xs text-gray-900"
                            type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        >
                            Repositories
                        </button>
                        <div className="dropdown-menu text-xs" aria-labelledby="dropdownMenuButton">
                            <span className="dropdown-item">Repo 1</span>
                            <span className="dropdown-item">Repo 2</span>
                            <span className="dropdown-item">Repo 3</span>
                        </div>
                    </div>
                    <div className="dropdown col">
                        <button
                            className="btn btn-secondary dropdown-toggle bg-white text-xs text-gray-900"
                            type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        >
                            Users
                        </button>
                        <div className="dropdown-menu text-xs" aria-labelledby="dropdownMenuButton">
                            <span className="dropdown-item">User 1</span>
                            <span className="dropdown-item">User 2</span>
                            <span className="dropdown-item">User 3</span>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col input-group">
                        <input type="date" className="form-control text-xs text-gray-900" />
                        <input type="date" className="form-control text-xs text-gray-900" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);
