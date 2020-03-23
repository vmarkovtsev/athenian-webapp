/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.11
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import ForSet from './ForSet';
import MetricID from './MetricID';

/**
 * The PullRequestMetricsRequest model module.
 * @module model/PullRequestMetricsRequest
 * @version 1.0.11
 */
class PullRequestMetricsRequest {
    /**
     * Constructs a new <code>PullRequestMetricsRequest</code>.
     * Request for calculating metrics on top of pull requests data.
     * @alias module:model/PullRequestMetricsRequest
     * @param _for {Array.<module:model/ForSet>} Sets of developers and repositories to calculate the metrics for.
     * @param metrics {Array.<module:model/MetricID>} Requested metric identifiers.
     * @param dateFrom {Date} Date from when to start measuring the metrics.
     * @param dateTo {Date} Date up to which to measure the metrics.
     * @param granularity {String} How often the metrics are reported. The value must satisfy the following regular expression: (^([1-9]\\d* )?(day|week|month|year)$
     * @param account {Number} Session account ID.
     */
    constructor(_for, metrics, dateFrom, dateTo, granularity, account) { 
        
        PullRequestMetricsRequest.initialize(this, _for, metrics, dateFrom, dateTo, granularity, account);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, _for, metrics, dateFrom, dateTo, granularity, account) { 
        obj['for'] = _for;
        obj['metrics'] = metrics;
        obj['date_from'] = dateFrom;
        obj['date_to'] = dateTo;
        obj['granularity'] = granularity;
        obj['account'] = account;
    }

    /**
     * Constructs a <code>PullRequestMetricsRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PullRequestMetricsRequest} obj Optional instance to populate.
     * @return {module:model/PullRequestMetricsRequest} The populated <code>PullRequestMetricsRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PullRequestMetricsRequest();

            if (data.hasOwnProperty('for')) {
                obj['for'] = ApiClient.convertToType(data['for'], [ForSet]);
            }
            if (data.hasOwnProperty('metrics')) {
                obj['metrics'] = ApiClient.convertToType(data['metrics'], [MetricID]);
            }
            if (data.hasOwnProperty('date_from')) {
                obj['date_from'] = ApiClient.convertToType(data['date_from'], 'Date');
            }
            if (data.hasOwnProperty('date_to')) {
                obj['date_to'] = ApiClient.convertToType(data['date_to'], 'Date');
            }
            if (data.hasOwnProperty('granularity')) {
                obj['granularity'] = ApiClient.convertToType(data['granularity'], 'String');
            }
            if (data.hasOwnProperty('account')) {
                obj['account'] = ApiClient.convertToType(data['account'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * Sets of developers and repositories to calculate the metrics for.
 * @member {Array.<module:model/ForSet>} for
 */
PullRequestMetricsRequest.prototype['for'] = undefined;

/**
 * Requested metric identifiers.
 * @member {Array.<module:model/MetricID>} metrics
 */
PullRequestMetricsRequest.prototype['metrics'] = undefined;

/**
 * Date from when to start measuring the metrics.
 * @member {Date} date_from
 */
PullRequestMetricsRequest.prototype['date_from'] = undefined;

/**
 * Date up to which to measure the metrics.
 * @member {Date} date_to
 */
PullRequestMetricsRequest.prototype['date_to'] = undefined;

/**
 * How often the metrics are reported. The value must satisfy the following regular expression: (^([1-9]\\d* )?(day|week|month|year)$
 * @member {String} granularity
 */
PullRequestMetricsRequest.prototype['granularity'] = undefined;

/**
 * Session account ID.
 * @member {Number} account
 */
PullRequestMetricsRequest.prototype['account'] = undefined;






export default PullRequestMetricsRequest;

