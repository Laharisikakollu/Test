import React from 'react';

import Tracker from './Tracker';
import './signup.css';
class SignUp extends React.Component {
    constructor(props)
    {
       super(props)
        this.state={
            username:'',
            password:'',
            List:[{date:[],activity:[],endTime:[],
            startTime:[]}],
            submit:false,
            
        }
        this.handleFormSubmit = this.handleSubmit.bind(this);
    }
        
    handleChange=(e)=>
    {
       this.setState({username: e.target.value})
    }
    handlePassword =(e)=>
    {
      this.setState({password: e.target.value})
    }
    handleSubmit = (e)=> {

        this.setState({submit:true,
                   })

        if(!localStorage.getItem(this.state.username))
        {
        
        localStorage.setItem(this.state.username,JSON.stringify(this.state));
    }
    }


render()
{
    

    return (
        <div className="mainContainer">
            <h1 className="Text">SIGN UP</h1>
            UserName:<input type="text" className="inputField" onChange={this.handleChange}></input><br></br><br></br>
            Password:<input type="password"   className="inputField" onChange={this.handlePassword}></input>
            <button  className="Signupbutton" onClick={this.handleSubmit} >signup</button>
            {this.state.submit ? <Tracker username={this.state.username}></Tracker>:null}
   
           
            
        </div>
    );
}
}

export default SignUp;