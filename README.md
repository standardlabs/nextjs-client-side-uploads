# Next.js Client Side Uploads

This is the companion repository for
[this blog post](https://standardlabs.dev/blog/next-js-client-side-uploads).

You need a Google Cloud Platform account along with a key file for a service
account with appropriate IAM permissions. You also need to create a Google
Cloud Storage bucket with proper CORs configuration. See the
[Google Cloud Signed URL Reference](https://cloud.google.com/storage/docs/access-control/signed-urls)
for the requirements and
[the blog post](https://standardlabs.dev/blog/next-js-client-side-uploads)
for more details on setting up CORs.

To run this sample:

```shell
$ yarn
$ export GCLOUD_PROJECT=some-project-id
$ export STORAGE_BUCKET=name-of-a-bucket
$ export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
$ yarn dev
```
