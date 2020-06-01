/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.48
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The NoSourceDataErrorAllOf model module.
 * @module model/NoSourceDataErrorAllOf
 * @version 1.0.48
 */
class NoSourceDataErrorAllOf {
    /**
     * Constructs a new <code>NoSourceDataErrorAllOf</code>.
     * @alias module:model/NoSourceDataErrorAllOf
     */
    constructor() { 
        
        NoSourceDataErrorAllOf.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>NoSourceDataErrorAllOf</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/NoSourceDataErrorAllOf} obj Optional instance to populate.
     * @return {module:model/NoSourceDataErrorAllOf} The populated <code>NoSourceDataErrorAllOf</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new NoSourceDataErrorAllOf();

            if (data.hasOwnProperty('repositories')) {
                obj['repositories'] = ApiClient.convertToType(data['repositories'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} repositories
 */
NoSourceDataErrorAllOf.prototype['repositories'] = undefined;






export default NoSourceDataErrorAllOf;

