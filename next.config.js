const withSass = require('@zeit/next-sass')

module.exports = withSass({
  env: {
    GOOGLE_APPLICATION_CREDENTIALS: '',
    GCLOUD_PROJECT: '',
    STORAGE_BUCKET: ''
  }
})
