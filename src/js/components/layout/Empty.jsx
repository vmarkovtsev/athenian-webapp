import React from 'react';
import noData from 'images/empty-states/no-data.svg';
import comingSoon from 'images/empty-states/coming-soon.svg';

const Empty = ({ background, children }) => {
    return (
        <div className="row">
            <div className="empty-container col-12 text-center my-5 py-5">
                <img className="empty-image mb-5" src={background} alt="" width="300" />
                {children}
            </div>
        </div>
    );
}

export default Empty;

export const NoData = ({ textOnly = null }) => {
    if (textOnly) {
        return 'no data';
    }

    return (
        <Empty background={noData}>
            <h3 className="text-secondary font-weight-light mb-3">There is no data for the selected filters.</h3>
            <p className="text-secondary font-weight-light">You can filter for different dates, repositories and contributors.</p>
        </Empty>
    );
};

export const ComingSoon = () => {
    return (
        <Empty background={comingSoon}>
            <h3 className="text-secondary font-weight-light mb-3">We are working on adding new insights.</h3>
            <p className="text-secondary font-weight-light mb-5">Meanwhile, please let us know what you'd like to see here.</p>
            <button onClick={() => window.Intercom('show')} className="btn btn-large btn-orange">Give feedback</button>
        </Empty>
    );
};
