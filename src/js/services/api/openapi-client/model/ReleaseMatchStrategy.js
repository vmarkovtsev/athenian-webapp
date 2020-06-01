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
* Enum class ReleaseMatchStrategy.
* @enum {}
* @readonly
*/
export default class ReleaseMatchStrategy {
    
        /**
         * value: "branch"
         * @const
         */
        "branch" = "branch";

    
        /**
         * value: "tag"
         * @const
         */
        "tag" = "tag";

    
        /**
         * value: "tag_or_branch"
         * @const
         */
        "tag_or_branch" = "tag_or_branch";

    

    /**
    * Returns a <code>ReleaseMatchStrategy</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/ReleaseMatchStrategy} The enum <code>ReleaseMatchStrategy</code> value.
    */
    static constructFromObject(object) {
        return object;
    }
}

