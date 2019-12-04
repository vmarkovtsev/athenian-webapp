IMAGE=$1

set -e

echo "building ${IMAGE}"
docker build -t "${IMAGE}" .
echo "pushing ${IMAGE}"
gcloud docker -- push "${IMAGE}"
echo "sending ${IMAGE} to pubsub"
gcloud pubsub topics publish "${GOOGLE_PUBSUB_TOPIC}" --message "${IMAGE}"
