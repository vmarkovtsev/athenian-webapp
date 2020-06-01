/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.48
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The GenericFilterRequest model module.
 * @module model/GenericFilterRequest
 * @version 1.0.48
 */
class GenericFilterRequest {
    /**
     * Constructs a new <code>GenericFilterRequest</code>.
     * PR filters for &#x60;/filter/contributors&#x60;, &#x60;/filter/repositories&#x60;, &#x60;/filter/releases&#x60;.
     * @alias module:model/GenericFilterRequest
     * @param account {Number} Session account ID.
     * @param dateFrom {Date} Updates must be later than or equal to this date. An update is any action that influences the stage assignment.
     * @param dateTo {Date} Updates must be earlier than or equal to this date. An update is any action that influences the stage assignment.
     */
    constructor(account, dateFrom, dateTo) { 
        
        GenericFilterRequest.initialize(this, account, dateFrom, dateTo);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, account, dateFrom, dateTo) { 
        obj['account'] = account;
        obj['date_from'] = dateFrom;
        obj['date_to'] = dateTo;
    }

    /**
     * Constructs a <code>GenericFilterRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/GenericFilterRequest} obj Optional instance to populate.
     * @return {module:model/GenericFilterRequest} The populated <code>GenericFilterRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new GenericFilterRequest();

            if (data.hasOwnProperty('account')) {
                obj['account'] = ApiClient.convertToType(data['account'], 'Number');
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
            if (data.hasOwnProperty('in')) {
                obj['in'] = ApiClient.convertToType(data['in'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * Session account ID.
 * @member {Number} account
 */
GenericFilterRequest.prototype['account'] = undefined;

/**
 * Updates must be later than or equal to this date. An update is any action that influences the stage assignment.
 * @member {Date} date_from
 */
GenericFilterRequest.prototype['date_from'] = undefined;

/**
 * Updates must be earlier than or equal to this date. An update is any action that influences the stage assignment.
 * @member {Date} date_to
 */
GenericFilterRequest.prototype['date_to'] = undefined;

/**
 * Local time zone offset in minutes, used to adjust `date_from` and `date_to`.
 * @member {Number} timezone
 */
GenericFilterRequest.prototype['timezone'] = undefined;

/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} in
 */
GenericFilterRequest.prototype['in'] = undefined;






export default GenericFilterRequest;

