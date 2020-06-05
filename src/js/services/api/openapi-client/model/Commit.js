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
import CommitSignature from './CommitSignature';

/**
 * The Commit model module.
 * @module model/Commit
 * @version 1.0.49
 */
class Commit {
    /**
     * Constructs a new <code>Commit</code>.
     * Information about a commit.
     * @alias module:model/Commit
     * @param repository {String} Repository name which uniquely identifies any repository in any service provider. The format matches the repository URL without the protocol part. No \".git\" should be appended. We support a special syntax for repository sets: \"{reposet id}\" adds all the repositories from the given set. 
     * @param hash {String} Git commit hash.
     * @param author {module:model/CommitSignature} 
     * @param committer {module:model/CommitSignature} 
     * @param message {String} Commit message.
     * @param sizeAdded {Number} Overall number of lines added.
     * @param sizeRemoved {Number} Overall number of lines removed.
     * @param filesChanged {Number} Number of files changed in this PR.
     */
    constructor(repository, hash, author, committer, message, sizeAdded, sizeRemoved, filesChanged) { 
        
        Commit.initialize(this, repository, hash, author, committer, message, sizeAdded, sizeRemoved, filesChanged);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, repository, hash, author, committer, message, sizeAdded, sizeRemoved, filesChanged) { 
        obj['repository'] = repository;
        obj['hash'] = hash;
        obj['author'] = author;
        obj['committer'] = committer;
        obj['message'] = message;
        obj['size_added'] = sizeAdded;
        obj['size_removed'] = sizeRemoved;
        obj['files_changed'] = filesChanged;
    }

    /**
     * Constructs a <code>Commit</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Commit} obj Optional instance to populate.
     * @return {module:model/Commit} The populated <code>Commit</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Commit();

            if (data.hasOwnProperty('repository')) {
                obj['repository'] = ApiClient.convertToType(data['repository'], 'String');
            }
            if (data.hasOwnProperty('hash')) {
                obj['hash'] = ApiClient.convertToType(data['hash'], 'String');
            }
            if (data.hasOwnProperty('author')) {
                obj['author'] = CommitSignature.constructFromObject(data['author']);
            }
            if (data.hasOwnProperty('committer')) {
                obj['committer'] = CommitSignature.constructFromObject(data['committer']);
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
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
        }
        return obj;
    }


}

/**
 * Repository name which uniquely identifies any repository in any service provider. The format matches the repository URL without the protocol part. No \".git\" should be appended. We support a special syntax for repository sets: \"{reposet id}\" adds all the repositories from the given set. 
 * @member {String} repository
 */
Commit.prototype['repository'] = undefined;

/**
 * Git commit hash.
 * @member {String} hash
 */
Commit.prototype['hash'] = undefined;

/**
 * @member {module:model/CommitSignature} author
 */
Commit.prototype['author'] = undefined;

/**
 * @member {module:model/CommitSignature} committer
 */
Commit.prototype['committer'] = undefined;

/**
 * Commit message.
 * @member {String} message
 */
Commit.prototype['message'] = undefined;

/**
 * Overall number of lines added.
 * @member {Number} size_added
 */
Commit.prototype['size_added'] = undefined;

/**
 * Overall number of lines removed.
 * @member {Number} size_removed
 */
Commit.prototype['size_removed'] = undefined;

/**
 * Number of files changed in this PR.
 * @member {Number} files_changed
 */
Commit.prototype['files_changed'] = undefined;






export default Commit;

