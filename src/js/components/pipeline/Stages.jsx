
import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import CleanAreaChart, { vertical } from 'js/components/charts/CleanAreaChart';
import Badge from 'js/components/ui/Badge';
import { BigNumber, SmallTitle } from 'js/components/ui/Typography';
import Info from 'js/components/ui/Info'

import { hexToRGBParts, rgba } from 'js/services/colors';

export default ({ stages, activeCard }) => {
    return (
        <div className="row mb-4 align-items-end">
            {
                stages.map(
                    (card, i) => (
                        <div className="col-md-3" key={i}>
                            <Link to={'/stage/' + card.tab.slug}>
                                <Stage
                                    title={card.tab.title}
                                    text={card.tab.text}
                                    badge={card.tab.badge}
                                    color={card.tab.color}
                                    data={card.tab.data}
                                    active={activeCard === i}
                                >
                                </Stage>
                            </Link>
                        </div>
                    )
                )
            }
        </div>
    );
};

const Stage = ({ title, text, badge, color, data, active, onClick }) => {
    const cardStyle = {};
    if (active) {
        cardStyle.background = rgba(hexToRGBParts(color), .7);
        cardStyle.borderBottomColor = color;
    };

    return (
        <div className={classnames('card pipeline-thumbnail', active && 'active')} onClick={onClick} style={cardStyle}>
            <div className="card-body">
                <div className="card-title d-flex justify-content-between align-items-center mb-3">
                    <span>
                        <SmallTitle content={title} />
                        <Info content="Some pipeline description" />
                    </span>
                    <Badge value={badge} />
                </div>
                <div className="row no-gutters card-text">
                    <BigNumber content={text} />
                    <div className="col-7 pl-2" style={{ height: 40 }}>
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
                opacity: .5
            },
            {
                offset: "100%",
                color,
                opacity: 0
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
