import React, { Component } from 'react';
import WeatherComp from './WeatherComp.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherComp />
      </div>
    );
  }
}

export default App;
