/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.26
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import ForSet from './ForSet';

/**
 * The CalculatedDeveloperMetricsItem model module.
 * @module model/CalculatedDeveloperMetricsItem
 * @version 1.0.26
 */
class CalculatedDeveloperMetricsItem {
    /**
     * Constructs a new <code>CalculatedDeveloperMetricsItem</code>.
     * Measured developer metrics for each &#x60;DeveloperMetricsRequest.for&#x60;.
     * @alias module:model/CalculatedDeveloperMetricsItem
     * @param _for {module:model/ForSet} 
     * @param values {Array.<Array.<Number>>} The sequence matches `CalculatedDeveloperMetricsItem.for.developers`.
     */
    constructor(_for, values) { 
        
        CalculatedDeveloperMetricsItem.initialize(this, _for, values);
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
     * Constructs a <code>CalculatedDeveloperMetricsItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CalculatedDeveloperMetricsItem} obj Optional instance to populate.
     * @return {module:model/CalculatedDeveloperMetricsItem} The populated <code>CalculatedDeveloperMetricsItem</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CalculatedDeveloperMetricsItem();

            if (data.hasOwnProperty('for')) {
                obj['for'] = ForSet.constructFromObject(data['for']);
            }
            if (data.hasOwnProperty('values')) {
                obj['values'] = ApiClient.convertToType(data['values'], [Array]);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/ForSet} for
 */
CalculatedDeveloperMetricsItem.prototype['for'] = undefined;

/**
 * The sequence matches `CalculatedDeveloperMetricsItem.for.developers`.
 * @member {Array.<Array.<Number>>} values
 */
CalculatedDeveloperMetricsItem.prototype['values'] = undefined;






export default CalculatedDeveloperMetricsItem;

