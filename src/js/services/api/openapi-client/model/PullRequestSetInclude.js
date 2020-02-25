/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ {{ commit }}
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import PullRequestSetIncludeUser from './PullRequestSetIncludeUser';

/**
 * The PullRequestSetInclude model module.
 * @module model/PullRequestSetInclude
 * @version 1.0.0
 */
class PullRequestSetInclude {
    /**
     * Constructs a new <code>PullRequestSetInclude</code>.
     * @alias module:model/PullRequestSetInclude
     * @param users {Object.<String, module:model/PullRequestSetIncludeUser>} Mapping user login -> user details. The users are mentioned in PRs in \"PullRequestSet.data\".
     */
    constructor(users) { 
        
        PullRequestSetInclude.initialize(this, users);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, users) { 
        obj['users'] = users;
    }

    /**
     * Constructs a <code>PullRequestSetInclude</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PullRequestSetInclude} obj Optional instance to populate.
     * @return {module:model/PullRequestSetInclude} The populated <code>PullRequestSetInclude</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PullRequestSetInclude();

            if (data.hasOwnProperty('users')) {
                obj['users'] = ApiClient.convertToType(data['users'], {'String': PullRequestSetIncludeUser});
            }
        }
        return obj;
    }


}

/**
 * Mapping user login -> user details. The users are mentioned in PRs in \"PullRequestSet.data\".
 * @member {Object.<String, module:model/PullRequestSetIncludeUser>} users
 */
PullRequestSetInclude.prototype['users'] = undefined;






export default PullRequestSetInclude;
