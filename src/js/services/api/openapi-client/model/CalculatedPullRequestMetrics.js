/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.35
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import CalculatedPullRequestMetricsItem from './CalculatedPullRequestMetricsItem';
import PullRequestMetricID from './PullRequestMetricID';

/**
 * The CalculatedPullRequestMetrics model module.
 * @module model/CalculatedPullRequestMetrics
 * @version 1.0.35
 */
class CalculatedPullRequestMetrics {
    /**
     * Constructs a new <code>CalculatedPullRequestMetrics</code>.
     * The dates start from &#x60;date_from&#x60; and end earlier or equal to &#x60;date_to&#x60;.
     * @alias module:model/CalculatedPullRequestMetrics
     * @param calculated {Array.<module:model/CalculatedPullRequestMetricsItem>} Values of the requested metrics through time.
     * @param metrics {Array.<module:model/PullRequestMetricID>} Repeats `PullRequestMetricsRequest.metrics`.
     * @param dateFrom {Date} Repeats `PullRequestMetricsRequest.date_from`.
     * @param dateTo {Date} Repeats `PullRequestMetricsRequest.date_to`.
     * @param granularities {Array.<String>} 
     */
    constructor(calculated, metrics, dateFrom, dateTo, granularities) { 
        
        CalculatedPullRequestMetrics.initialize(this, calculated, metrics, dateFrom, dateTo, granularities);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, calculated, metrics, dateFrom, dateTo, granularities) { 
        obj['calculated'] = calculated;
        obj['metrics'] = metrics;
        obj['date_from'] = dateFrom;
        obj['date_to'] = dateTo;
        obj['granularities'] = granularities;
    }

    /**
     * Constructs a <code>CalculatedPullRequestMetrics</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CalculatedPullRequestMetrics} obj Optional instance to populate.
     * @return {module:model/CalculatedPullRequestMetrics} The populated <code>CalculatedPullRequestMetrics</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CalculatedPullRequestMetrics();

            if (data.hasOwnProperty('calculated')) {
                obj['calculated'] = ApiClient.convertToType(data['calculated'], [CalculatedPullRequestMetricsItem]);
            }
            if (data.hasOwnProperty('metrics')) {
                obj['metrics'] = ApiClient.convertToType(data['metrics'], [PullRequestMetricID]);
            }
            if (data.hasOwnProperty('date_from')) {
                obj['date_from'] = ApiClient.convertToType(data['date_from'], 'Date');
            }
            if (data.hasOwnProperty('date_to')) {
                obj['date_to'] = ApiClient.convertToType(data['date_to'], 'Date');
            }
            if (data.hasOwnProperty('timezone')) {
                obj['timezone'] = ApiClient.convertToType(data['timezone'], 'Number');
            }
            if (data.hasOwnProperty('granularities')) {
                obj['granularities'] = ApiClient.convertToType(data['granularities'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * Values of the requested metrics through time.
 * @member {Array.<module:model/CalculatedPullRequestMetricsItem>} calculated
 */
CalculatedPullRequestMetrics.prototype['calculated'] = undefined;

/**
 * Repeats `PullRequestMetricsRequest.metrics`.
 * @member {Array.<module:model/PullRequestMetricID>} metrics
 */
CalculatedPullRequestMetrics.prototype['metrics'] = undefined;

/**
 * Repeats `PullRequestMetricsRequest.date_from`.
 * @member {Date} date_from
 */
CalculatedPullRequestMetrics.prototype['date_from'] = undefined;

/**
 * Repeats `PullRequestMetricsRequest.date_to`.
 * @member {Date} date_to
 */
CalculatedPullRequestMetrics.prototype['date_to'] = undefined;

/**
 * Repeats `PullRequestMetricsRequest.timezone`.
 * @member {Number} timezone
 */
CalculatedPullRequestMetrics.prototype['timezone'] = undefined;

/**
 * @member {Array.<String>} granularities
 */
CalculatedPullRequestMetrics.prototype['granularities'] = undefined;






export default CalculatedPullRequestMetrics;

