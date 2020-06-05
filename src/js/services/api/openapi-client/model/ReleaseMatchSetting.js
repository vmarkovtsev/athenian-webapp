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
 * The ReleaseMatchSetting model module.
 * @module model/ReleaseMatchSetting
 * @version 1.0.49
 */
class ReleaseMatchSetting {
    /**
     * Constructs a new <code>ReleaseMatchSetting</code>.
     * Release matching setting for a specific repository.
     * @alias module:model/ReleaseMatchSetting
     * @param branches {String} Regular expression to match branch names. Reference: https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-SIMILARTO-REGEXP
     * @param tags {String} Regular expression to match tag names. Reference: https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-SIMILARTO-REGEXP
     * @param match {module:model/ReleaseMatchStrategy} 
     * @param defaultBranch {String} Name of the default branch of this repository.
     */
    constructor(branches, tags, match, defaultBranch) { 
        
        ReleaseMatchSetting.initialize(this, branches, tags, match, defaultBranch);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, branches, tags, match, defaultBranch) { 
        obj['branches'] = branches;
        obj['tags'] = tags;
        obj['match'] = match;
        obj['default_branch'] = defaultBranch;
    }

    /**
     * Constructs a <code>ReleaseMatchSetting</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ReleaseMatchSetting} obj Optional instance to populate.
     * @return {module:model/ReleaseMatchSetting} The populated <code>ReleaseMatchSetting</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ReleaseMatchSetting();

            if (data.hasOwnProperty('branches')) {
                obj['branches'] = ApiClient.convertToType(data['branches'], 'String');
            }
            if (data.hasOwnProperty('tags')) {
                obj['tags'] = ApiClient.convertToType(data['tags'], 'String');
            }
            if (data.hasOwnProperty('match')) {
                obj['match'] = ReleaseMatchStrategy.constructFromObject(data['match']);
            }
            if (data.hasOwnProperty('default_branch')) {
                obj['default_branch'] = ApiClient.convertToType(data['default_branch'], 'String');
            }
        }
        return obj;
    }


}

/**
 * Regular expression to match branch names. Reference: https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-SIMILARTO-REGEXP
 * @member {String} branches
 */
ReleaseMatchSetting.prototype['branches'] = undefined;

/**
 * Regular expression to match tag names. Reference: https://www.postgresql.org/docs/current/functions-matching.html#FUNCTIONS-SIMILARTO-REGEXP
 * @member {String} tags
 */
ReleaseMatchSetting.prototype['tags'] = undefined;

/**
 * @member {module:model/ReleaseMatchStrategy} match
 */
ReleaseMatchSetting.prototype['match'] = undefined;

/**
 * Name of the default branch of this repository.
 * @member {String} default_branch
 */
ReleaseMatchSetting.prototype['default_branch'] = undefined;






export default ReleaseMatchSetting;

