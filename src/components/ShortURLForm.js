import React, { useState } from 'react';

const ShortURLForm = props => {
  const [value, setValue] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    props.handleSubmit(value)
    setValue('')
  }

  return (
    <form className="shorten-form" onSubmit={handleSubmit}>
      <h1>Enter a URL to shorten:</h1>
      <label htmlFor="url">URL</label>
      <input 
        id="url"
        type="text" 
        onChange={handleChange}
        value={value}
      />
      <input type="submit" />
      {props.error.type === 'required' && (
        <div className="error">Please enter an HTTP or HTTPS URL.</div>
      )}
      {props.error.type === 'invalid' && (
        <div className="error">Please enter a valid HTTP or HTTPS URL.</div>
      )}
      {props.error.type === 'server_error' && (
        <div className="error">Something went wrong. Please try again.</div>
      )}
      {props.error.type === 'network' && (
        <div className="error">There was a network error.</div>
      )}
    </form>
  )
}

export default ShortURLForm;