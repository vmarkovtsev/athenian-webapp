import React from 'react';
import { useParams } from "react-router-dom";

import { useDataContext } from 'js/context/Data';

import MainMetrics from 'js/components/pipeline/MainMetrics';
import Thumbnails from 'js/components/pipeline/Thumbnails';

import { pipelineStagesConf, getStage } from 'js/pages/pipeline/Pipeline';

export default ({ children }) => {
    const { globalDataReady } = useDataContext();
    const { name: stageSlug } = useParams();
    const activeConf = getStage(pipelineStagesConf, stageSlug);

    if (!globalDataReady) {
        console.log("Data not ready yet");
        return null;
    }

    return (
        <>
          <MainMetrics />
          <Thumbnails activeCard={activeConf && activeConf.slug} />
          {children}
        </>
    );
};
