/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.36
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The TableFetchingProgress model module.
 * @module model/TableFetchingProgress
 * @version 1.0.36
 */
class TableFetchingProgress {
    /**
     * Constructs a new <code>TableFetchingProgress</code>.
     * Used in InstallationProgress.tables to indicate how much data has been loaded in each DB table.
     * @alias module:model/TableFetchingProgress
     * @param fetched {Number} How many records have been stored in the DB table so far.
     * @param name {String} DB table identifier.
     * @param total {Number} How many records the DB table is expected to have.
     */
    constructor(fetched, name, total) { 
        
        TableFetchingProgress.initialize(this, fetched, name, total);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, fetched, name, total) { 
        obj['fetched'] = fetched;
        obj['name'] = name;
        obj['total'] = total;
    }

    /**
     * Constructs a <code>TableFetchingProgress</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TableFetchingProgress} obj Optional instance to populate.
     * @return {module:model/TableFetchingProgress} The populated <code>TableFetchingProgress</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TableFetchingProgress();

            if (data.hasOwnProperty('fetched')) {
                obj['fetched'] = ApiClient.convertToType(data['fetched'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('total')) {
                obj['total'] = ApiClient.convertToType(data['total'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * How many records have been stored in the DB table so far.
 * @member {Number} fetched
 */
TableFetchingProgress.prototype['fetched'] = undefined;

/**
 * DB table identifier.
 * @member {String} name
 */
TableFetchingProgress.prototype['name'] = undefined;

/**
 * How many records the DB table is expected to have.
 * @member {Number} total
 */
TableFetchingProgress.prototype['total'] = undefined;






export default TableFetchingProgress;

