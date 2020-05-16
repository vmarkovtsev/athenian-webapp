/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.41
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import CalculatedPullRequestMetricValues from './CalculatedPullRequestMetricValues';
import ForSet from './ForSet';

/**
 * The CalculatedPullRequestMetricsItem model module.
 * @module model/CalculatedPullRequestMetricsItem
 * @version 1.0.41
 */
class CalculatedPullRequestMetricsItem {
    /**
     * Constructs a new <code>CalculatedPullRequestMetricsItem</code>.
     * Series of calculated metrics for a specific set of repositories and developers.
     * @alias module:model/CalculatedPullRequestMetricsItem
     * @param _for {module:model/ForSet} 
     * @param values {Array.<module:model/CalculatedPullRequestMetricValues>} 
     */
    constructor(_for, values) { 
        
        CalculatedPullRequestMetricsItem.initialize(this, _for, values);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, _for, values) { 
        obj['for'] = _for;
        obj['values'] = values;
    }

    /**
     * Constructs a <code>CalculatedPullRequestMetricsItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CalculatedPullRequestMetricsItem} obj Optional instance to populate.
     * @return {module:model/CalculatedPullRequestMetricsItem} The populated <code>CalculatedPullRequestMetricsItem</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CalculatedPullRequestMetricsItem();

            if (data.hasOwnProperty('for')) {
                obj['for'] = ForSet.constructFromObject(data['for']);
            }
            if (data.hasOwnProperty('granularity')) {
                obj['granularity'] = ApiClient.convertToType(data['granularity'], 'String');
            }
            if (data.hasOwnProperty('values')) {
                obj['values'] = ApiClient.convertToType(data['values'], [CalculatedPullRequestMetricValues]);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/ForSet} for
 */
CalculatedPullRequestMetricsItem.prototype['for'] = undefined;

/**
 * How often the metrics are reported. The value must satisfy the following regular expression: /^(([1-9]\\d* )?(day|week|month|year)|all)$/. \"all\" produces a single interval [`date_from`, `date_to`].
 * @member {String} granularity
 */
CalculatedPullRequestMetricsItem.prototype['granularity'] = undefined;

/**
 * @member {Array.<module:model/CalculatedPullRequestMetricValues>} values
 */
CalculatedPullRequestMetricsItem.prototype['values'] = undefined;






export default CalculatedPullRequestMetricsItem;

