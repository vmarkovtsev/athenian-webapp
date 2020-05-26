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
import DeveloperUpdates from './DeveloperUpdates';

/**
 * The DeveloperSummary model module.
 * @module model/DeveloperSummary
 * @version 1.0.47
 */
class DeveloperSummary {
    /**
     * Constructs a new <code>DeveloperSummary</code>.
     * Developer activity statistics and profile details.
     * @alias module:model/DeveloperSummary
     * @param login {String} Developer's login name.
     * @param name {String} Developer's full name.
     * @param avatar {String} Developer's avatar URL.
     * @param updates {module:model/DeveloperUpdates} 
     */
    constructor(login, name, avatar, updates) { 
        
        DeveloperSummary.initialize(this, login, name, avatar, updates);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, login, name, avatar, updates) { 
        obj['login'] = login;
        obj['name'] = name;
        obj['avatar'] = avatar;
        obj['updates'] = updates;
    }

    /**
     * Constructs a <code>DeveloperSummary</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DeveloperSummary} obj Optional instance to populate.
     * @return {module:model/DeveloperSummary} The populated <code>DeveloperSummary</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DeveloperSummary();

            if (data.hasOwnProperty('login')) {
                obj['login'] = ApiClient.convertToType(data['login'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('avatar')) {
                obj['avatar'] = ApiClient.convertToType(data['avatar'], 'String');
            }
            if (data.hasOwnProperty('updates')) {
                obj['updates'] = DeveloperUpdates.constructFromObject(data['updates']);
            }
        }
        return obj;
    }


}

/**
 * Developer's login name.
 * @member {String} login
 */
DeveloperSummary.prototype['login'] = undefined;

/**
 * Developer's full name.
 * @member {String} name
 */
DeveloperSummary.prototype['name'] = undefined;

/**
 * Developer's avatar URL.
 * @member {String} avatar
 */
DeveloperSummary.prototype['avatar'] = undefined;

/**
 * @member {module:model/DeveloperUpdates} updates
 */
DeveloperSummary.prototype['updates'] = undefined;






export default DeveloperSummary;

