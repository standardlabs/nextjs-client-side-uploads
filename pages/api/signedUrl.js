const {Storage} = require('@google-cloud/storage')
const format = require('date-fns/format')
const addDays = require('date-fns/add_days')

const storage = new Storage({projectId: process.env.GCLOUD_PROJECT})
const bucket = storage.bucket(process.env.STORAGE_BUCKET)

export default async (req, res) => {
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
}
