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
import CalculatedDeveloperMetrics from '../model/CalculatedDeveloperMetrics';
import CalculatedPullRequestMetrics from '../model/CalculatedPullRequestMetrics';
import CodeBypassingPRsMeasurement from '../model/CodeBypassingPRsMeasurement';
import CodeFilter from '../model/CodeFilter';
import DeveloperMetricsRequest from '../model/DeveloperMetricsRequest';
import GenericError from '../model/GenericError';
import InvalidRequestError from '../model/InvalidRequestError';
import NoSourceDataError from '../model/NoSourceDataError';
import PullRequestMetricsRequest from '../model/PullRequestMetricsRequest';

/**
* Metrics service.
* @module api/MetricsApi
* @version 1.0.27
*/
export default class MetricsApi {

    /**
    * Constructs a new MetricsApi. 
    * @alias module:api/MetricsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
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
     * Calculate metrics over developer activities.
     * @param {module:model/DeveloperMetricsRequest} body Query for selecting developers and measured activities.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CalculatedDeveloperMetrics} and HTTP response
     */
    calcMetricsDeveloperWithHttpInfo(body) {
      let postBody = body;
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling calcMetricsDeveloper");
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
      let returnType = CalculatedDeveloperMetrics;
      return this.apiClient.callApi(
        '/metrics/developers', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Calculate metrics over developer activities.
     * @param {module:model/DeveloperMetricsRequest} body Query for selecting developers and measured activities.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CalculatedDeveloperMetrics}
     */
    calcMetricsDeveloper(body) {
      return this.calcMetricsDeveloperWithHttpInfo(body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Calculate linear metrics over PRs.
     * @param {module:model/PullRequestMetricsRequest} body Desired metric definitions.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/CalculatedPullRequestMetrics} and HTTP response
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
      let returnType = CalculatedPullRequestMetrics;
      return this.apiClient.callApi(
        '/metrics/prs', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Calculate linear metrics over PRs.
     * @param {module:model/PullRequestMetricsRequest} body Desired metric definitions.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/CalculatedPullRequestMetrics}
     */
    calcMetricsPrLinear(body) {
      return this.calcMetricsPrLinearWithHttpInfo(body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
