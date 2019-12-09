SHELL := /bin/bash

GOOGLE_CREDENTIALS ?=
GOOGLE_PROJECT ?=

CLOUDSDK_INSTALL_DIR ?= ${HOME}
PATH := ${CLOUDSDK_INSTALL_DIR}/google-cloud-sdk/bin:$(PATH)

.PHONY: gcloud-ensure
gcloud-ensure:
	gcloud version || $(MAKE) gcloud-install

.PHONY: gcloud-install
gcloud-install:
	rm -rf ${CLOUDSDK_INSTALL_DIR}/google-cloud-sdk
	curl https://sdk.cloud.google.com | CLOUDSDK_CORE_DISABLE_PROMPTS=1 bash
	gcloud version

.PHONY:  gcloud-login
gcloud-login:
	echo "$(GOOGLE_CREDENTIALS)" | base64 --decode > google-credentials.json
	gcloud -q auth activate-service-account --key-file google-credentials.json
	gcloud config set project "$(GOOGLE_PROJECT)"

.PHONY: docker-build
docker-build:
	docker build -t "${IMAGE}" .

.PHONY: docker-push
docker-push: gcloud-login
	gcloud docker -- push "${IMAGE}"
	gcloud pubsub topics publish version-controller \
    --message "{ \"namespace\": \"${K8S_NAMESPACE}\", \"deployment\": \"${K8S_DEPLOYMENT}\", \"image\": \"${IMAGE}\" }"

.PHONY: deploy
deploy: docker-build docker-push