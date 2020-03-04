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
import CommitFilter from './CommitFilter';
import FilterCommitsRequestAllOf from './FilterCommitsRequestAllOf';

/**
 * The FilterCommitsRequest model module.
 * @module model/FilterCommitsRequest
 * @version 1.0.5
 */
class FilterCommitsRequest {
    /**
     * Constructs a new <code>FilterCommitsRequest</code>.
     * Filter for listing commits.
     * @alias module:model/FilterCommitsRequest
     * @implements module:model/CommitFilter
     * @implements module:model/FilterCommitsRequestAllOf
     * @param account {Number} Session account ID.
     * @param dateFrom {Date} Commits must be made later than or equal to this date.
     * @param dateTo {Date} Commits must be made earlier than or equal to this date.
     * @param granularity {String} How often the metrics are reported. The value must satisfy the following regular expression: (^([1-9]\\d* )?(day|week|month|year)$
     * @param _in {Array.<String>} A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
     * @param property {module:model/FilterCommitsRequest.PropertyEnum} Main trait of the commits - the core of the filter.
     */
    constructor(account, dateFrom, dateTo, granularity, _in, property) { 
        CommitFilter.initialize(this, account, dateFrom, dateTo, granularity, _in);FilterCommitsRequestAllOf.initialize(this, property);
        FilterCommitsRequest.initialize(this, account, dateFrom, dateTo, granularity, _in, property);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, account, dateFrom, dateTo, granularity, _in, property) { 
        obj['account'] = account;
        obj['date_from'] = dateFrom;
        obj['date_to'] = dateTo;
        obj['granularity'] = granularity;
        obj['in'] = _in;
        obj['property'] = property;
    }

    /**
     * Constructs a <code>FilterCommitsRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FilterCommitsRequest} obj Optional instance to populate.
     * @return {module:model/FilterCommitsRequest} The populated <code>FilterCommitsRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new FilterCommitsRequest();
            CommitFilter.constructFromObject(data, obj);
            FilterCommitsRequestAllOf.constructFromObject(data, obj);

            if (data.hasOwnProperty('account')) {
                obj['account'] = ApiClient.convertToType(data['account'], 'Number');
            }
            if (data.hasOwnProperty('date_from')) {
                obj['date_from'] = ApiClient.convertToType(data['date_from'], 'Date');
            }
            if (data.hasOwnProperty('date_to')) {
                obj['date_to'] = ApiClient.convertToType(data['date_to'], 'Date');
            }
            if (data.hasOwnProperty('granularity')) {
                obj['granularity'] = ApiClient.convertToType(data['granularity'], 'String');
            }
            if (data.hasOwnProperty('in')) {
                obj['in'] = ApiClient.convertToType(data['in'], ['String']);
            }
            if (data.hasOwnProperty('with_author')) {
                obj['with_author'] = ApiClient.convertToType(data['with_author'], ['String']);
            }
            if (data.hasOwnProperty('with_committer')) {
                obj['with_committer'] = ApiClient.convertToType(data['with_committer'], ['String']);
            }
            if (data.hasOwnProperty('property')) {
                obj['property'] = ApiClient.convertToType(data['property'], 'String');
            }
        }
        return obj;
    }


}

/**
 * Session account ID.
 * @member {Number} account
 */
FilterCommitsRequest.prototype['account'] = undefined;

/**
 * Commits must be made later than or equal to this date.
 * @member {Date} date_from
 */
FilterCommitsRequest.prototype['date_from'] = undefined;

/**
 * Commits must be made earlier than or equal to this date.
 * @member {Date} date_to
 */
FilterCommitsRequest.prototype['date_to'] = undefined;

/**
 * How often the metrics are reported. The value must satisfy the following regular expression: (^([1-9]\\d* )?(day|week|month|year)$
 * @member {String} granularity
 */
FilterCommitsRequest.prototype['granularity'] = undefined;

/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} in
 */
FilterCommitsRequest.prototype['in'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} with_author
 */
FilterCommitsRequest.prototype['with_author'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} with_committer
 */
FilterCommitsRequest.prototype['with_committer'] = undefined;

/**
 * Main trait of the commits - the core of the filter.
 * @member {module:model/FilterCommitsRequest.PropertyEnum} property
 */
FilterCommitsRequest.prototype['property'] = undefined;


// Implement CommitFilter interface:
/**
 * Session account ID.
 * @member {Number} account
 */
CommitFilter.prototype['account'] = undefined;
/**
 * Commits must be made later than or equal to this date.
 * @member {Date} date_from
 */
CommitFilter.prototype['date_from'] = undefined;
/**
 * Commits must be made earlier than or equal to this date.
 * @member {Date} date_to
 */
CommitFilter.prototype['date_to'] = undefined;
/**
 * How often the metrics are reported. The value must satisfy the following regular expression: (^([1-9]\\d* )?(day|week|month|year)$
 * @member {String} granularity
 */
CommitFilter.prototype['granularity'] = undefined;
/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} in
 */
CommitFilter.prototype['in'] = undefined;
/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} with_author
 */
CommitFilter.prototype['with_author'] = undefined;
/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} with_committer
 */
CommitFilter.prototype['with_committer'] = undefined;
// Implement FilterCommitsRequestAllOf interface:
/**
 * Main trait of the commits - the core of the filter.
 * @member {module:model/FilterCommitsRequestAllOf.PropertyEnum} property
 */
FilterCommitsRequestAllOf.prototype['property'] = undefined;



/**
 * Allowed values for the <code>property</code> property.
 * @enum {String}
 * @readonly
 */
FilterCommitsRequest['PropertyEnum'] = {

    /**
     * value: "bypassing_prs"
     * @const
     */
    "bypassing_prs": "bypassing_prs"
};



export default FilterCommitsRequest;
