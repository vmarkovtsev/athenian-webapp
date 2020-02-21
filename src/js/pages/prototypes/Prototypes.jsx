import React from 'react';

import Page from 'js/pages/templates/Page';

import VerticalBarChart from 'js/pages/prototypes/types/VerticalBarChart'
import HorizontalBarChart from 'js/pages/prototypes/types/HorizontalBarChart'
import ScatterPlot from 'js/pages/prototypes/types/ScatterPlot'
import BubbleChart from 'js/pages/prototypes/types/BubbleChart'
import PositiveNegativeBarChart from 'js/pages/prototypes/types/PositiveNegativeBarChart'

export default () => {
    const metrics = [
        { title: 'Vertical Bar Chart', chart: VerticalBarChart, color: '#D80000' },
        { title: 'Horizontal Bar Chart', chart: HorizontalBarChart, color: '#9900FF' },
        { title: 'Scatter Plot', chart: ScatterPlot, color: '#FFFF00' },
        { title: 'Bubble Chart', chart: BubbleChart, color: '#00FFFF' },
        { title: 'Positive Negative Bar Chart', chart: PositiveNegativeBarChart, color: '#800000' },
    ];

    return (
        <Page>
            <div>
                <div className="row">
                    <div className="col-12">
                        <p className="text-centerleft font-weight-bold text-lg">Prototypes</p>
                    </div>
                </div>
                {metrics.map((metric, key) => <Metric title={metric.title} color={metric.color} chart={metric.chart} key={key} />)}
            </div>
        </Page>
    );
};

const Metric = ({ title, chart: Chart, color }) => (
    <div className="card mb-4">
        <div className="card-header bg-white font-weight-bold">
            <span className="text-gray-900"><span className="mr-3" style={{ display: 'inline-block', width: '20px', height: '20px', background: color }}></span>{title}</span>
        </div>
        <div className="card-body">
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