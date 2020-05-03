import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import _ from "lodash";

import Badge, { NEGATIVE_IS_BETTER } from 'js/components/ui/Badge';
import { BigNumber, SmallTitle } from 'js/components/ui/Typography';
import { StatusIndicator, READY } from 'js/components/ui/Spinner';
import Info from 'js/components/ui/Info';
import PipelineCardMiniChart from 'js/components/pipeline/PipelineCardMiniChart';
import DataWidget from 'js/components/DataWidget';

import { dateTime, number } from 'js/services/format';

import { pipelineStagesConf } from 'js/pages/pipeline/Pipeline';

const Thumbnails = ({ data, status, activeCard }) => (
    <div className="row mt-4 mb-4 align-items-end pipeline-thumbnails">
      {
          pipelineStagesConf.slice(2, pipelineStagesConf.length).map(
              (card, i) => {
                  const active = activeCard === card.slug;
                  const color = active ? '#FFFFFF' : card.color;

                  let [stageData, textValue, variationValue, completedPRs] = [null, null, null, null];
                  if (status === READY) {
                      stageData = data.timeseries[card.metric];
                      textValue = dateTime.human(data.aggregated[card.metric] * 1000);
                      variationValue = data.variations[card.metric];
                      completedPRs = card.stageCompleteCount(data.prs);
                  }

                  return (
                      <div className={classnames('col-md-3 pipeline-stage', card.stageName, active && 'active')} key={i}>
                        <span data-toggle="tooltip" data-placement="bottom" title={card.event.before} className="event-before" />
                        <Link to={'/stage/' + card.slug}>
                          <Stage
                            data={stageData}
                            status={status}
                            title={card.title}
                            text={textValue}
                            hint={card.hint}
                            variation={variationValue}
                            color={color}
                            active={activeCard === card.slug}
                            badge={completedPRs}
                          />
                        </Link>
                        <span data-toggle="tooltip" data-placement="bottom" title={card.event.after} className="event-after" />
                      </div>
                  );
              }
          )
      }
    </div>
);


const Stage = ({ data, status, title, text, hint, badge, variation, color, active, onClick }) => {
    const content = status !== READY ?
        (
            <StatusIndicator status={status} color={color} textOnly />
        )
        :
        (
            <>
            <div className="col-5">
                <BigNumber content={text} className="mb-1 w-100" />
                {text ? <Badge trend={NEGATIVE_IS_BETTER} value={number.round(variation)} /> : ''}
            </div>
            <div className="col-7 pl-2" style={{ height: 55 }}>
                <PipelineCardMiniChart data={data} config={{color}} />
            </div>
            </>
        );

    return (
        <div className={classnames('card pipeline-thumbnail', active && 'active')} onClick={onClick}>
            <div className="card-body p-3">
                <div className="card-title d-flex justify-content-between align-items-center mb-3">
                    <span>
                        <SmallTitle content={title} />
                        <Info content={hint} />
                    </span>
                    {status === READY && badge && <Badge value={badge} />}
                </div>
                <div className="row no-gutters card-text">
                  {content}
                </div>
            </div>
        </div>
    );
};

export default ({activeCard, config = {}}) => {

    const plumber = (data) => (
        {
            aggregated: data.global['prs-metrics.values'].all,
            timeseries: _(data.global['prs-metrics.values'].custom)
                .reduce((result, datapoints, k) => {
                    result[k] = _(datapoints)
                        .map(d => ({x: d.date, y: d.value}))
                        .value();
                    return result;
                }, {}),
            prs: data.global.prs.prs,
            variations: data.global['prs-metrics.variations']
        }
    );

    const widgetConfig = {...config, activeCard, margin: 0};

    return (
        <DataWidget
          id={`pipeline-cards-mini-charts`}
          component={Thumbnails} plumber={plumber}
          globalDataIDs={['prs', 'prs-metrics.values', 'prs-metrics.variations']}
          propagateSpinner={true}
          config={widgetConfig}
        />
    );
};
