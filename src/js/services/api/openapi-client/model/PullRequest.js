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
import PullRequestParticipant from './PullRequestParticipant';
import PullRequestProperty from './PullRequestProperty';
import StageTimings from './StageTimings';

/**
 * The PullRequest model module.
 * @module model/PullRequest
 * @version 1.0.49
 */
class PullRequest {
    /**
     * Constructs a new <code>PullRequest</code>.
     * Details of a pull request. All the attributes, stats and events correspond to \&quot;today\&quot;, not &#x60;date_to&#x60;, *except for the PR stages &#x60;wip&#x60;, &#x60;reviewing&#x60;, &#x60;merging&#x60;, &#x60;releasing&#x60;*, which correspond to &#x60;date_to&#x60;.
     * @alias module:model/PullRequest
     * @param repository {String} PR is/was open in this repository.
     * @param _number {Number} PR number.
     * @param title {String} Title of the PR.
     * @param sizeAdded {Number} Overall number of lines added.
     * @param sizeRemoved {Number} Overall number of lines removed.
     * @param filesChanged {Number} Number of files changed in this PR.
     * @param created {Date} When this PR was created.
     * @param updated {Date} When this PR was last updated.
     * @param comments {Number} Number of *regular* (not review) comments in this PR.
     * @param commits {Number} Number of commits in this PR.
     * @param stageTimings {module:model/StageTimings} 
     * @param properties {Array.<module:model/PullRequestProperty>} List of the PR properties triggered in the given time window. There may be extra properties that were not originally requested.
     * @param participants {Array.<module:model/PullRequestParticipant>} List of developers related to this PR.
     */
    constructor(repository, _number, title, sizeAdded, sizeRemoved, filesChanged, created, updated, comments, commits, stageTimings, properties, participants) { 
        
        PullRequest.initialize(this, repository, _number, title, sizeAdded, sizeRemoved, filesChanged, created, updated, comments, commits, stageTimings, properties, participants);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, repository, _number, title, sizeAdded, sizeRemoved, filesChanged, created, updated, comments, commits, stageTimings, properties, participants) { 
        obj['repository'] = repository;
        obj['number'] = _number;
        obj['title'] = title;
        obj['size_added'] = sizeAdded;
        obj['size_removed'] = sizeRemoved;
        obj['files_changed'] = filesChanged;
        obj['created'] = created;
        obj['updated'] = updated;
        obj['comments'] = comments;
        obj['commits'] = commits;
        obj['stage_timings'] = stageTimings;
        obj['properties'] = properties;
        obj['participants'] = participants;
    }

    /**
     * Constructs a <code>PullRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PullRequest} obj Optional instance to populate.
     * @return {module:model/PullRequest} The populated <code>PullRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PullRequest();

            if (data.hasOwnProperty('repository')) {
                obj['repository'] = ApiClient.convertToType(data['repository'], 'String');
            }
            if (data.hasOwnProperty('number')) {
                obj['number'] = ApiClient.convertToType(data['number'], 'Number');
            }
            if (data.hasOwnProperty('title')) {
                obj['title'] = ApiClient.convertToType(data['title'], 'String');
            }
            if (data.hasOwnProperty('size_added')) {
                obj['size_added'] = ApiClient.convertToType(data['size_added'], 'Number');
            }
            if (data.hasOwnProperty('size_removed')) {
                obj['size_removed'] = ApiClient.convertToType(data['size_removed'], 'Number');
            }
            if (data.hasOwnProperty('files_changed')) {
                obj['files_changed'] = ApiClient.convertToType(data['files_changed'], 'Number');
            }
            if (data.hasOwnProperty('created')) {
                obj['created'] = ApiClient.convertToType(data['created'], 'Date');
            }
            if (data.hasOwnProperty('updated')) {
                obj['updated'] = ApiClient.convertToType(data['updated'], 'Date');
            }
            if (data.hasOwnProperty('closed')) {
                obj['closed'] = ApiClient.convertToType(data['closed'], 'Date');
            }
            if (data.hasOwnProperty('comments')) {
                obj['comments'] = ApiClient.convertToType(data['comments'], 'Number');
            }
            if (data.hasOwnProperty('commits')) {
                obj['commits'] = ApiClient.convertToType(data['commits'], 'Number');
            }
            if (data.hasOwnProperty('review_requested')) {
                obj['review_requested'] = ApiClient.convertToType(data['review_requested'], 'Date');
            }
            if (data.hasOwnProperty('first_review')) {
                obj['first_review'] = ApiClient.convertToType(data['first_review'], 'Date');
            }
            if (data.hasOwnProperty('approved')) {
                obj['approved'] = ApiClient.convertToType(data['approved'], 'Date');
            }
            if (data.hasOwnProperty('review_comments')) {
                obj['review_comments'] = ApiClient.convertToType(data['review_comments'], 'Number');
            }
            if (data.hasOwnProperty('reviews')) {
                obj['reviews'] = ApiClient.convertToType(data['reviews'], 'Number');
            }
            if (data.hasOwnProperty('merged')) {
                obj['merged'] = ApiClient.convertToType(data['merged'], 'Date');
            }
            if (data.hasOwnProperty('released')) {
                obj['released'] = ApiClient.convertToType(data['released'], 'Date');
            }
            if (data.hasOwnProperty('release_url')) {
                obj['release_url'] = ApiClient.convertToType(data['release_url'], 'String');
            }
            if (data.hasOwnProperty('stage_timings')) {
                obj['stage_timings'] = StageTimings.constructFromObject(data['stage_timings']);
            }
            if (data.hasOwnProperty('properties')) {
                obj['properties'] = ApiClient.convertToType(data['properties'], [PullRequestProperty]);
            }
            if (data.hasOwnProperty('participants')) {
                obj['participants'] = ApiClient.convertToType(data['participants'], [PullRequestParticipant]);
            }
        }
        return obj;
    }


}

/**
 * PR is/was open in this repository.
 * @member {String} repository
 */
PullRequest.prototype['repository'] = undefined;

/**
 * PR number.
 * @member {Number} number
 */
PullRequest.prototype['number'] = undefined;

/**
 * Title of the PR.
 * @member {String} title
 */
PullRequest.prototype['title'] = undefined;

/**
 * Overall number of lines added.
 * @member {Number} size_added
 */
PullRequest.prototype['size_added'] = undefined;

/**
 * Overall number of lines removed.
 * @member {Number} size_removed
 */
PullRequest.prototype['size_removed'] = undefined;

/**
 * Number of files changed in this PR.
 * @member {Number} files_changed
 */
PullRequest.prototype['files_changed'] = undefined;

/**
 * When this PR was created.
 * @member {Date} created
 */
PullRequest.prototype['created'] = undefined;

/**
 * When this PR was last updated.
 * @member {Date} updated
 */
PullRequest.prototype['updated'] = undefined;

/**
 * When this PR was last closed.
 * @member {Date} closed
 */
PullRequest.prototype['closed'] = undefined;

/**
 * Number of *regular* (not review) comments in this PR.
 * @member {Number} comments
 */
PullRequest.prototype['comments'] = undefined;

/**
 * Number of commits in this PR.
 * @member {Number} commits
 */
PullRequest.prototype['commits'] = undefined;

/**
 * When was the first time the author of this PR requested a review.
 * @member {Date} review_requested
 */
PullRequest.prototype['review_requested'] = undefined;

/**
 * When the first review of this PR happened.
 * @member {Date} first_review
 */
PullRequest.prototype['first_review'] = undefined;

/**
 * When this PR was approved.
 * @member {Date} approved
 */
PullRequest.prototype['approved'] = undefined;

/**
 * Number of review comments this PR received. A review comment is left at a specific line in a specific file. In other words: review summaries are *not* considered review comments; refer to `reviews`. Comments by the PR author are considered as `comments`, not as `review_comments`.
 * @member {Number} review_comments
 */
PullRequest.prototype['review_comments'] = undefined;

/**
 * Number of times this PR was reviewed. Reviews by the PR author are not taken into account.
 * @member {Number} reviews
 */
PullRequest.prototype['reviews'] = undefined;

/**
 * When this PR was merged.
 * @member {Date} merged
 */
PullRequest.prototype['merged'] = undefined;

/**
 * When this PR was released.
 * @member {Date} released
 */
PullRequest.prototype['released'] = undefined;

/**
 * URL of the earliest release that includes this merged PR.
 * @member {String} release_url
 */
PullRequest.prototype['release_url'] = undefined;

/**
 * @member {module:model/StageTimings} stage_timings
 */
PullRequest.prototype['stage_timings'] = undefined;

/**
 * List of the PR properties triggered in the given time window. There may be extra properties that were not originally requested.
 * @member {Array.<module:model/PullRequestProperty>} properties
 */
PullRequest.prototype['properties'] = undefined;

/**
 * List of developers related to this PR.
 * @member {Array.<module:model/PullRequestParticipant>} participants
 */
PullRequest.prototype['participants'] = undefined;






export default PullRequest;

