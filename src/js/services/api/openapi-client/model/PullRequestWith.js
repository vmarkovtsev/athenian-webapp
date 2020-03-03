/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.5
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The PullRequestWith model module.
 * @module model/PullRequestWith
 * @version 1.0.5
 */
class PullRequestWith {
    /**
     * Constructs a new <code>PullRequestWith</code>.
     * Triage PRs by various developer participation. The aggregation is OR between the participation groups and OR within each group. For example, if our request is {\&quot;author\&quot;: [\&quot;github.com/vmarkovtsev\&quot;], \&quot;reviewer\&quot;: [\&quot;github.com/gkwillie\&quot;, \&quot;github.com/mcuadros\&quot;]} then the matched PRs will have @vmarkovtsev as the author or either @gkwillie or @mcuadros as the reviewers.
     * @alias module:model/PullRequestWith
     */
    constructor() { 
        
        PullRequestWith.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>PullRequestWith</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PullRequestWith} obj Optional instance to populate.
     * @return {module:model/PullRequestWith} The populated <code>PullRequestWith</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PullRequestWith();

            if (data.hasOwnProperty('author')) {
                obj['author'] = ApiClient.convertToType(data['author'], ['String']);
            }
            if (data.hasOwnProperty('reviewer')) {
                obj['reviewer'] = ApiClient.convertToType(data['reviewer'], ['String']);
            }
            if (data.hasOwnProperty('commit_author')) {
                obj['commit_author'] = ApiClient.convertToType(data['commit_author'], ['String']);
            }
            if (data.hasOwnProperty('commit_committer')) {
                obj['commit_committer'] = ApiClient.convertToType(data['commit_committer'], ['String']);
            }
            if (data.hasOwnProperty('commenter')) {
                obj['commenter'] = ApiClient.convertToType(data['commenter'], ['String']);
            }
            if (data.hasOwnProperty('merger')) {
                obj['merger'] = ApiClient.convertToType(data['merger'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} author
 */
PullRequestWith.prototype['author'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} reviewer
 */
PullRequestWith.prototype['reviewer'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} commit_author
 */
PullRequestWith.prototype['commit_author'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} commit_committer
 */
PullRequestWith.prototype['commit_committer'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} commenter
 */
PullRequestWith.prototype['commenter'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} merger
 */
PullRequestWith.prototype['merger'] = undefined;






export default PullRequestWith;

