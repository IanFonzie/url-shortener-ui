import React from 'react';

class ShortURLForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.handleSubmit(this.state);
    this.setState({
      value: '',
    });
  }

  render() {
    return (
      <form className="shorten-form" onSubmit={this.handleSubmit}>
        <h1>Enter a URL to shorten:</h1>
        <label htmlFor="url">URL</label>
        <input 
          id="url"
          type="text" 
          onChange={this.handleChange}
          value={this.state.value}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default ShortURLForm;