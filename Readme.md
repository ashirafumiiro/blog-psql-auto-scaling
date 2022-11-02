### Blogs App with Kubernetes deployment support

The blog app can be hosted in K8s using kubectl
The deployment files are found in the `manifests` folder. The files are described as below.

- `persistentvolume.yaml` is used to create the persistent volume
- `postgres-deployment.yaml` creates the service to expose the postgres port, the volume claim for           persistence of the  PostgreSQL db data and the actual deployment of the PostgreSQL database.
- `blogs-deployment.yaml` creates the deployment of the blog service. You can build the image from the root directory and modify this file to use custom image.

#### Horizontal Pod Auto Scaling
Appropriate resource limit are added in the `blogs-deployment.yaml` to allow for horizontal scaling.
The command below is then used in the scaling.
```bash
kubectl autoscale deployment blogs-app --cpu-percent=50 --min=1 --max=10
```

##### GKE pipeline with Github Actions
This has been configured in the .github folder
The cluster can be created using the command
```bash
gcloud container clusters create blogs-cluster --zone=europe-north1-b --cluster-version=1.22
```
After usage the cluster can be deleted with the command:
```bash
gcloud container clusters delete blogs-cluster --zone=europe-north1-b
```



