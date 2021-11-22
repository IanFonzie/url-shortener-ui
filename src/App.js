import React, { useState, useEffect } from 'react';

import './App.css';
import ShortURLForm from './components/ShortURLForm'
import security from './images/security.png'
import sharing from './images/sharing.png'
import analytics from './images/analytics.png'

import analyticsJPG from './images/analytics.jpg'
import securityJPG from './images/security.jpg'
import sharingJPG from './images/sharing.jpg'

import imageResizer from './services/imageResizer'

const App = () => {
  const [shortURL, setShortURL] = useState('')
  const [resizedImages, setResizedImages] = useState(['', '', ''])
  const [error, setError] = useState({})

  const resizeImage = img => {
    return fetch(img)
      .then(response => response.blob())
      .then(blob => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.addEventListener('load', () => resolve(reader.result))
          reader.addEventListener('error', () => reject(reader.error))
          reader.readAsDataURL(blob)
        })
      })
      .then(dataURL => {
        const b64img = dataURL.replace('data:image/jpeg;base64,', '')
        return imageResizer.resize(b64img)
      })
      .then(resized => 'data:image/jpeg;base64,' + resized)
  }

  useEffect(() => {
    Promise.all([
      resizeImage(sharingJPG),
      resizeImage(securityJPG),
      resizeImage(analyticsJPG)
    ])
    .then(resized => setResizedImages(resized))
  }, [])

  const validateURL = longURL => {
    let validURL

    // Long URL is not present.
    if (!longURL) {
      return {type: 'required'}
    }

    // Long URL is not valid.
    try {
      validURL = new URL(longURL);
    } catch (err) {
      return {type: 'invalid'}
    }

    // Long URL has incorrect protocol.
    if (!(['http:', 'https:'].includes(validURL.protocol))) {
      return {type: 'invalid'}
    }
  }

  const shortenURL = longURL => {
    // Append HTTP protocol by default if no protocol provided.
    if (!longURL.startsWith('http')) {
      longURL = `http://` + longURL
    }

    const error = validateURL(longURL)
    if (error) {
      setError(error)
      return  // Do not call API.
    }
  
    // make request
    setShortURL(longURL)
    setError({})
  }

  let toDisplay;
  if (!shortURL) {
    toDisplay = (
      <ShortURLForm 
        error={error}
        handleSubmit={longURL => shortenURL(longURL)}
      />  
    )
  } else {
    toDisplay = (
      <div id="output">
        Use your imagination to pretend {shortURL} was shortened.
      </div>
    )
  }

  return (
    <div className="App">
      <div className="action-box">
        {toDisplay}
      </div>
      <section className="context">
        <h2>Benefits of URL Shortening</h2>
        <div className="gallery">
          <div className="gallery-item">
            <img src={resizedImages[0]} alt="Share Icon" />
            <h2>Easy to remember!</h2>
          </div>
          <div className="gallery-item">
            <img src={resizedImages[1]} alt="Padlock Icon" />
            <h2>Secure!</h2>
          </div>
          <div className="gallery-item">
            <img src={resizedImages[2]} alt="Research Icon" />
            <h2>Track visitor stats!</h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
