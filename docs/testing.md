# Testing

In order to enhance our testing workflow we agreed to have an ability to dynamically setup [test pre-staging environments](https://athenianco.atlassian.net/browse/ENG-814)
so Product team can verify web-app changes manually on the staging data.

## Before running test environment
Make sure that Travis job `branch-image` completed successfully

You might also need to set up the project running `gcloud config set project athenian-1` in advance.

## Preparing test environment
To create a test environment simply run  
```shell script
TEST_BRANCH="your-branch" TEST_SERVICE_ACCOUNT="your-test-service-account" make create-test-env
```
Then port-forward services with
```shell script
TEST_BRANCH="your-branch" make port-forward-test-env
```
**Note:** hanging command

## Removing test environment
```shell script
TEST_BRANCH="your-branch" make delete-test-env
```
**Note:** confirmation prompted

## Troubleshooting
In the case you don't know what `TEST_SERVICE_ACCOUNT` to set or have other
difficulties/permissions errors please contact infra 
