/**
 * Athenian Dashboard API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The CreatedIdentifier model module.
 * @module model/CreatedIdentifier
 * @version 1.0.0
 */
class CreatedIdentifier {
    /**
     * Constructs a new <code>CreatedIdentifier</code>.
     * @alias module:model/CreatedIdentifier
     * @param id {Number} Identifier of the created entity.
     */
    constructor(id) { 
        
        CreatedIdentifier.initialize(this, id);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id) { 
        obj['id'] = id;
    }

    /**
     * Constructs a <code>CreatedIdentifier</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CreatedIdentifier} obj Optional instance to populate.
     * @return {module:model/CreatedIdentifier} The populated <code>CreatedIdentifier</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CreatedIdentifier();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * Identifier of the created entity.
 * @member {Number} id
 */
CreatedIdentifier.prototype['id'] = undefined;






export default CreatedIdentifier;
