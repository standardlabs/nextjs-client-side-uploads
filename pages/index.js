import Head from 'next/head'
import React, {Fragment, useState, useRef} from 'react'
import {Container} from 'reactstrap'

const getSignedUrl = file =>
  fetch('/signedUrl', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: file.name, type: file.type})
  }).then(r => r.json())

const upload = (file, url) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', url, true)
    xhr.onerror = reject
    xhr.onload = resolve
    xhr.send(file)
  })

const Index = props => {
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  const onSelectFile = e => {
    const [file] = inputRef.current.files || []
    if (!file) {
      return
    }

    setUploading(true)
    getSignedUrl(file)
      .then(({url}) => upload(file, url))
      .then(() => setSuccess(true))
      .catch(() => setError(true))
  }

  return (
    <Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
          crossOrigin="anonymous"
        />
        <script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossOrigin="anonymous"
        />
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
          integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
          crossOrigin="anonymous"
        />
      </Head>
      <Container>
        <h1>Next.js Client Side Uploads</h1>
        <p>
          Select a file below and it will be uploaded directly to Google Cloud
          Storage
        </p>
        <input
          disabled={uploading}
          name="file"
          type="file"
          ref={inputRef}
          onChange={onSelectFile}
        />
        {(success || uploading) && (
          <p>Status: {success ? 'Success!' : 'Uploading'}</p>
        )}
      </Container>
    </Fragment>
  )
}

export default Index
