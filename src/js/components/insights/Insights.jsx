import React from 'react';

import Box from 'js/components/insights/Box';

export default ({loading, insights}) => {
    if (loading) {
        return <p>LOADING...</p>;
    }

    return (
        <>{insights.map((ins, i) => <Box meta={ins.meta} content={ins.content} key={i} />)}</>
    );
}
