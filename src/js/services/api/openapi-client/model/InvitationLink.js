/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.26
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The InvitationLink model module.
 * @module model/InvitationLink
 * @version 1.0.26
 */
class InvitationLink {
    /**
     * Constructs a new <code>InvitationLink</code>.
     * @alias module:model/InvitationLink
     * @param url {String} Invitation URL. Users are supposed to click it and become admins or regular account members.
     */
    constructor(url) { 
        
        InvitationLink.initialize(this, url);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, url) { 
        obj['url'] = url;
    }

    /**
     * Constructs a <code>InvitationLink</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InvitationLink} obj Optional instance to populate.
     * @return {module:model/InvitationLink} The populated <code>InvitationLink</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InvitationLink();

            if (data.hasOwnProperty('url')) {
                obj['url'] = ApiClient.convertToType(data['url'], 'String');
            }
        }
        return obj;
    }


}

/**
 * Invitation URL. Users are supposed to click it and become admins or regular account members.
 * @member {String} url
 */
InvitationLink.prototype['url'] = undefined;






export default InvitationLink;

