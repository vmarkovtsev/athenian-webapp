
import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import CleanAreaChart, { vertical } from 'js/components/charts/CleanAreaChart';
import Badge from 'js/components/ui/Badge';
import { BigNumber, SmallTitle } from 'js/components/ui/Typography';
import Info from 'js/components/ui/Info'

import { hexToRGBParts, rgba } from 'js/services/colors';
import { dateTime } from 'js/services/format';

export default ({ prs, stages, activeCard }) => {
    //TODO(dpordomingo): stage.badge should count the stage-complete PRs, not the stage-pending ones. It should be obtained from the API
    return (
        <div className="row mt-4 mb-4 align-items-end pipeline-thumbnails">
            {
                stages.map(
                    (card, i) => (
                        <div className={classnames('col-md-3 pipeline-stage', card.stageName, activeCard === i && 'active')} key={i}>
                            <span data-toggle="tooltip" data-placement="bottom" title={card.event.before} className="event-before" />
                            <Link to={'/stage/' + card.slug}>
                                <Stage
                                    title={card.title}
                                    text={card.avg && dateTime.human(card.avg)}
                                    hint={card.hint}
                                    variation={card.variation}
                                    color={card.color}
                                    data={card.data}
                                    active={activeCard === i}
                                    badge={prs.filter(pr => pr.stage === card.stageName).length}
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

const Stage = ({ title, text, hint, badge, variation, color, data, active, onClick }) => {

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
                        {text ? <Badge trend value={variation} /> : ''}
                    </div>
                    <div className="col-7 pl-2" style={{ height: 55 }}>
                        <PipelineCardMiniChart data={data} color={color} active={active} />
                    </div>
                </div>
            </div>
        </div >
    )
};

const PipelineCardMiniChart = ({ color, active, data }) => {
    if (active) {
        color = '#FFFFFF';
    }

    const fill = {
        direction: vertical,
        stops: [
            {
                offset: "0%",
                color,
                opacity: .8
            },
            {
                offset: "100%",
                color,
                opacity: .1
            }
        ]
    };

    const stroke = {
        direction: vertical,
        stops: [
            {
                offset: "0%",
                color,
                opacity: 1
            },
            {
                offset: "100%",
                color,
                opacity: 1
            }
        ]
    };

    return (
        <CleanAreaChart data={data}
            fill={fill} stroke={stroke} >
        </CleanAreaChart>
    );
};
