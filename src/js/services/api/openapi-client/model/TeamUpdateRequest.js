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
 * The TeamUpdateRequest model module.
 * @module model/TeamUpdateRequest
 * @version 1.0.48
 */
class TeamUpdateRequest {
    /**
     * Constructs a new <code>TeamUpdateRequest</code>.
     * Team update request.
     * @alias module:model/TeamUpdateRequest
     * @param name {String} Name of the team.
     * @param members {Array.<String>} A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
     */
    constructor(name, members) { 
        
        TeamUpdateRequest.initialize(this, name, members);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, members) { 
        obj['name'] = name;
        obj['members'] = members;
    }

    /**
     * Constructs a <code>TeamUpdateRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TeamUpdateRequest} obj Optional instance to populate.
     * @return {module:model/TeamUpdateRequest} The populated <code>TeamUpdateRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TeamUpdateRequest();

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
 * Name of the team.
 * @member {String} name
 */
TeamUpdateRequest.prototype['name'] = undefined;

/**
 * A set of developers. An empty list disables the filter and includes everybody. Duplicates are automatically ignored.
 * @member {Array.<String>} members
 */
TeamUpdateRequest.prototype['members'] = undefined;






export default TeamUpdateRequest;

