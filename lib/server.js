const {Storage} = require('@google-cloud/storage')
const addDays = require('date-fns/add_days')
const bodyParser = require('body-parser')
const express = require('express')
const format = require('date-fns/format')
const morgan = require('morgan')
const next = require('next')
const routes = require('./routes')
const {parse} = require('url')

const server = express()
server.use(morgan('combined'))
server.use(bodyParser.json())

const {env} = process
const storage = new Storage({projectId: env.GCLOUD_PROJECT})
const bucket = storage.bucket(env.STORAGE_BUCKET)

const app = next({dev: env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  server.post('/signedUrl', async (req, res) => {
    const {
      body: {name, type: contentType}
    } = req

    try {
      const file = bucket.file(name)
      const [url] = await file.getSignedUrl({
        action: 'write',
        contentType,
        expires: format(addDays(new Date(), 1), 'MM-DD-YYYY')
      })

      res.json({url})
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  })

  server.use('/', (req, res) => {
    handler(req, res, parse(req.url, true))
  })

  server.listen(3000, () => console.log('Server listening on 3000...'))
})
