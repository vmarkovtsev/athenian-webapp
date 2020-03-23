import React from 'react';

import Box from 'js/components/insights/Box';

export default ({insights}) => (
    <>{insights.map((ins, i) => <Box meta={ins.meta} content={ins.content}/>)}</>
);
