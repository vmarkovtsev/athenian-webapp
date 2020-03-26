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
 * The FilterContribsOrReposRequest model module.
 * @module model/FilterContribsOrReposRequest
 * @version 1.0.16
 */
class FilterContribsOrReposRequest {
    /**
     * Constructs a new <code>FilterContribsOrReposRequest</code>.
     * PR filters for /filter/contributors and /filter/repositories.
     * @alias module:model/FilterContribsOrReposRequest
     * @param account {Number} Session account ID.
     * @param dateFrom {Date} Updates must be later than or equal to this date. An update is any action that influences the stage assignment.
     * @param dateTo {Date} Updates must be earlier than or equal to this date. An update is any action that influences the stage assignment.
     */
    constructor(account, dateFrom, dateTo) { 
        
        FilterContribsOrReposRequest.initialize(this, account, dateFrom, dateTo);
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
     * Constructs a <code>FilterContribsOrReposRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FilterContribsOrReposRequest} obj Optional instance to populate.
     * @return {module:model/FilterContribsOrReposRequest} The populated <code>FilterContribsOrReposRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new FilterContribsOrReposRequest();

            if (data.hasOwnProperty('account')) {
                obj['account'] = ApiClient.convertToType(data['account'], 'Number');
            }
            if (data.hasOwnProperty('date_from')) {
                obj['date_from'] = ApiClient.convertToType(data['date_from'], 'Date');
            }
            if (data.hasOwnProperty('date_to')) {
                obj['date_to'] = ApiClient.convertToType(data['date_to'], 'Date');
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
FilterContribsOrReposRequest.prototype['account'] = undefined;

/**
 * Updates must be later than or equal to this date. An update is any action that influences the stage assignment.
 * @member {Date} date_from
 */
FilterContribsOrReposRequest.prototype['date_from'] = undefined;

/**
 * Updates must be earlier than or equal to this date. An update is any action that influences the stage assignment.
 * @member {Date} date_to
 */
FilterContribsOrReposRequest.prototype['date_to'] = undefined;

/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} in
 */
FilterContribsOrReposRequest.prototype['in'] = undefined;






export default FilterContribsOrReposRequest;

