import React from 'react';

// import logo from './logo.svg';
import './App.css';
import ShortURLForm from './ShortURLForm';
import security from './images/security.png';
import sharing from './images/sharing.png';
import analytics from './images/analytics.png';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortURL: '',
    };
  }

  shortenURL({value: URL}) {
    this.setState({
      shortURL: URL,
    });
  }

  render() {
    let toDisplay;
    if (!this.state.shortURL) {
      toDisplay = (
        <ShortURLForm 
          handleSubmit={URL => this.shortenURL(URL)}
        />  
      );
    } else {
      toDisplay = (
        <div id="output">
          Use your imagination to pretend {this.state.shortURL} was shortened.
        </div>
      );
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
              <img src={sharing} alt="Share Icon" />
              <h2>Easy to remember!</h2>
            </div>
            <div className="gallery-item">
              <img src={security} alt="Padlock Icon" />
              <h2>Secure!</h2>
            </div>
            <div className="gallery-item">
              <img src={analytics} alt="Research Icon" />
              <h2>Track visitor stats!</h2>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
