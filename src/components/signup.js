import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
// import './signup.css';
import SideDrawer from './sidedrawer';
class SignUp extends React.Component {
    constructor(props)
    {
       super(props)
        this.state={
            username:'',
            password:'',
            List:[{date:[],activity:[],endTime:[],dur:[],
            startTime:[]}],
            submit:false,
            click:false
            
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
            click:!this.state.click,
            
                   })

        if(!localStorage.getItem(this.state.username))
        {
        
        localStorage.setItem(this.state.username,JSON.stringify(this.state));
    }
    }

    handleLogout = (e) => {
        // this.props.history.goBack();
        this.setState({
            username: null,
            password: null,
            click: !this.state.click
        });
    }


render()
{
    

    return (
        <div className="mainContainer">
            
            {/* UserName:<input type="text" className="inputField" onChange={this.handleChange}></input><br></br><br></br>
            Password:<input type="password"   className="inputField" onChange={this.handlePassword}></input>
            <button  className="Signupbutton" onClick={this.handleSubmit} >signup</button> */}
            {this.state.click ? 
            (<div>
                {/* <button onClick={this.handleLogout}>Logout</button> */}
                <SideDrawer username={this.state.username} onLogout={this.handleLogout}></SideDrawer>
            
            </div>)
            :
            (<div>
                <MDBContainer>
                    <MDBRow>
                    <MDBCol md="6">
                        <form>
        <p className="h5 text-center mb-4" >Task Tracker</p>
               
                <MDBInput label="Username"icon="user" group type="text" className="inputField" onChange={this.handleChange}></MDBInput><br></br><br></br>
           <MDBInput label="Password" icon="lock" group type="password"   className="inputField" onChange={this.handlePassword}></MDBInput>
            <MDBBtn color="primary" className="Signupbutton" onClick={this.handleSubmit} >SignIn</MDBBtn>
            </form>
        </MDBCol>
        </MDBRow>
        </MDBContainer>
                </div>)
            }
   
           
            
        </div>
    );
}
}

export default SignUp;