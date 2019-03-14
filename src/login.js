import React, { Component } from 'react';
import './App.css';

function filterLetter(inputtxt){                                                           //<----------------------------- ändra
   let btn = document.querySelector(".loginBtn");
   let mess1 = document.querySelector("#loginMess1");                                      //<----------------------------- ändra
   let mess2 = document.querySelector("#loginMess2");                                      //<----------------------------- ändra
   let letters = /^[0-9a-zA-Z_-\s]+$/;

    if(inputtxt.match(letters)){
     btn.removeAttribute("disabled");
     mess1.textContent = "";
     mess2.textContent = "";
     
      return inputtxt;
     }
     else{
        btn.setAttribute("disabled", "disabled");
        mess1.textContent = "Login name between 1 to 12 letters.";                         //<----------------------------- ändra
        mess2.textContent = "Approved characters (0-9 a-z A-Z _-)";                        //<----------------------------- ändra
     }
  }

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {login: null, isLoggedIn: false};
    }

    componentDidMount(){
        document.title = 'LOGIN'   
        filterLetter("");   
    }
    
    onChange = (e) =>{
        let value = e.target.value;
        let validText = filterLetter(value);
        loginObj.loginName = validText;
        this.setState({login: validText});
      }

    render (){
        
        return (
          <>
                <div className="mainLogin">                                                         
                <div className="mainLoginTitle">Choose a username:</div><br/>                       
                <input className="mainLoginInput" type="text" maxLength="12" onChange={this.onChange} placeholder="Username"/> 
                <button className="loginBtn" onClick={this.props.onLogin}>Login</button>          
                <div id="loginMess1" className="loginMess"></div>                                  
                <div id="loginMess2" className="loginMess"></div>                                  
                </div>
          </>      
                );
    }
  }

  export default Login;
  export let loginObj = {loginName:""};  