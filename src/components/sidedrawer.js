// import React from 'react';
// import './sidedrawer.css';
// import Report from '../components/Report/Report';
// import News from './news';
// import { BrowserRouter as Router, Link,Switch, Route } from 'react-router-dom';
// import Tracker from './Tracker';
// const sidedrawer = props => (
//     <Router>
//    <nav className="side">
//        <ul>
//            <Link to="/activities">Activities</Link>
//             <Link to="/report">Report</Link>    
//        </ul>
       
//    </nav>
  
//    {/* <Route path="/activity" exact component={Tracker} /> */}
//     <Route path="/report" component={Report}/>
    
//     </Router>
    
// );

// export default sidedrawer;

import React from "react";
import { slide as Menu } from "react-burger-menu";
import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Tracker from '../components/Tracker';
import Report from './Report/Report';
import './sidedrawer.css';

class SideDrawer extends React.Component {
    render() {
        return (
            <div >
                
                <Menu >
                    <Link to="/activities">Activities</Link>
                    <Link to="/report">Report</Link>
                </Menu>
                
                <label className="HelloUser"><h2>Hello {this.props.username}!!</h2></label>
                 
                <button onClick={this.props.onLogout} style={{ backgroundColor:"white" ,color:"#282c34" }} className="LogoutBtn">LOGOUT</button> 
              
                {/* <h1>Hello {this.props.name}</h1> */}
                <Switch>
                    <Route path="/activities">
                        <Tracker username={this.props.username}/>
                    </Route>
                    <Route path="/report">
                        <Report username={this.props.username} />
                    </Route>
                </Switch>
            </div>

        );
    }
};
export default SideDrawer;