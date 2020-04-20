/**
 * {{ title }}
 * Server version: {{ server_version }} built on {{ build_date }} @ [{{ commit }}](https://github.com/athenianco/athenian-api/commit/{{ commit }})
 *
 * The version of the OpenAPI document: 1.0.32
 * Contact: admin@athenian.co
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import GenericError from '../model/GenericError';
import ReleaseMatchRequest from '../model/ReleaseMatchRequest';
import ReleaseMatchSetting from '../model/ReleaseMatchSetting';

/**
* Settings service.
* @module api/SettingsApi
* @version 1.0.32
*/
export default class SettingsApi {

    /**
    * Constructs a new SettingsApi. 
    * @alias module:api/SettingsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * List the current release matching settings.
     * @param {Number} id Numeric identifier of the account.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Object.<String, module:model/{String: ReleaseMatchSetting}>} and HTTP response
     */
    listReleaseMatchSettingsWithHttpInfo(id) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling listReleaseMatchSettings");
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
      let returnType = {'String': ReleaseMatchSetting};
      return this.apiClient.callApi(
        '/settings/release_match/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * List the current release matching settings.
     * @param {Number} id Numeric identifier of the account.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Object.<String, module:model/{String: ReleaseMatchSetting}>}
     */
    listReleaseMatchSettings(id) {
      return this.listReleaseMatchSettingsWithHttpInfo(id)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Set the release matching rule for a list of repositories. Only for account admins.
     * @param {Object} opts Optional parameters
     * @param {module:model/ReleaseMatchRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<String>} and HTTP response
     */
    setReleaseMatchWithHttpInfo(opts) {
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
        '/settings/release_match', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Set the release matching rule for a list of repositories. Only for account admins.
     * @param {Object} opts Optional parameters
     * @param {module:model/ReleaseMatchRequest} opts.body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<String>}
     */
    setReleaseMatch(opts) {
      return this.setReleaseMatchWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
