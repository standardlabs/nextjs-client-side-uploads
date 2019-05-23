# Next.js Client Side Uploads

This is the companion repository for
[this blog post](https://standardlabs.dev/blog/next-js-client-side-uploads).

You need a Google Cloud Platform account along with a key file for a service
account with appropriate IAM permissions. See the
[Google Cloud Signed URL Reference](https://cloud.google.com/storage/docs/access-control/signed-urls)
for the requirments.

To run this sample:

```shell
yarn
export GCLOUD_PROJECT=some-project-id
export STORAGE_BUCKET=name-of-a-bucket
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
yarn dev
```
