/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.47
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Contributor from './Contributor';

/**
 * The Team model module.
 * @module model/Team
 * @version 1.0.47
 */
class Team {
    /**
     * Constructs a new <code>Team</code>.
     * List of team members.
     * @alias module:model/Team
     * @param id {Number} Team identifier.
     * @param name {String} Name of the team.
     * @param members {Array.<module:model/Contributor>} List of contributors.
     */
    constructor(id, name, members) { 
        
        Team.initialize(this, id, name, members);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, name, members) { 
        obj['id'] = id;
        obj['name'] = name;
        obj['members'] = members;
    }

    /**
     * Constructs a <code>Team</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Team} obj Optional instance to populate.
     * @return {module:model/Team} The populated <code>Team</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Team();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('members')) {
                obj['members'] = ApiClient.convertToType(data['members'], [Contributor]);
            }
        }
        return obj;
    }


}

/**
 * Team identifier.
 * @member {Number} id
 */
Team.prototype['id'] = undefined;

/**
 * Name of the team.
 * @member {String} name
 */
Team.prototype['name'] = undefined;

/**
 * List of contributors.
 * @member {Array.<module:model/Contributor>} members
 */
Team.prototype['members'] = undefined;






export default Team;

