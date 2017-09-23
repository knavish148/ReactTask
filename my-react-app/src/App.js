import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.headerClickCb();
  }

  render() {
    const divStyle = {color: this.props.color};
    return (
      <h2 style={divStyle} onClick={this.handleClick}>{this.props.text}</h2>
    );
  }
}

class MyInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.inputChangeCb(this.refs.myInput.value);
  }

  render() {
    return (
      <input
        type="text"
        ref="myInput"
        onChange={this.handleChange}
        placeholder="Insert text"/>
    );
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      text: "Welcome to React",
      color: this.getRandColor(),
      isBlackNext: true
    };
    this.handleHeaderChange = this.handleHeaderChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  getRandColor() {
    var cb = this.setRandColor;
    var compRef = this;
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            cb.call(compRef, xmlHttp.responseText);
    }
    xmlHttp.open('GET', "http://www.colr.org/json/color/random", true);
    xmlHttp.send(null);
  }

  setRandColor(responseText) {
    var clr = JSON.parse(responseText);

    this.setState({
      color: "#" + clr.new_color,
      isBlackNext: true
    });
  }

  handleHeaderChange() {
    if (this.state.isBlackNext) {
      this.setState((prevState) => ({
        color: "#000000",
        isBlackNext: false
      }));
    } else {
      this.getRandColor();
    }
  }

  handleInputChange(text) {
    this.setState({
      text: text
    });

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <MyHeader
            text={this.state.text}
            color={this.state.color}
            headerClickCb={this.handleHeaderChange}
          />
        </div>
        <p className="App-intro">
          <br/>
          <MyInput
            inputChangeCb={this.handleInputChange}
          />
        </p>
      </div>
    );
  }
}

export default App;
