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
import User from './User';

/**
 * The InvitedUser model module.
 * @module model/InvitedUser
 * @version 1.0.49
 */
class InvitedUser {
    /**
     * Constructs a new <code>InvitedUser</code>.
     * Details about the user who has accepted an invitation.
     * @alias module:model/InvitedUser
     * @param account {Number} Joined account ID.
     * @param user {module:model/User} 
     */
    constructor(account, user) { 
        
        InvitedUser.initialize(this, account, user);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, account, user) { 
        obj['account'] = account;
        obj['user'] = user;
    }

    /**
     * Constructs a <code>InvitedUser</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InvitedUser} obj Optional instance to populate.
     * @return {module:model/InvitedUser} The populated <code>InvitedUser</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InvitedUser();

            if (data.hasOwnProperty('account')) {
                obj['account'] = ApiClient.convertToType(data['account'], 'Number');
            }
            if (data.hasOwnProperty('user')) {
                obj['user'] = User.constructFromObject(data['user']);
            }
        }
        return obj;
    }


}

/**
 * Joined account ID.
 * @member {Number} account
 */
InvitedUser.prototype['account'] = undefined;

/**
 * @member {module:model/User} user
 */
InvitedUser.prototype['user'] = undefined;






export default InvitedUser;

