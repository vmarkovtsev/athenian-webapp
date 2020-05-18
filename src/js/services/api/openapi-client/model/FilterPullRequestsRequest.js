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
import PullRequestProperty from './PullRequestProperty';
import PullRequestWith from './PullRequestWith';

/**
 * The FilterPullRequestsRequest model module.
 * @module model/FilterPullRequestsRequest
 * @version 1.0.41
 */
class FilterPullRequestsRequest {
    /**
     * Constructs a new <code>FilterPullRequestsRequest</code>.
     * Filters for &#x60;/filter/pull_requests&#x60;. Empty &#x60;properties&#x60; passes through all PRs matched by the other filters.
     * @alias module:model/FilterPullRequestsRequest
     * @param account {Number} Session account ID.
     * @param dateFrom {Date} PRs must be updated later than or equal to this date.
     * @param dateTo {Date} PRs must be updated earlier than or equal to this date.
     * @param _in {Array.<String>} A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
     */
    constructor(account, dateFrom, dateTo, _in) { 
        
        FilterPullRequestsRequest.initialize(this, account, dateFrom, dateTo, _in);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, account, dateFrom, dateTo, _in) { 
        obj['account'] = account;
        obj['date_from'] = dateFrom;
        obj['date_to'] = dateTo;
        obj['in'] = _in;
    }

    /**
     * Constructs a <code>FilterPullRequestsRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FilterPullRequestsRequest} obj Optional instance to populate.
     * @return {module:model/FilterPullRequestsRequest} The populated <code>FilterPullRequestsRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new FilterPullRequestsRequest();

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
            if (data.hasOwnProperty('properties')) {
                obj['properties'] = ApiClient.convertToType(data['properties'], [PullRequestProperty]);
            }
            if (data.hasOwnProperty('with')) {
                obj['with'] = PullRequestWith.constructFromObject(data['with']);
            }
        }
        return obj;
    }


}

/**
 * Session account ID.
 * @member {Number} account
 */
FilterPullRequestsRequest.prototype['account'] = undefined;

/**
 * PRs must be updated later than or equal to this date.
 * @member {Date} date_from
 */
FilterPullRequestsRequest.prototype['date_from'] = undefined;

/**
 * PRs must be updated earlier than or equal to this date.
 * @member {Date} date_to
 */
FilterPullRequestsRequest.prototype['date_to'] = undefined;

/**
 * Local time zone offset in minutes, used to adjust `date_from` and `date_to`.
 * @member {Number} timezone
 */
FilterPullRequestsRequest.prototype['timezone'] = undefined;

/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} in
 */
FilterPullRequestsRequest.prototype['in'] = undefined;

/**
 * @member {Array.<module:model/PullRequestProperty>} properties
 */
FilterPullRequestsRequest.prototype['properties'] = undefined;

/**
 * @member {module:model/PullRequestWith} with
 */
FilterPullRequestsRequest.prototype['with'] = undefined;






export default FilterPullRequestsRequest;

