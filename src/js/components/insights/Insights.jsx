import React from 'react';
import { useParams } from 'react-router-dom';
import { getInsights } from 'js/components/insights/Helper';

export default () => {
    const { name: stageSlug } = useParams();

    return (
        <>
          {getInsights(stageSlug)}
        </>
    );
}
