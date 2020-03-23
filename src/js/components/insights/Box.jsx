import React from 'react';
import classnames from 'classnames';

import Info from 'js/components/ui/Info';
/*
  Component for the boxes in the "Insights" tab of each stage of the pipeline.

  - meta: object{
        title: string (required)
        description: (required)
    } (required)
  - content: array[
        object{
            chart: object{
                component: React component function (required)
                params: {
                    title: string (required)
                    data: anything (required)
                } (required)
            } (required)
            kpis: array[
                object{
                    title: object{
                        text: string (required)
                        bold: boolean
                    } (required)
                    subtitle: object{
                        text: string (required)
                        bold: boolean
                    }
                    component: React component function (required)
                    data: anything (required)
                }
            ] (required)
        }
    ] (required)

 */
export default ({meta, content}) => (
    <div className="card mb-4">
      <BoxHeader meta={meta}/>
      <BoxBody content={content} />
    </div >
);

const BoxHeader = ({meta}) => (
    <div className="card-header bg-white font-weight-bold text-dark p-4">
      <span className="text-m">{meta.title}</span>
      <Info content={meta.description} />
    </div>
);

const BoxBody = ({content}) =>  (
    <>{
        content.map((row, i) => (
            <div key={i} className="card-body py-5 px-4">{
                row.kpis.length > 0 ? (
                    <WithKPIBoxBodyRow chart={row.chart} kpis={row.kpis} />
                ) : (
                    <SimpleBoxBodyRow chart={row.chart} />
                )
            }</div>
        ))
    }</>
);


const SimpleBoxBodyRow = ({chart}) => (
    <div className="row">
      <div className="col-12">
        <chart.component params={chart.params} />
      </div>
    </div>
);

const WithKPIBoxBodyRow = ({chart, kpis}) => (
    <div className="row">
      <div className="col-7">
        <chart.component {...chart.params} />
      </div>
      <div className="col-5 align-self-center">
        <div className="row justify-content-center">
          <div className="col-8">{
              kpis.map((kpi, i) => (
                  <BoxKPI key={i} title={kpi.title} subtitle={kpi.subtitle}>
                    <kpi.component key={i} {...kpi.data} />
                  </BoxKPI>
              ))
          }</div>
        </div>
      </div>
    </div>
);

const BoxKPI = ({ title, subtitle, children }) => (
    <div className="card mb-4 bg-light border-0">
      <div className="card-body p-4">
        <h5 className={classnames('card-title text-xs text-uppercase', title.bold && 'font-weight-bold')}>{title.text}</h5>
        {subtitle && <h6 className={classnames('card-subtitle mb-2 text-xs text-uppercase', subtitle.bold && 'font-weight-bold')}>{subtitle.text}</h6>}
        <div className="card-text">
          {children}
        </div>
      </div>
    </div>
);
