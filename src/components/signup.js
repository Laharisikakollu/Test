import React from 'react';
import axios from 'axios';
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
            // List:[{date:[],activity:[],endTime:[],dur:[],
            // startTime:[]}],
            submit:false,
            click:false
            
        }
       
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

        // this.setState({submit:true,
        //     click:!this.state.click,
            
        //            })

    //     if(!localStorage.getItem(this.state.username))
    //     {
        
    //     localStorage.setItem(this.state.username,JSON.stringify(this.state));
    // }
        // this.setState({
        //     click:!this.state.click
        // })

    if (this.state.password === "" && this.state.username === "") {
        this.setState({
            submit: false
            // click:!this.state.click,
        })}
        // let obj = {
        //     password: this.state.password,
        //     activities: {
        //         //    date : [{
        //         //         activity: '',
        //         //         startTime: null,
        //         //         endTime: null,
        //         //     }]
        //     }
        // }
        // if (!localStorage.getItem(this.state.username)) {
        //     localStorage.setItem(this.state.username, JSON.stringify(obj))
        // }
        // localStorage.setItem("signedInUser", this.state.username)
        else if(this.state.password !== "" && this.state.username !== "")
        {
            axios.post('http://localhost:8000/users', {
            userName: this.state.username,
            password: this.state.password
        }).then(function (response) {
            console.log(response);
            alert('SignUp Successful');
        })
        .catch(err => {
            console.log(err)
            this.setState({  username: '', password: '' })
            alert('Username already exists', '', 3000);
        })
    }
    else {
       alert('No username or password', 'Click me!', 3000);
    }


    }

    handleLogin = () => {
        let self = this
         axios.post('http://localhost:8000/login', {
             userName: this.state.username,
             password: this.state.password
         })
         .then(function (response) {
             console.log(response);
             localStorage.setItem("token", response.data.token)
             self.setState({ submit:true,click:true})
             alert('Login successful');
             self.setState({  username: '', password: '' })
             console.log("setstate")
         }).catch(err => {
             console.log(err)
             self.setState({  username: '', password: '' })
             alert('Username or password Incorrect', '', 3000);
         })
  
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
            <MDBBtn color="primary" className="Signupbutton" onClick={this.handleSubmit} >SignUp</MDBBtn>
            <MDBBtn color="primary" className="Login" onClick={this.handleLogin} >Login</MDBBtn>
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