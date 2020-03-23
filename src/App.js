import React, { Component } from 'react';
import Signup from './components/signup';
 import Tracker from '../src/components/Tracker';
 import {  withRouter } from "react-router-dom";
 import { ButtonToggle } from 'reactstrap';
import './App.css';
import history from 'history';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import News from './components/news';
import NewsDescription from './components/newsDescription';
import Dashboard from './components/dashboard';
import DashboardWrapper from './components/dashboardWrapper';


class App extends Component {
toggle = false;
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,

    };
  }
  handleNewUser(e) {
    e.preventDefault();
  }
  handleLogin(event) {
    event.preventDefault();
    this.toggle = !this.toggle;
    this.setState({ username: this.state.username });
    console.log("login" + this.event.newUserId);
  }
  componentDidMount() {
    this.props.history.push('')
  }
  handleGoBack()
  {
    window.history.back();
  }

  render() {
  
    return (
      
        <div>
          

          {' '}
           {/* <ButtonToggle color="primary" onClick={()=>this.handleGoBack}>Back</ButtonToggle>  */}
          <Route path="/" exact component={DashboardWrapper} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/login" exact component={Signup} />
          <Route path="/dashboard/login/activitytracker" exact component={Tracker}/>
          <Route path="/dashboard/news" exact component={News} />
          <Route path="/dashboard/news/:id" component={NewsDescription} />
            
         
        </div>
      
    );
  }
}
export default withRouter(App);