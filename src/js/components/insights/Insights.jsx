import React from 'react';

import Box from 'js/components/insights/Box';
import Spinner from 'js/components/ui/Spinner';

export default ({loading, insights}) => {
    if (loading) {
        return (
            <div className="row mt-5 mb-5">
              <div className="col-12 mt-5 text-center">
                <Spinner loading={loading} />
              </div>
            </div>
        );
    }

    return (
        <>{insights.map((ins, i) => <Box meta={ins.meta} content={ins.content} key={i} />)}</>
    );
}
