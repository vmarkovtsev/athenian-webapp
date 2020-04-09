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


import ApiClient from "../ApiClient";
import GenericError from '../model/GenericError';
import InstallationProgress from '../model/InstallationProgress';
import InvitationCheckResult from '../model/InvitationCheckResult';
import InvitationLink from '../model/InvitationLink';
import InvitedUser from '../model/InvitedUser';

/**
* Registration service.
* @module api/RegistrationApi
* @version 1.0.27
*/
export default class RegistrationApi {

    /**
    * Constructs a new RegistrationApi. 
    * @alias module:api/RegistrationApi
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


}
