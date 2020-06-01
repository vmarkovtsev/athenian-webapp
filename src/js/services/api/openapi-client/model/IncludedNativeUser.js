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
 * The IncludedNativeUser model module.
 * @module model/IncludedNativeUser
 * @version 1.0.48
 */
class IncludedNativeUser {
    /**
     * Constructs a new <code>IncludedNativeUser</code>.
     * User traits such as the avatar URL.
     * @alias module:model/IncludedNativeUser
     * @param avatar {String} 
     */
    constructor(avatar) { 
        
        IncludedNativeUser.initialize(this, avatar);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, avatar) { 
        obj['avatar'] = avatar;
    }

    /**
     * Constructs a <code>IncludedNativeUser</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IncludedNativeUser} obj Optional instance to populate.
     * @return {module:model/IncludedNativeUser} The populated <code>IncludedNativeUser</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new IncludedNativeUser();

            if (data.hasOwnProperty('avatar')) {
                obj['avatar'] = ApiClient.convertToType(data['avatar'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} avatar
 */
IncludedNativeUser.prototype['avatar'] = undefined;






export default IncludedNativeUser;

