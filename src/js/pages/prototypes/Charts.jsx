import React from 'react';

import PositiveNegativeBarChart from 'js/pages/prototypes/charts/PositiveNegativeBarChart'

export default () => {
    const metrics = [
        { title: 'Positive Negative Bar Chart', chart: PositiveNegativeBarChart, color: '#800000' },
    ];

    return (
        <div>
            {metrics.map((metric, key) => <Metric title={metric.title} color={metric.color} chart={metric.chart} key={key} />)}
        </div>
    );
};

const Metric = ({ title, chart: Chart, color }) => (
    <div className="card mb-4">
        <div className="card-header p-4 bg-white font-weight-bold text-dark p-4">
            <span className="text-m"><span className="mr-3" style={{ display: 'inline-block', width: '20px', height: '20px', background: color }}></span>{title}</span>
        </div>
        <div className="card-body py-5 px-4">
            <div className="row">
                <div className="col-7">
                    <Chart />
                </div>
                <div className="col-5 align-self-center">
                    KPIs
                </div>
            </div>
        </div>
    </div >
)
