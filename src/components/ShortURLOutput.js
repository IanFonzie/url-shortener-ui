const ShortURLOutput = ({shortURL, longURL}) => {
  return (
    <div id="output">
      <h1>Shortened URL</h1>
      <span className="short-url">{shortURL}</span>
      <button onClick={copyToClipboard}>Copy to Clipboard</button>
      <h2>URL Information</h2>
      <p>Original: {longURL}</p>
    </div>
  )
}

const copyToClipboard = () => {
  const shortURL = document.getElementsByClassName('short-url')[0].textContent
  navigator.clipboard.writeText(shortURL)
}

export default ShortURLOutput;