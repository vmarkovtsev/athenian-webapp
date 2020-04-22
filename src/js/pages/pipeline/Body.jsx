import React from 'react';
import { useParams } from "react-router-dom";

import MainMetrics from 'js/components/pipeline/MainMetrics';
import Thumbnails from 'js/components/pipeline/Thumbnails';

import { pipelineStagesConf, getStage } from 'js/pages/pipeline/Pipeline';

export default ({ children }) => {
    const { name: stageSlug } = useParams();
    const activeConf = getStage(pipelineStagesConf, stageSlug);

    return (
        <>
          <MainMetrics />
          <Thumbnails activeCard={activeConf && activeConf.slug} />
          {children}
        </>
    );
};
