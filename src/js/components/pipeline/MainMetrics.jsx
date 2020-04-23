import React from 'react';
import DataWidget from 'js/components/DataWidget';
import Badge, { NEGATIVE_IS_BETTER, POSITIVE_IS_BETTER } from 'js/components/ui/Badge';
import { BigNumber, SmallTitle } from 'js/components/ui/Typography';
import Info from 'js/components/ui/Info';

import { fetchContributors, getPreviousInterval } from 'js/services/api/index';

import { useApi } from 'js/hooks';

import { dateTime, number } from 'js/services/format';


const MainMetrics = ({ data, loading, spinner }) => {
    return (
        <div className="row mb-4">
          <div className="col-md-3">
            <MainMetric
              title="Lead time"
              hint="Elapsed time between the creation of the 1st commit in a pull request and the code being used in production"
              dataGetter={() => [dateTime.human(data.leadTime.avg), data.leadTime.variation]}
              spinner={spinner}
              loading={loading}
              negativeIsBetter
            />
          </div>
          <div className="col-md-3">
            <MainMetric
              title="Cycle time"
              hint="Sum of the average time required in each development stage"
              dataGetter={() => [dateTime.human(data.cycleTime.avg), data.cycleTime.variation]}
              spinner={spinner}
              loading={loading}
              negativeIsBetter
            />
          </div>
          <div className="col-md-3">
            <MainMetric
              title="Pull requests"
              hint="Number of pull requests processed through the delivery pipeline"
              dataGetter={() => [data.createdPRs.avg, data.createdPRs.variation]}
              spinner={spinner}
              loading={loading}
            />
          </div>
          <div className="col-md-3">
            <MainMetric
              title="Contributors"
              hint="Number of people participating in (the processed) pull requests"
              dataGetter={() => [data.contribs.avg, data.contribs.variation]}
              spinner={spinner}
              loading={loading}
            />
          </div>
        </div >
    );
};

const MainMetric = ({ title, hint, dataGetter, loading, spinner, negativeIsBetter = false }) => {
    let content;
    if (loading && spinner) {
        content = spinner;
    } else {
        const [value, variation] = dataGetter();
        content = (
            <>
              <BigNumber content={value} />
              {value ? <Badge
                         value={number.round(variation)}
                         trend={negativeIsBetter ? NEGATIVE_IS_BETTER : POSITIVE_IS_BETTER}
                         className="ml-4"
                       /> : ''}
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
            createdPRs: {
                avg: data.global['prs-metrics.values'].all['cycle-count'],
                variation: data.global['prs-metrics.variations']['cycle-count']
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
          config={{
              margin: 0,
              color: '#858796',
          }}
          propagateSpinner={true}
        />
    );
};
