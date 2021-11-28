import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'

import './App.css'
import 'react-loading-skeleton/dist/skeleton.css'

import ShortURLForm from './components/ShortURLForm'
import ShortURLOutput from './components/ShortURLOutput'

import security from './images/security.png'
import sharing from './images/sharing.png'
import analytics from './images/analytics.png'

import analyticsJPG from './images/analytics.jpg'
import securityJPG from './images/security.jpg'
import sharingJPG from './images/sharing.jpg'

import URLShortener from './services/URLShortener'
import imageResizer from './services/imageResizer'

const App = () => {
  const [shortURL, setShortURL] = useState('')
  const [longURL, setLongURL] = useState('')
  const [resizedImages, setResizedImages] = useState(null)
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
    .then(([share, secure, analytic]) => {
      setResizedImages({share, secure, analytic})
    })
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
    const error = validateURL(longURL)
    if (error) {
      setError(error)
      return  // Do not call API.
    }

    URLShortener.create(longURL)
      .then(result => {
        if (result.type) {
          setError(result)
        } else {
          setShortURL(result.short_url)
          setLongURL(longURL)
          setError({})
        }
      })
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
      <ShortURLOutput
        shortURL={shortURL}
        longURL={longURL}
      />
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
            {resizedImages ? 
              <img src={resizedImages.share} alt="Share Icon" /> :
              <Skeleton className='loading-img'/>
            }
            <h2>Easy to remember!</h2>
          </div>
          <div className="gallery-item">
            {resizedImages ? 
              <img src={resizedImages.secure} alt="Padlock Icon" /> :
              <Skeleton className='loading-img'/>
            }
            <h2>Secure!</h2>
          </div>
          <div className="gallery-item">
            {resizedImages ? 
              <img src={resizedImages.analytic} alt="Research Icon" /> :
              <Skeleton className='loading-img'/>
            }
            <h2>Track visitor stats!</h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
