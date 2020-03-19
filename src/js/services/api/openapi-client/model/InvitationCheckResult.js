/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.9
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The InvitationCheckResult model module.
 * @module model/InvitationCheckResult
 * @version 1.0.9
 */
class InvitationCheckResult {
    /**
     * Constructs a new <code>InvitationCheckResult</code>.
     * @alias module:model/InvitationCheckResult
     * @param valid {Boolean} Value indicating whether the invitation URL is correctly formed.
     */
    constructor(valid) { 
        
        InvitationCheckResult.initialize(this, valid);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, valid) { 
        obj['valid'] = valid;
    }

    /**
     * Constructs a <code>InvitationCheckResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InvitationCheckResult} obj Optional instance to populate.
     * @return {module:model/InvitationCheckResult} The populated <code>InvitationCheckResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InvitationCheckResult();

            if (data.hasOwnProperty('active')) {
                obj['active'] = ApiClient.convertToType(data['active'], 'Boolean');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('valid')) {
                obj['valid'] = ApiClient.convertToType(data['valid'], 'Boolean');
            }
        }
        return obj;
    }


}

/**
 * Value indicating whether the invitation is still enabled.
 * @member {Boolean} active
 */
InvitationCheckResult.prototype['active'] = undefined;

/**
 * Invited user's account membership status.
 * @member {module:model/InvitationCheckResult.TypeEnum} type
 */
InvitationCheckResult.prototype['type'] = undefined;

/**
 * Value indicating whether the invitation URL is correctly formed.
 * @member {Boolean} valid
 */
InvitationCheckResult.prototype['valid'] = undefined;





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
InvitationCheckResult['TypeEnum'] = {

    /**
     * value: "admin"
     * @const
     */
    "admin": "admin",

    /**
     * value: "regular"
     * @const
     */
    "regular": "regular"
};



export default InvitationCheckResult;

