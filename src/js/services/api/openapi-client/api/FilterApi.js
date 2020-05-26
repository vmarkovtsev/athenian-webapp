/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.47
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import CommitsList from '../model/CommitsList';
import DeveloperSummary from '../model/DeveloperSummary';
import FilterCommitsRequest from '../model/FilterCommitsRequest';
import FilterPullRequestsRequest from '../model/FilterPullRequestsRequest';
import FilteredReleases from '../model/FilteredReleases';
import GenericError from '../model/GenericError';
import GenericFilterRequest from '../model/GenericFilterRequest';
import InvalidRequestError from '../model/InvalidRequestError';
import PullRequestSet from '../model/PullRequestSet';

/**
* Filter service.
* @module api/FilterApi
* @version 1.0.47
*/
export default class FilterApi {

    /**
    * Constructs a new FilterApi. 
    * @alias module:api/FilterApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * Find commits that match the specified query.
     * @param {Object} opts Optional parameters
     * @param {module:model/FilterCommitsRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CommitsList} and HTTP response
     */
    filterCommitsWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = CommitsList;
      return this.apiClient.callApi(
        '/filter/commits', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Find commits that match the specified query.
     * @param {Object} opts Optional parameters
     * @param {module:model/FilterCommitsRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CommitsList}
     */
    filterCommits(opts) {
      return this.filterCommitsWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Find developers that made an action within the given timeframe.
     * @param {Object} opts Optional parameters
     * @param {module:model/GenericFilterRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/DeveloperSummary>} and HTTP response
     */
    filterContributorsWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = [DeveloperSummary];
      return this.apiClient.callApi(
        '/filter/contributors', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Find developers that made an action within the given timeframe.
     * @param {Object} opts Optional parameters
     * @param {module:model/GenericFilterRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/DeveloperSummary>}
     */
    filterContributors(opts) {
      return this.filterContributorsWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * List pull requests that satisfy the query.
     * @param {Object} opts Optional parameters
     * @param {module:model/FilterPullRequestsRequest} opts.filterPullRequestsRequest 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/PullRequestSet} and HTTP response
     */
    filterPrsWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = opts['filterPullRequestsRequest'];

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = PullRequestSet;
      return this.apiClient.callApi(
        '/filter/pull_requests', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * List pull requests that satisfy the query.
     * @param {Object} opts Optional parameters
     * @param {module:model/FilterPullRequestsRequest} opts.filterPullRequestsRequest 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/PullRequestSet}
     */
    filterPrs(opts) {
      return this.filterPrsWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Find releases that were published in the given time fram in the given repositories.
     * @param {Object} opts Optional parameters
     * @param {module:model/GenericFilterRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/FilteredReleases} and HTTP response
     */
    filterReleasesWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = FilteredReleases;
      return this.apiClient.callApi(
        '/filter/releases', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Find releases that were published in the given time fram in the given repositories.
     * @param {Object} opts Optional parameters
     * @param {module:model/GenericFilterRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/FilteredReleases}
     */
    filterReleases(opts) {
      return this.filterReleasesWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Find repositories that were updated within the given timeframe.
     * @param {Object} opts Optional parameters
     * @param {module:model/GenericFilterRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<String>} and HTTP response
     */
    filterRepositoriesWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = ['String'];
      return this.apiClient.callApi(
        '/filter/repositories', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Find repositories that were updated within the given timeframe.
     * @param {Object} opts Optional parameters
     * @param {module:model/GenericFilterRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<String>}
     */
    filterRepositories(opts) {
      return this.filterRepositoriesWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
