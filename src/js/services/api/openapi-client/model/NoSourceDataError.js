/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.9
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import GenericError from './GenericError';
import NoSourceDataErrorAllOf from './NoSourceDataErrorAllOf';

/**
 * The NoSourceDataError model module.
 * @module model/NoSourceDataError
 * @version 1.0.9
 */
class NoSourceDataError {
    /**
     * Constructs a new <code>NoSourceDataError</code>.
     * @alias module:model/NoSourceDataError
     * @implements module:model/GenericError
     * @implements module:model/NoSourceDataErrorAllOf
     * @param type {String} URI reference that identifies the problem type (RFC 7807).
     * @param title {String} Short, human-readable summary of the problem type.
     */
    constructor(type, title) { 
        GenericError.initialize(this, type, title);NoSourceDataErrorAllOf.initialize(this);
        NoSourceDataError.initialize(this, type, title);
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
     * Constructs a <code>NoSourceDataError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NoSourceDataError} obj Optional instance to populate.
     * @return {module:model/NoSourceDataError} The populated <code>NoSourceDataError</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new NoSourceDataError();
            GenericError.constructFromObject(data, obj);
            NoSourceDataErrorAllOf.constructFromObject(data, obj);

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
            if (data.hasOwnProperty('repositories')) {
                obj['repositories'] = ApiClient.convertToType(data['repositories'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * URI reference that identifies the problem type (RFC 7807).
 * @member {String} type
 */
NoSourceDataError.prototype['type'] = undefined;

/**
 * Short, human-readable summary of the problem type.
 * @member {String} title
 */
NoSourceDataError.prototype['title'] = undefined;

/**
 * Duplicated HTTP status code.
 * @member {Number} status
 */
NoSourceDataError.prototype['status'] = undefined;

/**
 * Human-readable explanation specific to this occurrence of the problem.
 * @member {String} detail
 */
NoSourceDataError.prototype['detail'] = undefined;

/**
 * URI reference that identifies the specific occurrence of the problem.
 * @member {String} instance
 */
NoSourceDataError.prototype['instance'] = undefined;

/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} repositories
 */
NoSourceDataError.prototype['repositories'] = undefined;


// Implement GenericError interface:
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
// Implement NoSourceDataErrorAllOf interface:
/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} repositories
 */
NoSourceDataErrorAllOf.prototype['repositories'] = undefined;




export default NoSourceDataError;

