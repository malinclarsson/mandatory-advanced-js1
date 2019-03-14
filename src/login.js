//=============== import ===============//
import React, { Component } from 'react';
import './App.css';



//=============== check if username follows rules ===============//
function checkUsername(str){
   let logInButton = document.querySelector(".logInButton");
   let validation1 = document.querySelector("#validation1");
   let validation2 = document.querySelector("#validation2");
   let regEx = /^[0-9a-zA-Z_-\s]/;

    if(str.match(regEx)){
     logInButton.removeAttribute("disabled");
     validation1.textContent = "";
     validation2.textContent = "";
     
      return str;
     }
     else{
        logInButton.setAttribute("disabled", "disabled");
        validation1.textContent = "Username should be 1 -12 characters.";
        validation2.textContent = "Can only contain a-z, 0-9, spaces and - / _.";
     }
  }




//=============== set login ===============//
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
    

      
    
    //=============== render ===============//
    render (){
        
        return (
          <>
                <div className="loginWindow">                                                         
                <div className="loginTitle">Choose a username:</div><br/>                       
                <input className="loginInput" type="text" maxLength="12" onChange={this.onChange} placeholder="Username"/> 
                <button className="logInButton" onClick={this.props.onLogin}>Login</button>          
                <div id="validation1" className="validation"></div>                                  
                <div id="validation2" className="validation"></div>                                  
                </div>
          </>      
                );
    }
  }


//=============== export ===============//
  export default Login;
  export let loginObj = {loginName:""};  
