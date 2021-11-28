import { Row, Col, Button } from 'react-bootstrap'

const ShortURLOutput = ({shortURL, longURL}) => {
  return (
    <div className="p-4">
      <h2>Shortened URL</h2>
      <Row className="justify-content-sm-between">
        <Col className="mb-2" xs="auto">
          <span id="short-url">{shortURL}</span>
        </Col>
        <Col className="mb-2" xs={12} sm={4}>
          <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
        </Col>
      </Row>
      <h3>URL Information</h3>
      <p>Original: {longURL}</p>
    </div>
  )
}

const copyToClipboard = () => {
  const shortURL = document.getElementById('short-url').textContent
  navigator.clipboard.writeText(shortURL)
}

export default ShortURLOutput;