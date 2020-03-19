/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.9
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
/**
* Enum class PullRequestProperty.
* @enum {}
* @readonly
*/
export default class PullRequestProperty {
    
        /**
         * value: "wip"
         * @const
         */
        "wip" = "wip";

    
        /**
         * value: "created"
         * @const
         */
        "created" = "created";

    
        /**
         * value: "commit_happened"
         * @const
         */
        "commit_happened" = "commit_happened";

    
        /**
         * value: "reviewing"
         * @const
         */
        "reviewing" = "reviewing";

    
        /**
         * value: "review_happened"
         * @const
         */
        "review_happened" = "review_happened";

    
        /**
         * value: "approve_happened"
         * @const
         */
        "approve_happened" = "approve_happened";

    
        /**
         * value: "merging"
         * @const
         */
        "merging" = "merging";

    
        /**
         * value: "merge_happened"
         * @const
         */
        "merge_happened" = "merge_happened";

    
        /**
         * value: "releasing"
         * @const
         */
        "releasing" = "releasing";

    
        /**
         * value: "release_happened"
         * @const
         */
        "release_happened" = "release_happened";

    
        /**
         * value: "done"
         * @const
         */
        "done" = "done";

    

    /**
    * Returns a <code>PullRequestProperty</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/PullRequestProperty} The enum <code>PullRequestProperty</code> value.
    */
    static constructFromObject(object) {
        return object;
    }
}

