import React from 'react';

// import logo from './logo.svg';
import './App.css';
import ShortURLForm from './ShortURLForm';

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
      </div>
    );
  }
}

export default App;
