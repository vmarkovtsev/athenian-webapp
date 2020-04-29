MAKEFLAGS += --no-builtin-rules

# Package configuration
PROJECT = athenian-webapp
SERVICE_NAME = web-app

CI_REPOSITORY ?= https://github.com/athenianco/ci
CI_BRANCH ?= master
CI_PATH ?= .ci
MAKEFILE := $(CI_PATH)/Makefile.main
$(MAKEFILE):
	git clone --quiet --depth 1 -b $(CI_BRANCH) $(CI_REPOSITORY) $(CI_PATH);
-include $(MAKEFILE)

-include .env

# If CI flags is set, build will fail if there are any WARNING log, and tests will run and exit instead of watching for changes.
# CI is set to '1' in travis by default
CI ?=
yarn := EXTEND_ESLINT=true yarn

API_VERSION ?= 1.0.35

API_VERSION_TAG_NAME := spec-$(API_VERSION)
API_SERVICE_PATH := src/js/services/api
API_CLIENT_CODE_PATH := $(API_SERVICE_PATH)/openapi-client
API_SPEC_PATH ?= $(API_SERVICE_PATH)/openapi.$(API_VERSION).yaml
API_CLONE_PATH ?= /tmp/athenian-api

OLD_API_SPEC := $(shell ls $(API_SERVICE_PATH)/openapi.*.yaml)

OPENAPI_GENERATOR := node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator

$(API_SPEC_PATH):
	rm -rf $(API_CLONE_PATH)
	git clone --single-branch --no-checkout https://github.com/athenianco/athenian-api $(API_CLONE_PATH)
	git -C $(API_CLONE_PATH) checkout $(API_VERSION_TAG_NAME) -- server/athenian/api/openapi/openapi.yaml
	mv $(API_CLONE_PATH)/server/athenian/api/openapi/openapi.yaml $(API_SPEC_PATH)
	rm -rf $(API_CLONE_PATH)

.PHONY: api-generate
api-generate: $(API_CLIENT_CODE_PATH)/index.js

$(API_CLIENT_CODE_PATH)/index.js: $(OPENAPI_GENERATOR) $(API_SPEC_PATH)
	$(MAKE) clean-openapi
	node_modules/@openapitools/openapi-generator-cli/bin/openapi-generator generate \
		--input-spec=$(API_SPEC_PATH) \
		--output=$(API_CLIENT_CODE_PATH) \
		--generator-name=javascript \
		--ignore-file-override=$(API_SERVICE_PATH)/.openapi-generator-ignore \
		--config=$(API_SERVICE_PATH)/.openapi-config.yml \
		-DmodelTests=false,modelDocs=false,apiTests=false,apiDocs=false;
	[ "$(OLD_API_SPEC)" != "$(API_SPEC_PATH)" ] && rm -f $(OLD_API_SPEC) || echo;
	echo "Using API specs $(API_VERSION). See a copy at $(API_SPEC_PATH)";

.PHONY: clean
clean: clean-openapi

.PHONY: clean-openapi
clean-openapi:
	rm -rf $(API_CLIENT_CODE_PATH)

.PHONY: build
build:
	# The API client, as generated by OpenAPI does not compile with CI=1 because it logs some WARNINGS.
	# This is also the create-react-app recommended way to proceed when building under these situations.
	# see https://github.com/facebook/create-react-app/issues/2453#issuecomment-306886060
	CI=false $(yarn) build

.PHONY: serve
serve: app-dependencies
	$(yarn) start

.PHONY: test
test:
	$(yarn) test

.PHONY: generate
generate: api-generate

.PHONY: dependencies
dependencies: app-dependencies

.PHONY: app-dependencies
app-dependencies:
	$(yarn) install --frozen-lockfile

$(OPENAPI_GENERATOR): app-dependencies
