/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.11
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The ForSet model module.
 * @module model/ForSet
 * @version 1.0.11
 */
class ForSet {
    /**
     * Constructs a new <code>ForSet</code>.
     * @alias module:model/ForSet
     * @param repositories {Array.<String>} A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
     */
    constructor(repositories) { 
        
        ForSet.initialize(this, repositories);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, repositories) { 
        obj['repositories'] = repositories;
    }

    /**
     * Constructs a <code>ForSet</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ForSet} obj Optional instance to populate.
     * @return {module:model/ForSet} The populated <code>ForSet</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ForSet();

            if (data.hasOwnProperty('repositories')) {
                obj['repositories'] = ApiClient.convertToType(data['repositories'], ['String']);
            }
            if (data.hasOwnProperty('developers')) {
                obj['developers'] = ApiClient.convertToType(data['developers'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} repositories
 */
ForSet.prototype['repositories'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} developers
 */
ForSet.prototype['developers'] = undefined;






export default ForSet;

