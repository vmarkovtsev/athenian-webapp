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

/**
 * The TeamCreateRequest model module.
 * @module model/TeamCreateRequest
 * @version 1.0.49
 */
class TeamCreateRequest {
    /**
     * Constructs a new <code>TeamCreateRequest</code>.
     * Team creation request.
     * @alias module:model/TeamCreateRequest
     * @param account {Number} Account identifier. That account will own the created team.
     * @param name {String} Name of the team.
     * @param members {Array.<String>} A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
     */
    constructor(account, name, members) { 
        
        TeamCreateRequest.initialize(this, account, name, members);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, account, name, members) { 
        obj['account'] = account;
        obj['name'] = name;
        obj['members'] = members;
    }

    /**
     * Constructs a <code>TeamCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TeamCreateRequest} obj Optional instance to populate.
     * @return {module:model/TeamCreateRequest} The populated <code>TeamCreateRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TeamCreateRequest();

            if (data.hasOwnProperty('account')) {
                obj['account'] = ApiClient.convertToType(data['account'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('members')) {
                obj['members'] = ApiClient.convertToType(data['members'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * Account identifier. That account will own the created team.
 * @member {Number} account
 */
TeamCreateRequest.prototype['account'] = undefined;

/**
 * Name of the team.
 * @member {String} name
 */
TeamCreateRequest.prototype['name'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} members
 */
TeamCreateRequest.prototype['members'] = undefined;






export default TeamCreateRequest;

