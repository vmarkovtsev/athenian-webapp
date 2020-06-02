import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import moment from 'moment';
import { Hint } from 'react-vis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEye } from '@fortawesome/free-regular-svg-icons'

import { github, number } from 'js/services/format';
import { AltTitle } from 'js/components/ui/Typography';

export default ({value, ...props}) => {
    if (!value) return null;

    // TODO: This needs to be styled.
    // `value` is a flat key-value object
    return (
        <Hint {...props} value={value}>
            <TooltipContainer left>
                <Group>
                    { _(value)
                        .map((v, k) => !!v && <p key={k}>{k}: {v.toString()}</p>)
                        .filter(v => !!v)
                        .value()
                    }
                </Group>
            </TooltipContainer>
        </Hint>
    );
};

export const DefaultXYTooltip = ({
    value,
    dataPoint,
    x = v => <AltTitle content={v.x} />,
    y = v => <BigText content={v.y} />,
    ...props
}) => {
    if (!value) return null;
    return (
        <Hint {...props} value={value}>
            <TooltipContainer left>
                <Group>
                    {x(dataPoint || value)}
                    {y(dataPoint || value)}
                </Group>
            </TooltipContainer>
        </Hint>
    );
};

export const DateBigNumber = ({ value, dataPoint, renderBigFn = v => <BigText content={number.round(v.y)} />, ...props }) => {
    if (!value) return null;
    return (
        <DefaultXYTooltip
            value={value}
            dataPoint={dataPoint}
            x={v => <AltTitle content={<DateWeekDayMonth date={moment(v.x)} uppercase />} />}
            y={v => renderBigFn(v)}
            {...props}
        />
    );
};

export const PullRequestReview = ({ value, ...props }) => {
    if (!value) return null;

    const tooltip = value.tooltip;
    return (
        <Hint {...props} value={value} style={{ pointerEvents: 'auto' }}>
            <TooltipContainer left>
                <Group>
                    <AltTitle uppercase content={`#${tooltip.number}`} />
                    <PullRequestRepoTitle repo={tooltip.repository} title={tooltip.title} number={tooltip.number} />
                </Group>
                {tooltip.timeWaiting && (
                    <Group className={tooltip.reviewed ? 'text-turquoise' : 'text-orange'}>
                        <Icon icon={faClock} />
                        <span>{tooltip.reviewed ? 'Waited' : 'Waiting'} review for {tooltip.timeWaiting}</span>
                    </Group>
                )}
                <Group>
                    <UserAvatar src={tooltip.image} name={tooltip.author} middleText="Created by" size="18" />
                </Group>
            </TooltipContainer>
        </Hint>
    );
};

export const UserReviewer = ({ value, ...props }) => {
    if (!value) return null;

    const tooltip = value.tooltip;
    return (
        <Hint {...props} value={value}>
            <TooltipContainer>
                <Group>
                    <UserAvatar src={tooltip.image} name={tooltip.author} />
                </Group>
                {tooltip.stats && (
                    <Group>
                        <PRCommentsStats prs={tooltip.stats.prsCount || 0} comments={tooltip.stats.commentsCount || 0} />
                    </Group>
                )}
                {tooltip.prsCommentsPerc && (
                    <Group>
                        <AltTitle uppercase content="Reviews comments" />
                        <BigText content={tooltip.prsCommentsPerc.number} extra={number.percentage(tooltip.prsCommentsPerc.percentage)} />
                    </Group>
                )}
                {tooltip.reviewsPerc && (
                    <Group>
                        <AltTitle uppercase content="Reviews" />
                        <BigText content={tooltip.reviewsPerc.number} extra={number.percentage(tooltip.reviewsPerc.percentage)} />
                    </Group>
                )}
                {tooltip.x && (
                    <Group>
                        <AltTitle uppercase content="Pull Requests" />
                        <BigText content={tooltip.x.number} />
                    </Group>
                )}
            </TooltipContainer>
        </Hint >
    );
};

export const TimeToMerge = ({ value, ...props }) => {
    if (!value) return null;

    const tooltip = value.tooltip;
    return (
        <Hint {...props} value={value}>
            <TooltipContainer>
                <Group>
                    <span className="text-secondary text-m align-middle">{tooltip.repository}</span>
                </Group>
                <Group>
                    <p className="text-m text-dark m-0">
                        <Icon icon={faClock} className="text-blue" />
                        <span>{tooltip.time}</span>
                    </p>
                </Group>
            </TooltipContainer>
        </Hint >
    );
}

export const onValueChange = (datapoint, eventType, current, setCurrent, blacklist) => {
    console.log(`START: ${eventType}`);

    if (current && sameObjects(datapoint, current, blacklist)) {
        console.log(`END: ${eventType}`);
        return;
    }

    console.log('setting datapoint');
    setCurrent(getFilteredObject(datapoint, blacklist));
    console.log(`END: ${eventType}`);
};

export const onValueReset = (datapoint, eventType, current, setCurrent) => {
    console.log(`START: ${eventType}`);
    setCurrent(null);
    console.log(`END: ${eventType}`);
};

const sameObjects = (previous, current, blacklist) => {
    const filteredPrev = getFilteredObject(previous, blacklist);
    const filteredCurr = getFilteredObject(current, blacklist);

    return _.isEqual(filteredPrev, filteredCurr);
};

const getFilteredObject = (obj, blacklist) => _(obj).omit(blacklist).value();

export const TooltipContainer = ({ left = false, children }) => {
    return (
        <div className="athenian-tooltip chart-tooltip" onClick={event => event.stopPropagation()}>
            <div>
                <div className={classnames('card-body p-1', left ? 'text-left' : 'text-center')}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export const Group = ({ className, children }) => (
    <div className={classnames('w-100 mb-2', className)}>
        {children}
    </div>
);

export const BigText = ({ content, extra }) => (
    <span className="big-number font-weight-bold d-inline-block align-middle text-dark text-lg">
        <span>{content} </span>
        {extra && <span className="text-secondary font-weight-normal text-m">({extra})</span>}
    </span>
);

export const DateWeekDayMonth = ({date, uppercase }) => (
    <>
        <span className={uppercase && 'text-uppercase'}>{date.format('ddd')}</span>
        <span>, {date.format('Do')} </span>
        <span className={uppercase && 'text-uppercase'}>{date.format('MMM')}</span>
    </>
);

export const PullRequestRepoTitle = ({ repo, title, number }) => (
    <span className="text-s">
        <span className="text-secondary">{repo}: </span>
        <a
            href={github.prLink(`github.com/${repo}`, number)}
            target="_blank" rel="noopener noreferrer"
            className="text-dark font-weight-bold"
        >
            {title}
        </a>
    </span>
);

export const Icon = ({ icon, className }) => (
    <FontAwesomeIcon icon={icon} className={classnames('mr-1', className)} />
);

export const UserAvatar = ({ name, src, middleText, size = 30 }) => (
    <>
        <img src={src} alt={name} className="user-avatar inline-block" height={size} width={size} />
        <span className="ml-2 inline-block font-weight-light align-middle">
            {middleText && <span className="text-secondary">{middleText} </span>}
            <span className={classnames('text-dark', !middleText ? 'text-m' : '')}>{name}</span>
        </span>
    </>
);

export const PRCommentsStats = ({ prs, comments }) => (
    <p className="user-info text-secondary font-weight-light m-0">
        <span className="icon-pull-request mr-1"></span>
        <span className="mr-3">{prs}</span>
        <Icon icon={faEye} />
        <span>{comments}</span>
    </p>
);