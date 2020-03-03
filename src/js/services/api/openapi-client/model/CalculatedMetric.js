/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.5
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import CalculatedMetricValues from './CalculatedMetricValues';
import ForSet from './ForSet';

/**
 * The CalculatedMetric model module.
 * @module model/CalculatedMetric
 * @version 1.0.5
 */
class CalculatedMetric {
    /**
     * Constructs a new <code>CalculatedMetric</code>.
     * Series of calculated metrics for a specific set of repositories and developers.
     * @alias module:model/CalculatedMetric
     * @param _for {module:model/ForSet} 
     * @param values {Array.<module:model/CalculatedMetricValues>} 
     */
    constructor(_for, values) { 
        
        CalculatedMetric.initialize(this, _for, values);
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
     * Constructs a <code>CalculatedMetric</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CalculatedMetric} obj Optional instance to populate.
     * @return {module:model/CalculatedMetric} The populated <code>CalculatedMetric</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CalculatedMetric();

            if (data.hasOwnProperty('for')) {
                obj['for'] = ForSet.constructFromObject(data['for']);
            }
            if (data.hasOwnProperty('values')) {
                obj['values'] = ApiClient.convertToType(data['values'], [CalculatedMetricValues]);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/ForSet} for
 */
CalculatedMetric.prototype['for'] = undefined;

/**
 * @member {Array.<module:model/CalculatedMetricValues>} values
 */
CalculatedMetric.prototype['values'] = undefined;






export default CalculatedMetric;

