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
 * The PullRequestParticipant model module.
 * @module model/PullRequestParticipant
 * @version 1.0.5
 */
class PullRequestParticipant {
    /**
     * Constructs a new <code>PullRequestParticipant</code>.
     * Developer and their role in the PR.
     * @alias module:model/PullRequestParticipant
     * @param id {String} Person identifier.
     * @param status {Array.<module:model/PullRequestParticipant.StatusEnum>} 
     */
    constructor(id, status) { 
        
        PullRequestParticipant.initialize(this, id, status);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, status) { 
        obj['id'] = id;
        obj['status'] = status;
    }

    /**
     * Constructs a <code>PullRequestParticipant</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PullRequestParticipant} obj Optional instance to populate.
     * @return {module:model/PullRequestParticipant} The populated <code>PullRequestParticipant</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PullRequestParticipant();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * Person identifier.
 * @member {String} id
 */
PullRequestParticipant.prototype['id'] = undefined;

/**
 * @member {Array.<module:model/PullRequestParticipant.StatusEnum>} status
 */
PullRequestParticipant.prototype['status'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
PullRequestParticipant['StatusEnum'] = {

    /**
     * value: "author"
     * @const
     */
    "author": "author",

    /**
     * value: "reviewer"
     * @const
     */
    "reviewer": "reviewer",

    /**
     * value: "commit_author"
     * @const
     */
    "commit_author": "commit_author",

    /**
     * value: "commit_committer"
     * @const
     */
    "commit_committer": "commit_committer",

    /**
     * value: "commenter"
     * @const
     */
    "commenter": "commenter",

    /**
     * value: "merger"
     * @const
     */
    "merger": "merger"
};



export default PullRequestParticipant;

