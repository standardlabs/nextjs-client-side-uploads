import Head from 'next/head'
import React, {useState, useRef} from 'react'
import Container from 'react-bootstrap/Container'

import 'bootstrap/scss/bootstrap.scss'

const getSignedUrl = file =>
  fetch('/api/signedUrl', {
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
  )
}

export default Index
