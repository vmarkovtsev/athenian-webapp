/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.16
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The User model module.
 * @module model/User
 * @version 1.0.16
 */
class User {
    /**
     * Constructs a new <code>User</code>.
     * User details. \&quot;updated\&quot; and \&quot;accounts\&quot; are populated only for the current user.
     * @alias module:model/User
     * @param id {String} Auth0 user identifier.
     * @param nativeId {String} Auth backend user identifier.
     * @param name {String} Full name of the user.
     * @param email {String} Email of the user.
     * @param picture {String} Avatar URL of the user.
     */
    constructor(id, nativeId, name, email, picture) { 
        
        User.initialize(this, id, nativeId, name, email, picture);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, nativeId, name, email, picture) { 
        obj['id'] = id;
        obj['native_id'] = nativeId;
        obj['name'] = name;
        obj['email'] = email;
        obj['picture'] = picture;
    }

    /**
     * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/User} obj Optional instance to populate.
     * @return {module:model/User} The populated <code>User</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new User();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('native_id')) {
                obj['native_id'] = ApiClient.convertToType(data['native_id'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('picture')) {
                obj['picture'] = ApiClient.convertToType(data['picture'], 'String');
            }
            if (data.hasOwnProperty('updated')) {
                obj['updated'] = ApiClient.convertToType(data['updated'], 'Date');
            }
            if (data.hasOwnProperty('accounts')) {
                obj['accounts'] = ApiClient.convertToType(data['accounts'], Object);
            }
        }
        return obj;
    }


}

/**
 * Auth0 user identifier.
 * @member {String} id
 */
User.prototype['id'] = undefined;

/**
 * Auth backend user identifier.
 * @member {String} native_id
 */
User.prototype['native_id'] = undefined;

/**
 * Full name of the user.
 * @member {String} name
 */
User.prototype['name'] = undefined;

/**
 * Email of the user.
 * @member {String} email
 */
User.prototype['email'] = undefined;

/**
 * Avatar URL of the user.
 * @member {String} picture
 */
User.prototype['picture'] = undefined;

/**
 * Date and time of the last profile update.
 * @member {Date} updated
 */
User.prototype['updated'] = undefined;

/**
 * Mapping between account IDs the user is a member of and is_admin flags.
 * @member {Object} accounts
 */
User.prototype['accounts'] = undefined;






export default User;

