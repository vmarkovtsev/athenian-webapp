/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.36
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The InvalidRequestErrorAllOf model module.
 * @module model/InvalidRequestErrorAllOf
 * @version 1.0.36
 */
class InvalidRequestErrorAllOf {
    /**
     * Constructs a new <code>InvalidRequestErrorAllOf</code>.
     * @alias module:model/InvalidRequestErrorAllOf
     */
    constructor() { 
        
        InvalidRequestErrorAllOf.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>InvalidRequestErrorAllOf</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InvalidRequestErrorAllOf} obj Optional instance to populate.
     * @return {module:model/InvalidRequestErrorAllOf} The populated <code>InvalidRequestErrorAllOf</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InvalidRequestErrorAllOf();

            if (data.hasOwnProperty('pointer')) {
                obj['pointer'] = ApiClient.convertToType(data['pointer'], 'String');
            }
        }
        return obj;
    }


}

/**
 * Path to the offending request item.
 * @member {String} pointer
 */
InvalidRequestErrorAllOf.prototype['pointer'] = undefined;






export default InvalidRequestErrorAllOf;

