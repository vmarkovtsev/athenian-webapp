import React from 'react';
import DataWidget from 'js/components/DataWidget';
import Badge, { NEGATIVE_IS_BETTER, POSITIVE_IS_BETTER } from 'js/components/ui/Badge';
import { StatusIndicator, READY } from 'js/components/ui/Spinner';
import { BigNumber, SmallTitle } from 'js/components/ui/Typography';
import Info from 'js/components/ui/Info';

import { fetchContributors, getPreviousInterval } from 'js/services/api/index';

import { useApi } from 'js/hooks';

import { dateTime, number } from 'js/services/format';

const MainMetrics = ({ data, status }) => {
    return (
        <div className="row mb-4">
          <div className="col-md-3">
            <MainMetric
              title="Lead time"
              hint="Elapsed time between the creation of the 1st commit in a pull request and the code being used in production."
              dataGetter={() => [dateTime.human(data.leadTime.avg), data.leadTime.variation]}
              status={status}
              negativeIsBetter
            />
          </div>
          <div className="col-md-3">
            <MainMetric
              title="Cycle time"
              hint="Sum of the average time required in each development stage."
              dataGetter={() => [dateTime.human(data.cycleTime.avg), data.cycleTime.variation]}
              status={status}
              negativeIsBetter
            />
          </div>
          <div className="col-md-3">
            <MainMetric
              title="Pull requests"
              hint="Number of pull requests released, counting in the Lead Time."
              dataGetter={() => [data.releasedPRs.avg, data.releasedPRs.variation]}
              status={status}
            />
          </div>
          <div className="col-md-3">
            <MainMetric
              title="Contributors"
              hint="Number of people involved in delivering software."
              dataGetter={() => [data.contribs.avg, data.contribs.variation]}
              status={status}
            />
          </div>
        </div >
    );
};

const MainMetric = ({ title, hint, dataGetter, status, negativeIsBetter = false }) => {
    let content;
    if (status !== READY) {
        content = <StatusIndicator status={status} margin={0} textOnly />;
    } else {
        const [value, variation] = dataGetter();
        content = (
            <>
              <BigNumber content={value} />
              <Badge
                value={number.round(variation)}
                trend={negativeIsBetter ? NEGATIVE_IS_BETTER : POSITIVE_IS_BETTER}
                className="ml-4"
              />
            </>
        );
    }

    return (
        <div className="card">
          <div className="card-body p-0">
            <div className="d-flex card-title m-0 py-2 px-3" style={{minHeight: '51px'}}>
              <div className="my-auto p-0 align-middle">
                <SmallTitle content={title} />
                <Info content={hint} />
              </div>
              <div className="my-auto ml-auto p-0">
                {content}
              </div>
            </div>
          </div>
        </div>
    );
};

export default () => {
    const { api, ready: apiReady, context: apiContext } = useApi();

    if (!apiReady) {
        return null;
    }

    const { account, interval, repositories } = apiContext;
    const currInterval = interval;
    const prevInterval = getPreviousInterval(currInterval);

    const fetcher = async () => {
        const dataContribsPrev = await fetchContributors(
            api, account, prevInterval,
            { repositories }
        );

        return Promise.resolve({
            contribs: {
                prev: dataContribsPrev,
            }
        });
    };

    const plumber = (data) => {
        const calcVariation = (prev, curr) => prev > 0 ? (curr - prev) * 100 / prev : 0;

        const contribsCountPrev = data.contribs.prev.length;
        const contribsCountCurr = data.global['filter.contribs'].length;

        return {
            leadTime: {
                avg: data.global['prs-metrics.values'].all['lead-time'] * 1000,
                variation: data.global['prs-metrics.variations']['lead-time']
            },
            cycleTime: {
                avg: data.global['prs-metrics.values'].all['cycle-time'] * 1000,
                variation: data.global['prs-metrics.variations']['cycle-time']
            },
            releasedPRs: {
                avg: data.global['prs-metrics.values'].all['lead-count'],
                variation: data.global['prs-metrics.variations']['lead-count']
            },
            contribs: {
                avg: contribsCountCurr,
                variation: calcVariation(contribsCountPrev, contribsCountCurr)
            }
        };
    };

    return (
        <DataWidget
          id={`main-metrics`}
          component={MainMetrics} fetcher={fetcher} plumber={plumber}
          globalDataIDs={['filter.contribs', 'prs-metrics.values', 'prs-metrics.variations']}
          propagateSpinner={true}
        />
    );
};
