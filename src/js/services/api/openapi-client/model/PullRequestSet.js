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
import IncludedNativeUsers from './IncludedNativeUsers';
import PullRequest from './PullRequest';

/**
 * The PullRequestSet model module.
 * @module model/PullRequestSet
 * @version 1.0.49
 */
class PullRequestSet {
    /**
     * Constructs a new <code>PullRequestSet</code>.
     * List of pull requests together with the participant profile pictures.
     * @alias module:model/PullRequestSet
     * @param include {module:model/IncludedNativeUsers} 
     * @param data {Array.<module:model/PullRequest>} List of matched pull requests.
     */
    constructor(include, data) { 
        
        PullRequestSet.initialize(this, include, data);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, include, data) { 
        obj['include'] = include;
        obj['data'] = data;
    }

    /**
     * Constructs a <code>PullRequestSet</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PullRequestSet} obj Optional instance to populate.
     * @return {module:model/PullRequestSet} The populated <code>PullRequestSet</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PullRequestSet();

            if (data.hasOwnProperty('include')) {
                obj['include'] = IncludedNativeUsers.constructFromObject(data['include']);
            }
            if (data.hasOwnProperty('data')) {
                obj['data'] = ApiClient.convertToType(data['data'], [PullRequest]);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/IncludedNativeUsers} include
 */
PullRequestSet.prototype['include'] = undefined;

/**
 * List of matched pull requests.
 * @member {Array.<module:model/PullRequest>} data
 */
PullRequestSet.prototype['data'] = undefined;






export default PullRequestSet;

