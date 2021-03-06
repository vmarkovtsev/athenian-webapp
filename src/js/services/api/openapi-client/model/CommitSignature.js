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

/**
 * The CommitSignature model module.
 * @module model/CommitSignature
 * @version 1.0.49
 */
class CommitSignature {
    /**
     * Constructs a new <code>CommitSignature</code>.
     * Git commit signature. It is guaranteed that &#x60;login&#x60; and/or &#x60;name&#x60;&amp;&#x60;email&#x60; are present.
     * @alias module:model/CommitSignature
     * @param timestamp {Date} When the corresponding action happened in UTC.
     * @param timezone {Number} Timezone offset of the action timestamp (in hours).
     */
    constructor(timestamp, timezone) { 
        
        CommitSignature.initialize(this, timestamp, timezone);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, timestamp, timezone) { 
        obj['timestamp'] = timestamp;
        obj['timezone'] = timezone;
    }

    /**
     * Constructs a <code>CommitSignature</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CommitSignature} obj Optional instance to populate.
     * @return {module:model/CommitSignature} The populated <code>CommitSignature</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CommitSignature();

            if (data.hasOwnProperty('login')) {
                obj['login'] = ApiClient.convertToType(data['login'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('timestamp')) {
                obj['timestamp'] = ApiClient.convertToType(data['timestamp'], 'Date');
            }
            if (data.hasOwnProperty('timezone')) {
                obj['timezone'] = ApiClient.convertToType(data['timezone'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * User name which uniquely identifies any developer on any service provider. The format matches the profile URL without the protocol part. 
 * @member {String} login
 */
CommitSignature.prototype['login'] = undefined;

/**
 * Git signature name.
 * @member {String} name
 */
CommitSignature.prototype['name'] = undefined;

/**
 * Git signature email.
 * @member {String} email
 */
CommitSignature.prototype['email'] = undefined;

/**
 * When the corresponding action happened in UTC.
 * @member {Date} timestamp
 */
CommitSignature.prototype['timestamp'] = undefined;

/**
 * Timezone offset of the action timestamp (in hours).
 * @member {Number} timezone
 */
CommitSignature.prototype['timezone'] = undefined;






export default CommitSignature;

