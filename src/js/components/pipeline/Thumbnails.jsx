import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Badge, { NEGATIVE_IS_BETTER } from 'js/components/ui/Badge';
import { BigNumber, SmallTitle } from 'js/components/ui/Typography';
import Info from 'js/components/ui/Info';
import PipelineCardMiniChart from 'js/components/pipeline/PipelineCardMiniChart';

import { dateTime, number } from 'js/services/format';

export default ({ prs, stages, activeCard }) => {
    return (
        <div className="row mt-4 mb-4 align-items-end pipeline-thumbnails">
            {
                stages.map(
                    (card, i) => (
                        <div className={classnames('col-md-3 pipeline-stage', card.stageName, activeCard === card.slug && 'active')} key={i}>
                            <span data-toggle="tooltip" data-placement="bottom" title={card.event.before} className="event-before" />
                            <Link to={'/stage/' + card.slug}>
                                <Stage
                                    title={card.title}
                                    text={card.avg && dateTime.human(card.avg)}
                                    hint={card.hint}
                                    variation={card.variation}
                                    color={card.color}
                                    name={card.stageName}
                                    metric={card.metric}
                                    active={activeCard === card.slug}
                                    badge={card.stageCompleteCount(prs)}
                                >
                                </Stage>
                            </Link>
                            <span data-toggle="tooltip" data-placement="bottom" title={card.event.after} className="event-after" />
                        </div>
                    )
                )
            }
        </div>
    );
};

const Stage = ({ title, text, hint, badge, variation, color, name, metric, active, onClick }) => {
    return (
        <div className={classnames('card pipeline-thumbnail', active && 'active')} onClick={onClick}>
            <div className="card-body p-3">
                <div className="card-title d-flex justify-content-between align-items-center mb-3">
                    <span>
                        <SmallTitle content={title} />
                        <Info content={hint} />
                    </span>
                    {badge && <Badge value={badge} />}
                </div>
                <div className="row no-gutters card-text">
                    <div className="col-5">
                        <BigNumber content={text} className="mb-1 w-100" />
                        {text ? <Badge trend={NEGATIVE_IS_BETTER} value={number.round(variation)} /> : ''}
                    </div>
                    <div className="col-7 pl-2" style={{ height: 55 }}>
                      <PipelineCardMiniChart name={name} metric={metric} config={{
                          color: active ? '#FFFFFF' : color
                      }} />
                    </div>
                </div>
            </div>
        </div >
    );
};
