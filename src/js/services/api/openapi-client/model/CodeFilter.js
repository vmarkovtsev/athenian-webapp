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
 * The CodeFilter model module.
 * @module model/CodeFilter
 * @version 1.0.49
 */
class CodeFilter {
    /**
     * Constructs a new <code>CodeFilter</code>.
     * Filter for revealing code bypassing PRs.
     * @alias module:model/CodeFilter
     * @param account {Number} Session account ID.
     * @param dateFrom {Date} Commits must be made later than or equal to this date.
     * @param dateTo {Date} Commits must be made earlier than or equal to this date.
     * @param _in {Array.<String>} A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
     * @param granularity {String} How often the metrics are reported. The value must satisfy the following regular expression: /^(([1-9]\\d* )?(day|week|month|year)|all)$/. \"all\" produces a single interval [`date_from`, `date_to`].
     */
    constructor(account, dateFrom, dateTo, _in, granularity) { 
        
        CodeFilter.initialize(this, account, dateFrom, dateTo, _in, granularity);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, account, dateFrom, dateTo, _in, granularity) { 
        obj['account'] = account;
        obj['date_from'] = dateFrom;
        obj['date_to'] = dateTo;
        obj['in'] = _in;
        obj['granularity'] = granularity;
    }

    /**
     * Constructs a <code>CodeFilter</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CodeFilter} obj Optional instance to populate.
     * @return {module:model/CodeFilter} The populated <code>CodeFilter</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CodeFilter();

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
            if (data.hasOwnProperty('with_author')) {
                obj['with_author'] = ApiClient.convertToType(data['with_author'], ['String']);
            }
            if (data.hasOwnProperty('with_committer')) {
                obj['with_committer'] = ApiClient.convertToType(data['with_committer'], ['String']);
            }
            if (data.hasOwnProperty('granularity')) {
                obj['granularity'] = ApiClient.convertToType(data['granularity'], 'String');
            }
        }
        return obj;
    }


}

/**
 * Session account ID.
 * @member {Number} account
 */
CodeFilter.prototype['account'] = undefined;

/**
 * Commits must be made later than or equal to this date.
 * @member {Date} date_from
 */
CodeFilter.prototype['date_from'] = undefined;

/**
 * Commits must be made earlier than or equal to this date.
 * @member {Date} date_to
 */
CodeFilter.prototype['date_to'] = undefined;

/**
 * Local time zone offset in minutes, used to adjust `date_from` and `date_to`.
 * @member {Number} timezone
 */
CodeFilter.prototype['timezone'] = undefined;

/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} in
 */
CodeFilter.prototype['in'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} with_author
 */
CodeFilter.prototype['with_author'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} with_committer
 */
CodeFilter.prototype['with_committer'] = undefined;

/**
 * How often the metrics are reported. The value must satisfy the following regular expression: /^(([1-9]\\d* )?(day|week|month|year)|all)$/. \"all\" produces a single interval [`date_from`, `date_to`].
 * @member {String} granularity
 */
CodeFilter.prototype['granularity'] = undefined;






export default CodeFilter;

