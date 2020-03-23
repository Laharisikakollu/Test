import React from 'react';
const signUp = (props) => {
    const user={
        username:null,
        password:null
    }

    return (
        <div>
            <div>
                <input type="text"  placeholder="username" id='myText'onChange={user.username= document.getElementById("myText")} name="username"/>
                <input type="password" placeholder="Password" id='myTexts'onChange={user.password=document.getElementById("myTexts")} name="password"/>
               {user.password}
                <button  onSubmit={props.submitSignUp(user.username,user.password)}>SignUp</button>
            </div>
        </div>
    );
}
export default signUp;