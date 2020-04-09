/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.27
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The CodeBypassingPRsMeasurement model module.
 * @module model/CodeBypassingPRsMeasurement
 * @version 1.0.27
 */
class CodeBypassingPRsMeasurement {
    /**
     * Constructs a new <code>CodeBypassingPRsMeasurement</code>.
     * Statistics about code pushed outside of pull requests in a certain time interval.
     * @alias module:model/CodeBypassingPRsMeasurement
     * @param _date {Date} Commits were pushed beginning with this date. They were not pushed later than +granularity.
     * @param bypassedCommits {Number} Number of commits that bypassed PRs in the time interval.
     * @param bypassedLines {Number} Number of changed (added + removed) lines that bypassed PRs in the time interval.
     * @param totalCommits {Number} Overall number of commits in the time interval.
     * @param totalLines {Number} Overall number of changed (added + removed) lines in the time interval.
     */
    constructor(_date, bypassedCommits, bypassedLines, totalCommits, totalLines) { 
        
        CodeBypassingPRsMeasurement.initialize(this, _date, bypassedCommits, bypassedLines, totalCommits, totalLines);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, _date, bypassedCommits, bypassedLines, totalCommits, totalLines) { 
        obj['date'] = _date;
        obj['bypassed_commits'] = bypassedCommits;
        obj['bypassed_lines'] = bypassedLines;
        obj['total_commits'] = totalCommits;
        obj['total_lines'] = totalLines;
    }

    /**
     * Constructs a <code>CodeBypassingPRsMeasurement</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CodeBypassingPRsMeasurement} obj Optional instance to populate.
     * @return {module:model/CodeBypassingPRsMeasurement} The populated <code>CodeBypassingPRsMeasurement</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CodeBypassingPRsMeasurement();

            if (data.hasOwnProperty('date')) {
                obj['date'] = ApiClient.convertToType(data['date'], 'Date');
            }
            if (data.hasOwnProperty('bypassed_commits')) {
                obj['bypassed_commits'] = ApiClient.convertToType(data['bypassed_commits'], 'Number');
            }
            if (data.hasOwnProperty('bypassed_lines')) {
                obj['bypassed_lines'] = ApiClient.convertToType(data['bypassed_lines'], 'Number');
            }
            if (data.hasOwnProperty('total_commits')) {
                obj['total_commits'] = ApiClient.convertToType(data['total_commits'], 'Number');
            }
            if (data.hasOwnProperty('total_lines')) {
                obj['total_lines'] = ApiClient.convertToType(data['total_lines'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * Commits were pushed beginning with this date. They were not pushed later than +granularity.
 * @member {Date} date
 */
CodeBypassingPRsMeasurement.prototype['date'] = undefined;

/**
 * Number of commits that bypassed PRs in the time interval.
 * @member {Number} bypassed_commits
 */
CodeBypassingPRsMeasurement.prototype['bypassed_commits'] = undefined;

/**
 * Number of changed (added + removed) lines that bypassed PRs in the time interval.
 * @member {Number} bypassed_lines
 */
CodeBypassingPRsMeasurement.prototype['bypassed_lines'] = undefined;

/**
 * Overall number of commits in the time interval.
 * @member {Number} total_commits
 */
CodeBypassingPRsMeasurement.prototype['total_commits'] = undefined;

/**
 * Overall number of changed (added + removed) lines in the time interval.
 * @member {Number} total_lines
 */
CodeBypassingPRsMeasurement.prototype['total_lines'] = undefined;






export default CodeBypassingPRsMeasurement;

