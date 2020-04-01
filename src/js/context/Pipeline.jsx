import React, { useContext } from 'react';

const PipelineContext = React.createContext({ leadtime: {}, cycletime: {}, stages: [] });

/**
 * Returns the leadtime and stages metrics within the active filters.
 * @return {leadtime <{metric}>, stages <Array<{metric}>>} leadtime and stages metrics.
 */
export const usePipelineContext = () => useContext(PipelineContext);

export default ({ metrics, children }) => {
    return (
        <PipelineContext.Provider value={metrics}>
            {children}
        </PipelineContext.Provider >
    );
};
