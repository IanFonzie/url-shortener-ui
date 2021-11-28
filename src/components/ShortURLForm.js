import React, { useState } from 'react';

const ShortURLForm = ({handleSubmit, error}) => {
  const [value, setValue] = useState('')

  const handleChange = event => {
    setValue(event.target.value)
  }

  const _handleSubmit = event => {
    event.preventDefault()

    handleSubmit(value)
    setValue('')
  }

  return (
    <form className="shorten-form" onSubmit={_handleSubmit}>
      <h1>Enter a URL to shorten:</h1>
      <label htmlFor="url">URL</label>
      <input 
        id="url"
        type="text" 
        onChange={handleChange}
        value={value}
      />
      <button type="submit">Shorten URL</button>
      {error && (
        <div className="error">{parseError(error)}</div>
      )}
    </form>
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