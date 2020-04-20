/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.32
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The RepositorySetListItem model module.
 * @module model/RepositorySetListItem
 * @version 1.0.32
 */
class RepositorySetListItem {
    /**
     * Constructs a new <code>RepositorySetListItem</code>.
     * Element of RepositorySetList.
     * @alias module:model/RepositorySetListItem
     */
    constructor() { 
        
        RepositorySetListItem.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>RepositorySetListItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RepositorySetListItem} obj Optional instance to populate.
     * @return {module:model/RepositorySetListItem} The populated <code>RepositorySetListItem</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RepositorySetListItem();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('created')) {
                obj['created'] = ApiClient.convertToType(data['created'], 'Date');
            }
            if (data.hasOwnProperty('updated')) {
                obj['updated'] = ApiClient.convertToType(data['updated'], 'Date');
            }
            if (data.hasOwnProperty('items_count')) {
                obj['items_count'] = ApiClient.convertToType(data['items_count'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * Repository set identifier.
 * @member {Number} id
 */
RepositorySetListItem.prototype['id'] = undefined;

/**
 * Date and time of creation of the repository set.
 * @member {Date} created
 */
RepositorySetListItem.prototype['created'] = undefined;

/**
 * Date and time of the last change of the repository set.
 * @member {Date} updated
 */
RepositorySetListItem.prototype['updated'] = undefined;

/**
 * Number of repositories in the set.
 * @member {Number} items_count
 */
RepositorySetListItem.prototype['items_count'] = undefined;






export default RepositorySetListItem;

