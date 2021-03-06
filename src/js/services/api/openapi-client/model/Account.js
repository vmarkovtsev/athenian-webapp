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
 * The Account model module.
 * @module model/Account
 * @version 1.0.49
 */
class Account {
    /**
     * Constructs a new <code>Account</code>.
     * Account members. \&quot;updated\&quot; and \&quot;accounts\&quot; are not populated.
     * @alias module:model/Account
     * @param admins {Array.<module:model/User>} 
     * @param regulars {Array.<module:model/User>} 
     */
    constructor(admins, regulars) { 
        
        Account.initialize(this, admins, regulars);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, admins, regulars) { 
        obj['admins'] = admins;
        obj['regulars'] = regulars;
    }

    /**
     * Constructs a <code>Account</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Account} obj Optional instance to populate.
     * @return {module:model/Account} The populated <code>Account</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Account();

            if (data.hasOwnProperty('admins')) {
                obj['admins'] = ApiClient.convertToType(data['admins'], [User]);
            }
            if (data.hasOwnProperty('regulars')) {
                obj['regulars'] = ApiClient.convertToType(data['regulars'], [User]);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/User>} admins
 */
Account.prototype['admins'] = undefined;

/**
 * @member {Array.<module:model/User>} regulars
 */
Account.prototype['regulars'] = undefined;






export default Account;

