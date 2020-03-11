import React, { Component } from 'react';
import Signup from './components/signup';
// import Tracker from '../src/components/Tracker';
import './App.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Tracker from './components/Tracker';




class App extends Component {
  render() {
    return (
      <div className="App">
   
      <Signup/>
       
      </div>

  );
  }
}

export default App;