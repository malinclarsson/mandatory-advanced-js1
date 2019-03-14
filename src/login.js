import React, { Component } from 'react';
import './App.css';

function checkUsername(str){
   let loginButton = document.querySelector(".loginButton");
   let validation1 = document.querySelector("#validation1");
   let validation2 = document.querySelector("#validation2");
   let regEx = /^[0-9a-zA-Z_-\s]/;

    if(str.match(regEx)){

     loginButton.removeAttribute("disabled");
     validation1.textContent = "";
     validation2.textContent = "";
     
      return str;
     }
     else{
        loginButton.setAttribute("disabled", "disabled");
        validation1.textContent = "Username should be 1 -12 characters long.";
        validation2.textContent = "Only use letters, numbers, spaces and - / _";
     }
  }

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {login: null, isLoggedIn: false};
    }

    componentDidMount(){
        document.title = 'LOGIN'   
        checkUsername("");   
    }
    
    onChange = (e) =>{
        let value = e.target.value;
        let validText = checkUsername(value);
        loginObj.loginName = validText;
        this.setState({login: validText});
      }

    render (){
        
        return (
          <>
                <div className="loginWindow">                                                         
                <div className="loginTitle">Choose a username:</div><br/>                       
                <input className="loginInput" type="text" maxLength="12" onChange={this.onChange} placeholder="Username"/> 
                <button className="loginButton" onClick={this.props.onLogin}>Login</button>          
                <div id="validation1" className="validation"></div>                                  
                <div id="validation2" className="validation"></div>                                  
                </div>
          </>      
                );
    }
  }

  export default Login;
  export let loginObj = {loginName:""};  
