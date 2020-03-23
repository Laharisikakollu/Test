
import React, { Component } from 'react';
import Signup from './signup';
import News from './news';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

export default class Dashboard extends Component {
    componentDidMount() {
        
    }
    render() {
        return (<div>
            <Link to='/dashboard/login'>Signup</Link>
            <br></br>
            <Link to='/dashboard/news'>News</Link>
        </div>);
    }
}