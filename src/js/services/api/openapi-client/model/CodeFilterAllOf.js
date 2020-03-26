/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.16
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The CodeFilterAllOf model module.
 * @module model/CodeFilterAllOf
 * @version 1.0.16
 */
class CodeFilterAllOf {
    /**
     * Constructs a new <code>CodeFilterAllOf</code>.
     * @alias module:model/CodeFilterAllOf
     * @param granularity {String} How often the metrics are reported. The value must satisfy the following regular expression: /^(([1-9]\\d* )?(day|week|month|year)|all)$/. \"all\" produces a single interval [`date_from`, `date_to`].
     */
    constructor(granularity) { 
        
        CodeFilterAllOf.initialize(this, granularity);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, granularity) { 
        obj['granularity'] = granularity;
    }

    /**
     * Constructs a <code>CodeFilterAllOf</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CodeFilterAllOf} obj Optional instance to populate.
     * @return {module:model/CodeFilterAllOf} The populated <code>CodeFilterAllOf</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CodeFilterAllOf();

            if (data.hasOwnProperty('granularity')) {
                obj['granularity'] = ApiClient.convertToType(data['granularity'], 'String');
            }
        }
        return obj;
    }


}

/**
 * How often the metrics are reported. The value must satisfy the following regular expression: /^(([1-9]\\d* )?(day|week|month|year)|all)$/. \"all\" produces a single interval [`date_from`, `date_to`].
 * @member {String} granularity
 */
CodeFilterAllOf.prototype['granularity'] = undefined;






export default CodeFilterAllOf;

