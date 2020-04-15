import React from 'react';
import _ from "lodash";
import Chart from 'js/components/charts/Chart';
import Badge, { NEGATIVE_IS_BETTER, POSITIVE_IS_BETTER } from 'js/components/ui/Badge';
import { BigNumber, SmallTitle } from 'js/components/ui/Typography';
import Info from 'js/components/ui/Info';

import { fetchPRsMetrics, fetchFilteredPRs, getPreviousInterval } from 'js/services/api/index';

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

    const { account, interval, repositories, contributors: developers } = apiContext;
    const currInterval = interval;
    const prevInterval = getPreviousInterval(currInterval);

    const granularity = 'all';


    const fetcher = async () => {
        const metrics = ['lead-time', 'cycle-time'];

        const data1Prev = await fetchPRsMetrics(
            api, account, granularity, prevInterval, metrics,
            { repositories, developers }
        );
        const data1Curr = await fetchPRsMetrics(
            api, account, granularity, currInterval, metrics,
            { repositories, developers }
        );

        const data2Prev = await fetchFilteredPRs(
            api, account, prevInterval,
            { repositories, developers }
        );
        const data2Curr = await fetchFilteredPRs(
            api, account, currInterval,
            { repositories, developers }
        );

        return Promise.resolve({
            leadTimeCycleTime: {
                prev: data1Prev,
                curr: data1Curr,
            },
            prs: {
                prev: data2Prev,
                curr: data2Curr,
            }
        });
    };

    const plumber = (data) => {
        const countContribs = (prs) => _(prs)
              .flatMap(pr => pr.participants)
              .map("id")
              .uniq()
              .value()
              .length;

        const calcVariation = (prev, curr) => prev > 0 ? (curr - prev) * 100 / prev : 0;

        const [leadTimePrev, cycleTimePrev] = data.leadTimeCycleTime.prev
              .calculated[0].values[0].values;
        const [leadTimeCurr, cycleTimeCurr] = data.leadTimeCycleTime.curr
              .calculated[0].values[0].values;

        const prsCountPrev = data.prs.prev.data.length;
        const prsCountCurr = data.prs.curr.data.length;

        const contribsCountPrev = countContribs(data.prs.prev.data);
        const contribsCountCurr = countContribs(data.prs.curr.data);

        return {
            leadTime: {
                avg: leadTimeCurr * 1000,
                variation: calcVariation(leadTimePrev, leadTimeCurr)
            },
            cycleTime: {
                avg: cycleTimeCurr * 1000,
                variation: calcVariation(cycleTimePrev, cycleTimeCurr)
            },
            createdPRs: {
                avg: prsCountCurr,
                variation: calcVariation(prsCountPrev, prsCountCurr)
            },
            contribs: {
                avg: contribsCountCurr,
                variation: calcVariation(contribsCountPrev, contribsCountCurr)
            }
        };
    };

    return (
        <Chart
          id={`main-metrics`}
          component={MainMetrics} fetcher={fetcher} plumber={plumber}
          config={{
              margin: 0,
              color: '#858796',
          }}
          propagateSpinner={true}
        />
    );
};
