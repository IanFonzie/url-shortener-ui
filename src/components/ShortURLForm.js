import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const ShortURLForm = ({handleSubmit, error}) => {
  const [value, setValue] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const _handleSubmit = event => {
    event.preventDefault()

    handleSubmit(value)
  }

  return (
    <Form className="shorten-form p-4" onSubmit={_handleSubmit}>
      <h2>Enter a URL to shorten:</h2>
      <Row>
        <Col sm={2}>
          <Form.Label htmlFor="url">URL</Form.Label>
        </Col>
      </Row>
      <Row>
        {error && (
          <Col xs={12}>
            <Form.Text className="text-danger">
              {parseError(error)}
            </Form.Text>
          </Col>
        )}
        <Col className="mb-2" sm={9} xs={12}>
          <Form.Control
            id="url"
            type="text" 
            onChange={handleChange}
            value={value}
          />
        </Col>
        <Col className="mb-2" sm={3} xs={12}>
          <Button type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  )
}

function parseError({type}) {
  if (type === 'required') {
    return 'Please enter an HTTP or HTTPS URL.'
  } else if (type === 'invalid') {
    return 'Please enter a valid HTTP or HTTPS URL.'
  } else if (type === 'server_error') {
    return 'Something went wrong. Please try again.'
  } else if (type === 'network') {
    return 'There was a network error.'
  }
}

export default ShortURLForm;