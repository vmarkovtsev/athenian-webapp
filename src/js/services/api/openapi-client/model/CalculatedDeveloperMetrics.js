/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.49
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import CalculatedDeveloperMetricsItem from './CalculatedDeveloperMetricsItem';
import DeveloperMetricID from './DeveloperMetricID';

/**
 * The CalculatedDeveloperMetrics model module.
 * @module model/CalculatedDeveloperMetrics
 * @version 1.0.49
 */
class CalculatedDeveloperMetrics {
    /**
     * Constructs a new <code>CalculatedDeveloperMetrics</code>.
     * Response from /metrics/developers - calculated metrics over developer activities.
     * @alias module:model/CalculatedDeveloperMetrics
     * @param calculated {Array.<module:model/CalculatedDeveloperMetricsItem>} Values of the requested metrics on the given time interval.
     * @param dateFrom {Date} Repeats `DeveloperMetricsRequest.date_from`.
     * @param dateTo {Date} Repeats `DeveloperMetricsRequest.date_to`.
     * @param metrics {Array.<module:model/DeveloperMetricID>} Repeats `DeveloperMetricsRequest.metrics`.
     */
    constructor(calculated, dateFrom, dateTo, metrics) { 
        
        CalculatedDeveloperMetrics.initialize(this, calculated, dateFrom, dateTo, metrics);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, calculated, dateFrom, dateTo, metrics) { 
        obj['calculated'] = calculated;
        obj['date_from'] = dateFrom;
        obj['date_to'] = dateTo;
        obj['metrics'] = metrics;
    }

    /**
     * Constructs a <code>CalculatedDeveloperMetrics</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CalculatedDeveloperMetrics} obj Optional instance to populate.
     * @return {module:model/CalculatedDeveloperMetrics} The populated <code>CalculatedDeveloperMetrics</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CalculatedDeveloperMetrics();

            if (data.hasOwnProperty('calculated')) {
                obj['calculated'] = ApiClient.convertToType(data['calculated'], [CalculatedDeveloperMetricsItem]);
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
            if (data.hasOwnProperty('metrics')) {
                obj['metrics'] = ApiClient.convertToType(data['metrics'], [DeveloperMetricID]);
            }
        }
        return obj;
    }


}

/**
 * Values of the requested metrics on the given time interval.
 * @member {Array.<module:model/CalculatedDeveloperMetricsItem>} calculated
 */
CalculatedDeveloperMetrics.prototype['calculated'] = undefined;

/**
 * Repeats `DeveloperMetricsRequest.date_from`.
 * @member {Date} date_from
 */
CalculatedDeveloperMetrics.prototype['date_from'] = undefined;

/**
 * Repeats `DeveloperMetricsRequest.date_to`.
 * @member {Date} date_to
 */
CalculatedDeveloperMetrics.prototype['date_to'] = undefined;

/**
 * Repeats `DeveloperMetricsRequest.timezone`.
 * @member {Number} timezone
 */
CalculatedDeveloperMetrics.prototype['timezone'] = undefined;

/**
 * Repeats `DeveloperMetricsRequest.metrics`.
 * @member {Array.<module:model/DeveloperMetricID>} metrics
 */
CalculatedDeveloperMetrics.prototype['metrics'] = undefined;






export default CalculatedDeveloperMetrics;

