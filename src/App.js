import React, { useState, useEffect } from "react"
import { Container, Row, Col, Button } from 'react-bootstrap'

import "./App.css"
import "react-loading-skeleton/dist/skeleton.css"

import ShortURLForm from "./components/ShortURLForm"
import ShortURLOutput from "./components/ShortURLOutput"
import ContextItem from "./components/ContextItem"

import analyticsJPG from "./images/analytics.jpg"
import securityJPG from "./images/security.jpg"
import sharingJPG from "./images/sharing.jpg"

import URLShortener from "./services/URLShortener"
import imageResizer from "./services/imageResizer"
import { INVALID_ERROR, REQUIRED_ERROR } from "./constants"

const App = () => {
  const [shortURL, setShortURL] = useState("")
  const [longURL, setLongURL] = useState("")
  const [resizedImages, setResizedImages] = useState(null)
  const [error, setError] = useState({})

  useEffect(() => {
    Promise.all([
      resizeImage(sharingJPG),
      resizeImage(securityJPG),
      resizeImage(analyticsJPG),
    ]).then(([share, secure, analytic]) => {
      setResizedImages({ share, secure, analytic })
    })
  }, [])

  const shortenURL = (longURL) => {
    const error = validateURL(longURL)
    if (error) {
      setError(error)
      return // Do not call API.
    }

    URLShortener.create(longURL)
      .then((result) => {
        setShortURL(result.short_url)
        setLongURL(longURL)
        setError({})
      })
      .catch((error) => {
        if (error.type) {
          setError(error)
        }
      })
  }

  const handleReset = () => {
    setShortURL("")
    setLongURL("")
  }

  const showURLForm = !shortURL

  return (
    <Container>
      <h1 className="text-center my-4">URL Shortener</h1>
      <Row className="action-box border border-dark mx-1">
        <Col xs={12}>
          {showURLForm ? (
            <ShortURLForm error={error} handleSubmit={shortenURL} />
          ) : (
            <ShortURLOutput shortURL={shortURL} longURL={longURL} />
          )}
        </Col>
      </Row>
      {!showURLForm && (
        <Row className="justify-content-center my-4">
          <Col xs={12} md={4}>
            <Button onClick={handleReset}>Start Over</Button>
          </Col>
        </Row>
      )}
      <h2 className="text-center my-4">Benefits of URL Shortening</h2>
      <Row className="context justify-content-xs-around text-center">
        <ContextItem 
          resizedImages={resizedImages}
          srcLabel={'share'}
          alt={'Share Icon'}
          heading={'Easy to remember!'}
          blurb={"Some URLs can contain a variety of verbose information needed to identify a " +
                 "resource. Sharing these can be a pain, but shortenl.ink is here to help. So " +
                 "next time, instead of memorizing, typing out, or speaking a long URL, pass " +
                 "it to us, and we'll provide you with a short, shareable version instead."}
        />
        <ContextItem 
          resizedImages={resizedImages}
          srcLabel={'secure'}
          alt={'Padlock Icon'}
          heading={'Secure!'}
          blurb={"We use HTTPS and TLS to ensure the safe and secure creation of your short " +
                 "URLs. The links are created from a randomly encoded value and will be nearly " +
                 "impossible to guess by chance."}
        />
        <ContextItem 
          resizedImages={resizedImages}
          srcLabel={'analytic'}
          alt={'Research Icon'}
          heading={'Track visitor stats!'}
          blurb={"Coming soon, the ability to track how many times a short URL was visited, " +
                 "with aggregate and detailed information about total clicks, top referral " +
                 "sources, and the locations of your URL's visitors. Stay tuned for more details!"}
        />
      </Row>
    </Container>
  )
}

const validateURL = (longURL = "") => {
  let validURL

  // Long URL is not present.
  if (!longURL) {
    return REQUIRED_ERROR
  }

  // Long URL is not valid.
  try {
    validURL = new URL(longURL)
  } catch (err) {
    return INVALID_ERROR
  }

  // Long URL has incorrect protocol.
  if (!["http:", "https:"].includes(validURL.protocol)) {
    return INVALID_ERROR
  }
}

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

export default App
