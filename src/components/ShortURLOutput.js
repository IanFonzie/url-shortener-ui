import React, { useState, useRef } from 'react'
import { Row, Col, Button, Overlay, Tooltip } from 'react-bootstrap'

const ShortURLOutput = ({shortURL, longURL}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const copyToClipboard = () => {
    const shortURL = document.getElementById('short-url').textContent
    navigator.clipboard.writeText(shortURL)
    
    // Flash tooltip.
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 1400)
  }

  return (
    <div className="p-4">
      <h2>Shortened URL</h2>
      <Row className="justify-content-sm-between">
        <Col className="mb-2" xs="auto">
          <span id="short-url">{shortURL}</span>
        </Col>
        <Col className="mb-2" xs={12} sm={4}>
          <Button ref={target} onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
          <Overlay target={target.current} show={show} placement="bottom">
            {(props) => (
              <Tooltip id="confirmation" {...props}>
                Copied!
              </Tooltip>
            )}
          </Overlay>
        </Col>
      </Row>
      <h3>URL Information</h3>
      <p>Original: {longURL}</p>
    </div>
  )
}

export default ShortURLOutput;