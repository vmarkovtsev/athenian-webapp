import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Badge, { NEGATIVE_IS_BETTER } from 'js/components/ui/Badge';
import { BigNumber, SmallTitle } from 'js/components/ui/Typography';
import Info from 'js/components/ui/Info';
import PipelineCardMiniChart from 'js/components/pipeline/PipelineCardMiniChart';
import { dateTime, number } from 'js/services/format';
import DataWidget from 'js/components/DataWidget';
import { useApi } from 'js/hooks';
import { fetchPRsMetrics } from 'js/services/api/index';
import { pipelineStagesConf, getStage } from 'js/pages/pipeline/Pipeline';
import moment from 'moment';
import _ from "lodash";

const Thumbnails = ({ data, loading, spinnerBuilder, prs, stages, activeCard }) => (
    <div className="row mt-4 mb-4 align-items-end pipeline-thumbnails">
      {
          // Here we're iterating on `pipelineStagesConf` so that we can already
          // draw the UI even without the data. This has to be refactored in order to not
          // use both `pipelineStagesConf` and `stages` since `stages` is the same thing,
          // but just with the data populated.
          pipelineStagesConf.slice(2, pipelineStagesConf.length).map(
              (card, i) => {
                  const allReady = !loading && prs.length > 0 && stages.length > 0;
                  const spinner = spinnerBuilder({
                      margin: 0,
                      color: card.color
                  });

                  let [stageData, textValue, variationValue, completedPRs] = [null, null, null, null];
                  if (allReady) {
                      const computedCard = getStage(stages, card.slug);
                      stageData = data[card.metric];
                      textValue = computedCard.avg && dateTime.human(computedCard.avg);
                      variationValue = computedCard.variation;
                      completedPRs = computedCard.stageCompleteCount(prs);
                  }

                  return (
                      <div className={classnames('col-md-3 pipeline-stage', card.stageName, activeCard === card.slug && 'active')} key={i}>
                        <span data-toggle="tooltip" data-placement="bottom" title={card.event.before} className="event-before" />
                        <Link to={'/stage/' + card.slug}>
                          <Stage
                            data={stageData}
                            loading={!allReady}
                            spinner={spinner}
                            title={card.title}
                            text={textValue}
                            hint={card.hint}
                            variation={variationValue}
                            color={card.color}
                            active={activeCard === card.slug}
                            badge={completedPRs}
                          >
                          </Stage>
                        </Link>
                        <span data-toggle="tooltip" data-placement="bottom" title={card.event.after} className="event-after" />
                      </div>
                  );
              }
          )
      }
    </div>
);


const Stage = ({ data, loading, spinner, title, text, hint, badge, variation, color, active, onClick }) => {
    const content = loading ? spinner : (
        <>
          <div className="col-5">
            <BigNumber content={text} className="mb-1 w-100" />
            {text ? <Badge trend={NEGATIVE_IS_BETTER} value={number.round(variation)} /> : ''}
          </div>
          <div className="col-7 pl-2" style={{ height: 55 }}>
            <PipelineCardMiniChart data={data} config={{
                color: active ? '#FFFFFF' : color
            }} />
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
                    {!loading && badge && <Badge value={badge} />}
                </div>
                <div className="row no-gutters card-text">
                  {content}
                </div>
            </div>
        </div>
    );
};

export default ({prs, stages, activeCard, config = {}}) => {
    const { api, ready: apiReady, context: apiContext } = useApi();

    if (!apiReady) {
        return null;
    }

    const { account, interval, repositories, contributors: developers } = apiContext;
    const granularity = calculateGranularity(interval);
    const metrics = ['wip-time', 'review-time', 'merging-time', 'release-time'];

    const fetcher = async () => fetchPRsMetrics(
        api, account, granularity, interval, metrics,
        { repositories, developers }
    );

    const plumber = (data) => _(data.calculated[0].values)
          .reduce(function(result, datapoint) {
              _(metrics).each((metric, i) => {
                  result[metric] = result[metric] || [];
                  result[metric].push({
                      x: datapoint.date,
                      y: datapoint.values[i]
                  });
              });

              return result;
          }, {});

    const defaultConfig = {prs, stages};
    const chartConfig = {...config, ...defaultConfig, margin: 0};

    return (
        <DataWidget
          id={`pipeline-cards-mini-charts`}
          component={Thumbnails} fetcher={fetcher} plumber={plumber}
          propagateSpinner={true}
          config={chartConfig}
        />
    );
};

const calculateGranularity = (interval) => {
    const diff = moment(interval.to).diff(interval.from, 'days');

    if (diff <= 21) {
        return 'day';
    }

    if (diff <= 90) {
        return 'week';
    }

    return 'month';
};
