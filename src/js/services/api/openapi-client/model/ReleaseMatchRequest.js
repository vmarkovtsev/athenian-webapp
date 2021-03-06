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
import ReleaseMatchStrategy from './ReleaseMatchStrategy';

/**
 * The ReleaseMatchRequest model module.
 * @module model/ReleaseMatchRequest
 * @version 1.0.49
 */
class ReleaseMatchRequest {
    /**
     * Constructs a new <code>ReleaseMatchRequest</code>.
     * Release matching rule setting.
     * @alias module:model/ReleaseMatchRequest
     * @param account {Number} 
     * @param repositories {Array.<String>} A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
     * @param match {module:model/ReleaseMatchStrategy} 
     */
    constructor(account, repositories, match) { 
        
        ReleaseMatchRequest.initialize(this, account, repositories, match);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, account, repositories, match) { 
        obj['account'] = account;
        obj['repositories'] = repositories;
        obj['match'] = match;
    }

    /**
     * Constructs a <code>ReleaseMatchRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ReleaseMatchRequest} obj Optional instance to populate.
     * @return {module:model/ReleaseMatchRequest} The populated <code>ReleaseMatchRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ReleaseMatchRequest();

            if (data.hasOwnProperty('account')) {
                obj['account'] = ApiClient.convertToType(data['account'], 'Number');
            }
            if (data.hasOwnProperty('repositories')) {
                obj['repositories'] = ApiClient.convertToType(data['repositories'], ['String']);
            }
            if (data.hasOwnProperty('branches')) {
                obj['branches'] = ApiClient.convertToType(data['branches'], 'String');
            }
            if (data.hasOwnProperty('tags')) {
                obj['tags'] = ApiClient.convertToType(data['tags'], 'String');
            }
            if (data.hasOwnProperty('match')) {
                obj['match'] = ReleaseMatchStrategy.constructFromObject(data['match']);
            }
        }
        return obj;
    }


}

/**
 * @member {Number} account
 */
ReleaseMatchRequest.prototype['account'] = undefined;

/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} repositories
 */
ReleaseMatchRequest.prototype['repositories'] = undefined;

/**
 * Regular expression to match branch names. Reference: https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-SIMILARTO-REGEXP
 * @member {String} branches
 */
ReleaseMatchRequest.prototype['branches'] = undefined;

/**
 * Regular expression to match tag names. Reference: https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-SIMILARTO-REGEXP
 * @member {String} tags
 */
ReleaseMatchRequest.prototype['tags'] = undefined;

/**
 * @member {module:model/ReleaseMatchStrategy} match
 */
ReleaseMatchRequest.prototype['match'] = undefined;






export default ReleaseMatchRequest;

