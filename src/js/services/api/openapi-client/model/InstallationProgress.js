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
import TableFetchingProgress from './TableFetchingProgress';

/**
 * The InstallationProgress model module.
 * @module model/InstallationProgress
 * @version 1.0.20
 */
class InstallationProgress {
    /**
     * Constructs a new <code>InstallationProgress</code>.
     * Data fetching progress of the Athenian metadata retrieval app.
     * @alias module:model/InstallationProgress
     * @param startedDate {Date} Date and time when the historical data collection began.
     * @param finishedDate {Date} Date and time when the historical data collection ended.
     * @param owner {String} Native user ID of the person who installed the metadata retrieval app.
     * @param repositories {Number} Number of discovered repositories.
     * @param tables {Array.<module:model/TableFetchingProgress>} 
     */
    constructor(startedDate, finishedDate, owner, repositories, tables) { 
        
        InstallationProgress.initialize(this, startedDate, finishedDate, owner, repositories, tables);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, startedDate, finishedDate, owner, repositories, tables) { 
        obj['started_date'] = startedDate;
        obj['finished_date'] = finishedDate;
        obj['owner'] = owner;
        obj['repositories'] = repositories;
        obj['tables'] = tables;
    }

    /**
     * Constructs a <code>InstallationProgress</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InstallationProgress} obj Optional instance to populate.
     * @return {module:model/InstallationProgress} The populated <code>InstallationProgress</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InstallationProgress();

            if (data.hasOwnProperty('started_date')) {
                obj['started_date'] = ApiClient.convertToType(data['started_date'], 'Date');
            }
            if (data.hasOwnProperty('finished_date')) {
                obj['finished_date'] = ApiClient.convertToType(data['finished_date'], 'Date');
            }
            if (data.hasOwnProperty('owner')) {
                obj['owner'] = ApiClient.convertToType(data['owner'], 'String');
            }
            if (data.hasOwnProperty('repositories')) {
                obj['repositories'] = ApiClient.convertToType(data['repositories'], 'Number');
            }
            if (data.hasOwnProperty('tables')) {
                obj['tables'] = ApiClient.convertToType(data['tables'], [TableFetchingProgress]);
            }
        }
        return obj;
    }


}

/**
 * Date and time when the historical data collection began.
 * @member {Date} started_date
 */
InstallationProgress.prototype['started_date'] = undefined;

/**
 * Date and time when the historical data collection ended.
 * @member {Date} finished_date
 */
InstallationProgress.prototype['finished_date'] = undefined;

/**
 * Native user ID of the person who installed the metadata retrieval app.
 * @member {String} owner
 */
InstallationProgress.prototype['owner'] = undefined;

/**
 * Number of discovered repositories.
 * @member {Number} repositories
 */
InstallationProgress.prototype['repositories'] = undefined;

/**
 * @member {Array.<module:model/TableFetchingProgress>} tables
 */
InstallationProgress.prototype['tables'] = undefined;






export default InstallationProgress;

