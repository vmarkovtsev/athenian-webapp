/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.27
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The GenericError model module.
 * @module model/GenericError
 * @version 1.0.27
 */
class GenericError {
    /**
     * Constructs a new <code>GenericError</code>.
     * @alias module:model/GenericError
     * @param type {String} URI reference that identifies the problem type (RFC 7807).
     * @param title {String} Short, human-readable summary of the problem type.
     */
    constructor(type, title) { 
        
        GenericError.initialize(this, type, title);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type, title) { 
        obj['type'] = type;
        obj['title'] = title;
    }

    /**
     * Constructs a <code>GenericError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/GenericError} obj Optional instance to populate.
     * @return {module:model/GenericError} The populated <code>GenericError</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new GenericError();

            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('title')) {
                obj['title'] = ApiClient.convertToType(data['title'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'Number');
            }
            if (data.hasOwnProperty('detail')) {
                obj['detail'] = ApiClient.convertToType(data['detail'], 'String');
            }
            if (data.hasOwnProperty('instance')) {
                obj['instance'] = ApiClient.convertToType(data['instance'], 'String');
            }
        }
        return obj;
    }


}

/**
 * URI reference that identifies the problem type (RFC 7807).
 * @member {String} type
 */
GenericError.prototype['type'] = undefined;

/**
 * Short, human-readable summary of the problem type.
 * @member {String} title
 */
GenericError.prototype['title'] = undefined;

/**
 * Duplicated HTTP status code.
 * @member {Number} status
 */
GenericError.prototype['status'] = undefined;

/**
 * Human-readable explanation specific to this occurrence of the problem.
 * @member {String} detail
 */
GenericError.prototype['detail'] = undefined;

/**
 * URI reference that identifies the specific occurrence of the problem.
 * @member {String} instance
 */
GenericError.prototype['instance'] = undefined;






export default GenericError;

