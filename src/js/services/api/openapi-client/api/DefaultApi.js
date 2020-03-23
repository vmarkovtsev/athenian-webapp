/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.11
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import Account from '../model/Account';
import CalculatedMetrics from '../model/CalculatedMetrics';
import CodeBypassingPRsMeasurement from '../model/CodeBypassingPRsMeasurement';
import CodeFilter from '../model/CodeFilter';
import CommitsList from '../model/CommitsList';
import CreatedIdentifier from '../model/CreatedIdentifier';
import FilterCommitsRequest from '../model/FilterCommitsRequest';
import FilterContribsOrReposRequest from '../model/FilterContribsOrReposRequest';
import FilterPullRequestsRequest from '../model/FilterPullRequestsRequest';
import GenericError from '../model/GenericError';
import InstallationProgress from '../model/InstallationProgress';
import InvalidRequestError from '../model/InvalidRequestError';
import InvitationCheckResult from '../model/InvitationCheckResult';
import InvitationLink from '../model/InvitationLink';
import InvitedUser from '../model/InvitedUser';
import NoSourceDataError from '../model/NoSourceDataError';
import PullRequestMetricsRequest from '../model/PullRequestMetricsRequest';
import PullRequestSet from '../model/PullRequestSet';
import RepositorySetCreateRequest from '../model/RepositorySetCreateRequest';
import RepositorySetListItem from '../model/RepositorySetListItem';
import User from '../model/User';

/**
* Default service.
* @module api/DefaultApi
* @version 1.0.11
*/
export default class DefaultApi {

    /**
    * Constructs a new DefaultApi. 
    * @alias module:api/DefaultApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * Accept the account membership invitation and finish registration. The user must be already authorized in Auth0.
     * @param {module:model/InvitationLink} body Accepted invitation details.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/InvitedUser} and HTTP response
     */
    acceptInvitationWithHttpInfo(body) {
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling acceptInvitation");
      }

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
      let returnType = InvitedUser;
      return this.apiClient.callApi(
        '/invite/accept', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Accept the account membership invitation and finish registration. The user must be already authorized in Auth0.
     * @param {module:model/InvitationLink} body Accepted invitation details.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/InvitedUser}
     */
    acceptInvitation(body) {
      return this.acceptInvitationWithHttpInfo(body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * \"God mode\" ability to turn into any user. The current user must be marked internally as a super admin.
     * @param {Object} opts Optional parameters
     * @param {String} opts.id Numeric identifier of the user to turn into.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/User} and HTTP response
     */
    becomeUserWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'id': opts['id']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = User;
      return this.apiClient.callApi(
        '/become', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * \"God mode\" ability to turn into any user. The current user must be marked internally as a super admin.
     * @param {Object} opts Optional parameters
     * @param {String} opts.id Numeric identifier of the user to turn into.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/User}
     */
    becomeUser(opts) {
      return this.becomeUserWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Measure the amount of code that was pushed outside of pull requests.
     * @param {module:model/CodeFilter} body Query for measuring the amount of code that was pushed outside of pull requests.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/CodeBypassingPRsMeasurement>} and HTTP response
     */
    calcCodeBypassingPrsWithHttpInfo(body) {
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling calcCodeBypassingPrs");
      }

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
      let returnType = [CodeBypassingPRsMeasurement];
      return this.apiClient.callApi(
        '/metrics/code_bypassing_prs', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Measure the amount of code that was pushed outside of pull requests.
     * @param {module:model/CodeFilter} body Query for measuring the amount of code that was pushed outside of pull requests.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/CodeBypassingPRsMeasurement>}
     */
    calcCodeBypassingPrs(body) {
      return this.calcCodeBypassingPrsWithHttpInfo(body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Calculate linear metrics over PRs.
     * @param {module:model/PullRequestMetricsRequest} body Desired metric definitions.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CalculatedMetrics} and HTTP response
     */
    calcMetricsPrLinearWithHttpInfo(body) {
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling calcMetricsPrLinear");
      }

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
      let returnType = CalculatedMetrics;
      return this.apiClient.callApi(
        '/metrics/prs', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Calculate linear metrics over PRs.
     * @param {module:model/PullRequestMetricsRequest} body Desired metric definitions.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CalculatedMetrics}
     */
    calcMetricsPrLinear(body) {
      return this.calcMetricsPrLinearWithHttpInfo(body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Given an invitation URL, get its type (admin or regular account member) and find whether it is correctly formed and is enabled or disabled.
     * @param {module:model/InvitationLink} body Checked invitation details.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/InvitationCheckResult} and HTTP response
     */
    checkInvitationWithHttpInfo(body) {
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling checkInvitation");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InvitationCheckResult;
      return this.apiClient.callApi(
        '/invite/check', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Given an invitation URL, get its type (admin or regular account member) and find whether it is correctly formed and is enabled or disabled.
     * @param {module:model/InvitationLink} body Checked invitation details.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/InvitationCheckResult}
     */
    checkInvitation(body) {
      return this.checkInvitationWithHttpInfo(body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Create a repository set.
     * @param {Object} opts Optional parameters
     * @param {module:model/RepositorySetCreateRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CreatedIdentifier} and HTTP response
     */
    createReposetWithHttpInfo(opts) {
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
      let returnType = CreatedIdentifier;
      return this.apiClient.callApi(
        '/reposet/create', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Create a repository set.
     * @param {Object} opts Optional parameters
     * @param {module:model/RepositorySetCreateRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CreatedIdentifier}
     */
    createReposet(opts) {
      return this.createReposetWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Delete a repository set. The user must be an admin of the account that owns the reposet.
     * @param {Number} id Numeric identifier of the repository set to list.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Object} and HTTP response
     */
    deleteReposetWithHttpInfo(id) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteReposet");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Object;
      return this.apiClient.callApi(
        '/reposet/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Delete a repository set. The user must be an admin of the account that owns the reposet.
     * @param {Number} id Numeric identifier of the repository set to list.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Object}
     */
    deleteReposet(id) {
      return this.deleteReposetWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Return the current Athenian GitHub app installation progress.
     * @param {Number} id Numeric identifier of the account which the user has joined.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/InstallationProgress} and HTTP response
     */
    evalInvitationProgressWithHttpInfo(id) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling evalInvitationProgress");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InstallationProgress;
      return this.apiClient.callApi(
        '/invite/progress/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Return the current Athenian GitHub app installation progress.
     * @param {Number} id Numeric identifier of the account which the user has joined.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/InstallationProgress}
     */
    evalInvitationProgress(id) {
      return this.evalInvitationProgressWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
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
     * @param {module:model/FilterContribsOrReposRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<String>} and HTTP response
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
      let returnType = ['String'];
      return this.apiClient.callApi(
        '/filter/contributors', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Find developers that made an action within the given timeframe.
     * @param {Object} opts Optional parameters
     * @param {module:model/FilterContribsOrReposRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<String>}
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
     * Find repositories that were updated within the given timeframe.
     * @param {Object} opts Optional parameters
     * @param {module:model/FilterContribsOrReposRequest} opts.body 
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
     * @param {module:model/FilterContribsOrReposRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<String>}
     */
    filterRepositories(opts) {
      return this.filterRepositoriesWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Generate an account invitation link for regular users. The caller must be an admin of the specified account.
     * @param {Number} id Numeric identifier of the account where to invite new users.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/InvitationLink} and HTTP response
     */
    genInvitationWithHttpInfo(id) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling genInvitation");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InvitationLink;
      return this.apiClient.callApi(
        '/invite/generate/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Generate an account invitation link for regular users. The caller must be an admin of the specified account.
     * @param {Number} id Numeric identifier of the account where to invite new users.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/InvitationLink}
     */
    genInvitation(id) {
      return this.genInvitationWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * List the current user's account members.
     * @param {Number} id Numeric identifier of the account to list. The user must belong to that account. To find out which accounts the user belongs to, see `/user`.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Account} and HTTP response
     */
    getAccountWithHttpInfo(id) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getAccount");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Account;
      return this.apiClient.callApi(
        '/account/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * List the current user's account members.
     * @param {Number} id Numeric identifier of the account to list. The user must belong to that account. To find out which accounts the user belongs to, see `/user`.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Account}
     */
    getAccount(id) {
      return this.getAccountWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * List a repository set. The user must be in the account that owns the reposet.
     * @param {Number} id Numeric identifier of the repository set to list.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<String>} and HTTP response
     */
    getReposetWithHttpInfo(id) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getReposet");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = ['String'];
      return this.apiClient.callApi(
        '/reposet/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * List a repository set. The user must be in the account that owns the reposet.
     * @param {Number} id Numeric identifier of the repository set to list.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<String>}
     */
    getReposet(id) {
      return this.getReposetWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Show details about the current user.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/User} and HTTP response
     */
    getUserWithHttpInfo() {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = User;
      return this.apiClient.callApi(
        '/user', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Show details about the current user.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/User}
     */
    getUser() {
      return this.getUserWithHttpInfo()
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * List the repository sets belonging to the current user.
     * @param {Number} id Numeric identifier of the account.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/RepositorySetListItem>} and HTTP response
     */
    listReposetsWithHttpInfo(id) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling listReposets");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['bearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = [RepositorySetListItem];
      return this.apiClient.callApi(
        '/reposets/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * List the repository sets belonging to the current user.
     * @param {Number} id Numeric identifier of the account.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/RepositorySetListItem>}
     */
    listReposets(id) {
      return this.listReposetsWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Update a repository set. The user must be an admin of the account that owns the reposet.
     * @param {Number} id Numeric identifier of the repository set to list.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Object} and HTTP response
     */
    updateReposetWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = opts['body'];
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateReposet");
      }

      let pathParams = {
        'id': id
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
      let returnType = Object;
      return this.apiClient.callApi(
        '/reposet/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Update a repository set. The user must be an admin of the account that owns the reposet.
     * @param {Number} id Numeric identifier of the repository set to list.
     * @param {Object} opts Optional parameters
     * @param {Array.<String>} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Object}
     */
    updateReposet(id, opts) {
      return this.updateReposetWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
