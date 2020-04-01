/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.20
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The RepositorySetCreateRequest model module.
 * @module model/RepositorySetCreateRequest
 * @version 1.0.20
 */
class RepositorySetCreateRequest {
    /**
     * Constructs a new <code>RepositorySetCreateRequest</code>.
     * Repository set creation request.
     * @alias module:model/RepositorySetCreateRequest
     * @param account {Number} Account identifier. That account will own the created repository set. The user must be an admin of the account.
     * @param items {Array.<String>} A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
     */
    constructor(account, items) { 
        
        RepositorySetCreateRequest.initialize(this, account, items);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, account, items) { 
        obj['account'] = account;
        obj['items'] = items;
    }

    /**
     * Constructs a <code>RepositorySetCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RepositorySetCreateRequest} obj Optional instance to populate.
     * @return {module:model/RepositorySetCreateRequest} The populated <code>RepositorySetCreateRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RepositorySetCreateRequest();

            if (data.hasOwnProperty('account')) {
                obj['account'] = ApiClient.convertToType(data['account'], 'Number');
            }
            if (data.hasOwnProperty('items')) {
                obj['items'] = ApiClient.convertToType(data['items'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * Account identifier. That account will own the created repository set. The user must be an admin of the account.
 * @member {Number} account
 */
RepositorySetCreateRequest.prototype['account'] = undefined;

/**
 * A set of repositories. An empty list results an empty response in contrary to DeveloperSet. Duplicates are automatically ignored.
 * @member {Array.<String>} items
 */
RepositorySetCreateRequest.prototype['items'] = undefined;






export default RepositorySetCreateRequest;

