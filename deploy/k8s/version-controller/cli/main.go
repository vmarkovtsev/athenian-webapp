package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"cloud.google.com/go/pubsub"
	"gopkg.in/src-d/go-log.v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/util/retry"
)

// metaClient contains required clients for PubSub and K8s interaction
type metaClient struct {
	config       *config
	subscription *pubsub.Subscription
	k8sClientSet *kubernetes.Clientset
}

// config contains metadata required for clients initialization
type config struct {
	projectName    string
	subscriptionID string
	deployment     string
	namespace      string
}

func main() {
	ctx := context.Background()
	mc, err := newMetaClient(ctx, getConfig())
	if err != nil {
		log.Errorf(err, "failed to prepare metaClient")
		os.Exit(1)
	}

	log.Infof("start receiving messages:")
	for {
		time.Sleep(time.Second)
		// TODO(@lwsanty): slack notification
		if err := mc.subscription.Receive(ctx, func(ctx context.Context, msg *pubsub.Message) {
			defer msg.Ack()
			image := string(msg.Data)

			log.Infof("got message: %q", image)
			if err := mc.UpdateDeployment(image); err != nil {
				log.Errorf(
					err,
					"error during deployment %s/%s update",
					mc.config.namespace,
					mc.config.deployment,
				)
				return
			}
			log.Infof(
				"successfully updated deployment %s/%s to the image %s",
				mc.config.namespace,
				mc.config.deployment,
				image,
			)
		}); err != nil {
			log.Errorf(err, "error on receive")
		}
	}
}

// newMetaClient is a metaClient constructor
func newMetaClient(ctx context.Context, cfg *config) (*metaClient, error) {
	clientSet, err := newK8sClientSet()
	if err != nil {
		return nil, fmt.Errorf("failed to get k8s ClientSet")
	}
	subscription, err := getSubscription(ctx, cfg.projectName, cfg.subscriptionID)
	if err != nil {
		return nil, fmt.Errorf("failed to get pubsub.NewClient: %v", err)
	}

	return &metaClient{
		config:       cfg,
		subscription: subscription,
		k8sClientSet: clientSet,
	}, nil
}

// newK8sClientSet gets K8s cluster config
// NOTE: works only if this code runs inside the pod
func newK8sClientSet() (*kubernetes.Clientset, error) {
	config, err := rest.InClusterConfig()
	if err != nil {
		return nil, err
	}
	return kubernetes.NewForConfig(config)
}

func getSubscription(ctx context.Context, projectName, subscriptionID string) (*pubsub.Subscription, error) {
	client, err := pubsub.NewClient(ctx, projectName)
	if err != nil {
		return nil, err
	}
	return client.Subscription(subscriptionID), nil
}

// TODO(@lwsanty): rollback mechanism, however we always could manually push msg with working image
// UpdateDeployment gets required deployment and updates it's image to the given one
func (mc *metaClient) UpdateDeployment(image string) error {
	dClient := mc.k8sClientSet.AppsV1().Deployments(mc.config.namespace)
	return retry.RetryOnConflict(retry.DefaultRetry, func() error {
		result, err := dClient.Get(mc.config.deployment, metav1.GetOptions{})
		if err != nil {
			return fmt.Errorf("failed to get latest version of Deployment: %v", err)
		}
		if len(result.Spec.Template.Spec.Containers) == 0 {
			return fmt.Errorf("no containers to update")
		}
		// TODO(@lwsanty): handle the case with several containers
		result.Spec.Template.Spec.Containers[0].Image = image
		_, err = dClient.Update(result)
		return err
	})
}

func getConfig() *config {
	return &config{
		projectName:    os.Getenv("GOOGLE_PROJECT_NAME"),
		subscriptionID: os.Getenv("GOOGLE_SUBSCRIPTION_ID"),
		deployment:     os.Getenv("K8S_DEPLOYMENT"),
		namespace:      os.Getenv("K8S_NAMESPACE"),
	}
}
