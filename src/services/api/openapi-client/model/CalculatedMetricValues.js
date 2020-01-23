/**
 * Athenian Dashboard API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The CalculatedMetricValues model module.
 * @module model/CalculatedMetricValues
 * @version 1.0.0
 */
class CalculatedMetricValues {
    /**
     * Constructs a new <code>CalculatedMetricValues</code>.
     * @alias module:model/CalculatedMetricValues
     * @param _date {Date} Where you should relate the metric value to on the time axis.
     * @param values {Array.<Number>} The same order as `metrics`.
     * @param confidenceScores {Array.<Number>} Confidence score from 0 (no idea) to 100 (very confident). The same order as `metrics`.
     */
    constructor(_date, values, confidenceScores) { 
        
        CalculatedMetricValues.initialize(this, _date, values, confidenceScores);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, _date, values, confidenceScores) { 
        obj['date'] = _date;
        obj['values'] = values;
        obj['confidence_scores'] = confidenceScores;
    }

    /**
     * Constructs a <code>CalculatedMetricValues</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CalculatedMetricValues} obj Optional instance to populate.
     * @return {module:model/CalculatedMetricValues} The populated <code>CalculatedMetricValues</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CalculatedMetricValues();

            if (data.hasOwnProperty('date')) {
                obj['date'] = ApiClient.convertToType(data['date'], 'Date');
            }
            if (data.hasOwnProperty('values')) {
                obj['values'] = ApiClient.convertToType(data['values'], ['Number']);
            }
            if (data.hasOwnProperty('confidence_mins')) {
                obj['confidence_mins'] = ApiClient.convertToType(data['confidence_mins'], ['Number']);
            }
            if (data.hasOwnProperty('confidence_maxs')) {
                obj['confidence_maxs'] = ApiClient.convertToType(data['confidence_maxs'], ['Number']);
            }
            if (data.hasOwnProperty('confidence_scores')) {
                obj['confidence_scores'] = ApiClient.convertToType(data['confidence_scores'], ['Number']);
            }
        }
        return obj;
    }


}

/**
 * Where you should relate the metric value to on the time axis.
 * @member {Date} date
 */
CalculatedMetricValues.prototype['date'] = undefined;

/**
 * The same order as `metrics`.
 * @member {Array.<Number>} values
 */
CalculatedMetricValues.prototype['values'] = undefined;

/**
 * Confidence interval @ p=0.95, minimum. The same order as `metrics`. It is optional because there can be exact metrics like \"count open PRs per month\".
 * @member {Array.<Number>} confidence_mins
 */
CalculatedMetricValues.prototype['confidence_mins'] = undefined;

/**
 * Confidence interval @ p=0.95, maximum. The same order as `metrics`. It is optional because there can be exact metrics like \"count open PRs per month\".
 * @member {Array.<Number>} confidence_maxs
 */
CalculatedMetricValues.prototype['confidence_maxs'] = undefined;

/**
 * Confidence score from 0 (no idea) to 100 (very confident). The same order as `metrics`.
 * @member {Array.<Number>} confidence_scores
 */
CalculatedMetricValues.prototype['confidence_scores'] = undefined;






export default CalculatedMetricValues;

