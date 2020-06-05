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
import Commit from './Commit';
import IncludedNativeUsers from './IncludedNativeUsers';

/**
 * The CommitsList model module.
 * @module model/CommitsList
 * @version 1.0.49
 */
class CommitsList {
    /**
     * Constructs a new <code>CommitsList</code>.
     * List of commits metadata and related user details.
     * @alias module:model/CommitsList
     * @param data {Array.<module:model/Commit>} 
     * @param include {module:model/IncludedNativeUsers} 
     */
    constructor(data, include) { 
        
        CommitsList.initialize(this, data, include);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, data, include) { 
        obj['data'] = data;
        obj['include'] = include;
    }

    /**
     * Constructs a <code>CommitsList</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CommitsList} obj Optional instance to populate.
     * @return {module:model/CommitsList} The populated <code>CommitsList</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CommitsList();

            if (data.hasOwnProperty('data')) {
                obj['data'] = ApiClient.convertToType(data['data'], [Commit]);
            }
            if (data.hasOwnProperty('include')) {
                obj['include'] = IncludedNativeUsers.constructFromObject(data['include']);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/Commit>} data
 */
CommitsList.prototype['data'] = undefined;

/**
 * @member {module:model/IncludedNativeUsers} include
 */
CommitsList.prototype['include'] = undefined;






export default CommitsList;

