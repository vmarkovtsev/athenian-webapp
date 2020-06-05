import React, {useEffect} from 'react'
import { useParams } from "react-router-dom"
import _ from "lodash"
import moment from 'moment'

import { StatusIndicator, LOADING } from 'js/components/ui/Spinner';

import MainMetrics from 'js/components/pipeline/MainMetrics'
import Thumbnails from 'js/components/pipeline/Thumbnails'
import { pipelineStagesConf, getStage } from 'js/pages/pipeline/Pipeline'

import { useApi } from 'js/hooks'
import { useDataContext } from 'js/context/Data'
import { fetchFilteredPRs, fetchPRsMetrics, getPreviousInterval } from 'js/services/api'

import { NoData } from 'js/components/layout/Empty'

export default ({ children }) => {
  const { api, ready: apiReady, context: apiContext } = useApi()
  const { setGlobal: setGlobalData } = useDataContext()
  const { name: stageSlug } = useParams()
  const activeConf = getStage(pipelineStagesConf, stageSlug)

  useEffect(() => {
    if (!apiReady) {
      console.log("api not ready")
      return
    }

    const getAndSetPRs = async () => {
      const fetchValues = async () => {
        try {
          return await fetchFilteredPRs(
            api,
            apiContext.account,
            apiContext.interval,
            {
              repositories: apiContext.repositories,
              developers: apiContext.contributors,
            },
            apiContext.excludeInactive,
          );
        } catch (err) {
          return new Error(`Could not fetch pull requests; ${err.body?.detail || err.body?.type || err.error.message || err}`);
        }
      };

      setGlobalData('prs', fetchValues());
    }

    const allMetrics = [
      'wip-time',
      'wip-count',
      'review-time',
      'review-count',
      'merging-time',
      'merging-count',
      'release-time',
      'release-count',
      'lead-time',
      'lead-count',
      'cycle-time',
      'cycle-count',
      'all-count',
      'wait-first-review-time',
      'wait-first-review-count',
      'flow-ratio',
      'opened',
      'merged',
      'closed',
      'released'
    ]

    const fetchGlobalPRMetrics = async () => {
      const fetchValues = async () => {
        const customGranularity = calculateGranularity(apiContext.interval)

        let data = {};
        try {
          data = await fetchPRsMetrics(
            api, apiContext.account, ['all', customGranularity],
            apiContext.interval, allMetrics,
            { repositories: apiContext.repositories, with: { author: apiContext.contributors } },
            null,
            apiContext.excludeInactive,
          );
        } catch (err) {
          return new Error(`Could not fetch metrics; ${err.body?.detail || err.body?.type || err.error.message || err}`);
        }

        if (!data.calculated?.[0]) {
          return {
            all: allMetrics.reduce((acc,v) => { acc[v] = null; return acc }, {}),
            custom: allMetrics.reduce((acc,v) => { acc[v] = []; return acc }, {}),
          }
        }

        let rawAllValues, rawCustomValues
        if (data.calculated[0].granularity === 'all') {
          rawAllValues = data.calculated[0].values
          rawCustomValues = data.calculated[1].values
        } else {
          rawAllValues = data.calculated[1].values
          rawCustomValues = data.calculated[0].values
        }

        const allValues = _(allMetrics)
          .zip(rawAllValues[0].values)
          .fromPairs()
          .value()
        const customValues = _(rawCustomValues)
          .reduce((result, v) => {
            _(allMetrics).forEach((m, i) => {
              (result[m] || (result[m] = [])).push(
                { date: v.date, value: v.values[i] }
              )
            })

            return result
          }, {})

          return {
            all: allValues,
            custom: customValues
          }
      }

      setGlobalData('prs-metrics.values', fetchValues())
    }

    const fetchGlobalPRMetricsVariations = async() => {
      const fetchValues = async () => {
        const currInterval = apiContext.interval
        const prevInterval = getPreviousInterval(currInterval)

        const diffDays = moment(currInterval.to).diff(currInterval.from, 'days')
        const interval = { from: prevInterval.from, to: currInterval.to }

        let data = {};
        try {
          data = await fetchPRsMetrics(
            api, apiContext.account, [`${diffDays + 1} day`],
            interval, allMetrics,
            { repositories: apiContext.repositories, with: { author: apiContext.contributors } },
            null,
            apiContext.excludeInactive,
          )
        } catch (err) {
          return new Error(`Could not fetch metric variations; ${err.body?.detail || err.body?.type || err.error.message || err}`);
        }

        if (!data.calculated?.[0]?.values?.length) {
          return 0
        }

        const calcVariation = (prev, curr) => prev > 0 ? (curr - prev) * 100 / prev : null;

        const prevValues = data.calculated[0].values[0].values
        const currValues = data.calculated[0].values[1].values

        return _(prevValues)
          .zip(currValues)
          .map((v, i) => [allMetrics[i], calcVariation(v[0], v[1])])
          .fromPairs()
          .value()
      }

      setGlobalData('prs-metrics.variations', fetchValues())
    }

    getAndSetPRs()
    fetchGlobalPRMetrics()
    fetchGlobalPRMetricsVariations()
  }, [apiReady, api, apiContext.account, apiContext.interval, apiContext.repositories, apiContext.contributors, apiContext.excludeInactive, setGlobalData])

  if (!apiReady) {
    return <StatusIndicator status={LOADING} />
  } else if (apiReady && (!apiContext?.repositories?.length || !apiContext?.contributors?.length)) {
    return <NoData />
  }

  return (
    <>
      <MainMetrics />
      <Thumbnails activeCard={activeConf && activeConf.slug} />
      {children}
    </>
  )
}


const calculateGranularity = interval => {
  const diff = moment(interval.to).diff(interval.from, 'days')

  if (diff <= 21) return 'day'

  if (diff <= 90) return 'week'

  return 'month'
}
