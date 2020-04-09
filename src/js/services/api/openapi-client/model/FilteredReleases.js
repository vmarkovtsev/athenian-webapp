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
import FilteredRelease from './FilteredRelease';
import IncludedNativeUsers from './IncludedNativeUsers';

/**
 * The FilteredReleases model module.
 * @module model/FilteredReleases
 * @version 1.0.26
 */
class FilteredReleases {
    /**
     * Constructs a new <code>FilteredReleases</code>.
     * Response of &#x60;/filter/releases&#x60; - releases metadata and user details.
     * @alias module:model/FilteredReleases
     */
    constructor() { 
        
        FilteredReleases.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>FilteredReleases</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FilteredReleases} obj Optional instance to populate.
     * @return {module:model/FilteredReleases} The populated <code>FilteredReleases</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new FilteredReleases();

            if (data.hasOwnProperty('include')) {
                obj['include'] = IncludedNativeUsers.constructFromObject(data['include']);
            }
            if (data.hasOwnProperty('data')) {
                obj['data'] = ApiClient.convertToType(data['data'], [FilteredRelease]);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/IncludedNativeUsers} include
 */
FilteredReleases.prototype['include'] = undefined;

/**
 * List of release metadata.
 * @member {Array.<module:model/FilteredRelease>} data
 */
FilteredReleases.prototype['data'] = undefined;






export default FilteredReleases;

