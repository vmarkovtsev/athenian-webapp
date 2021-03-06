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
 * The Contributor model module.
 * @module model/Contributor
 * @version 1.0.49
 */
class Contributor {
    /**
     * Constructs a new <code>Contributor</code>.
     * Details about a developer who contributed to some repositories owned by the account.
     * @alias module:model/Contributor
     * @param login {String} User name which uniquely identifies any developer on any service provider. The format matches the profile URL without the protocol part. 
     * @param name {String} Full name of the contributor.
     * @param email {String} Email of the conributor.
     * @param picture {String} Avatar URL of the contributor.
     */
    constructor(login, name, email, picture) { 
        
        Contributor.initialize(this, login, name, email, picture);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, login, name, email, picture) { 
        obj['login'] = login;
        obj['name'] = name;
        obj['email'] = email;
        obj['picture'] = picture;
    }

    /**
     * Constructs a <code>Contributor</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Contributor} obj Optional instance to populate.
     * @return {module:model/Contributor} The populated <code>Contributor</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Contributor();

            if (data.hasOwnProperty('login')) {
                obj['login'] = ApiClient.convertToType(data['login'], 'String');
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
        }
        return obj;
    }


}

/**
 * User name which uniquely identifies any developer on any service provider. The format matches the profile URL without the protocol part. 
 * @member {String} login
 */
Contributor.prototype['login'] = undefined;

/**
 * Full name of the contributor.
 * @member {String} name
 */
Contributor.prototype['name'] = undefined;

/**
 * Email of the conributor.
 * @member {String} email
 */
Contributor.prototype['email'] = undefined;

/**
 * Avatar URL of the contributor.
 * @member {String} picture
 */
Contributor.prototype['picture'] = undefined;






export default Contributor;

