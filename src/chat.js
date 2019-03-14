//=============== import ===============//
import React, { Component } from 'react';
import io from 'socket.io-client';
import { loginObj } from './login';
import {emojify} from 'react-emojione';




//=============== emojis ===============//
function convertEmoji(str){
  let options = {};
  let content = emojify(str);
  return <Link tagName="span" options={options}>{content}</Link>;
    }

//=============== URL:s ===============//
const Link = require('linkifyjs/react');



//=============== scrolls down to latest message ===============//
function scrollDown(){
  let element = document.querySelector(".main");
      element.scrollTop = element.scrollHeight;
}



//=============== timestamp ===============//
function Timestamp(t){
  let now = new Date(t);
  return now.toLocaleString() + " ";
}



//=============== new messege ===============//
function newChatBubble(str) {
  return (
  <div key={str.id}><br/>
  <span className="timestamp"><b>{Timestamp(str.timestamp)}</b></span><br/>
  <span className="userName"><b>{str.username + ":    "}</b></span>
  <span className="userMess">{convertEmoji(str.content)}</span>
  </div>
  );
}



//=============== chat-content ===============//
class Chat extends Component {                                            
  constructor(props) {
    super(props);
    this.state = {username: "", content: "",
     messages: [
    {
      id: "",
      username: "",
      content: "",
      timestamp: 0,
    },
  ]};
}




//=============== "when component changed" ===============//
  componentDidMount() {
    document.title = 'CHAT';
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
    this.socket.on('messages', function(data){
      this.setState({ messages: data });
    }.bind(this));
    this.setState({username: loginObj.loginName});
    this.socket.on('new_message', function(data){
      this.setState({messages: [...this.state.messages, data]});
   }.bind(this));
  }
  componentDidUpdate() {
    scrollDown();
}
  componentWillUnmount(){
    this.socket.disconnect();
    this.socket = null;
}
  



//=============== input - textarea ===============//
  onClick = () => {
    let textarea = document.querySelector(".inputText");
    if (textarea.value !== ""){
      textarea.value = "";
      this.socket.emit('message', {
        username: this.state.username,
        content: this.state.content ,
      }, (response) => {
        this.setState({messages: [...this.state.messages, response.data.newMessage]});
      });
      textarea.placeholder = "Message";
    }
    else{
      textarea.placeholder = "Write SOMETHING";
    }
  }
  
  onChange = (e) => this.setState({content:e.target.value});

  




  //=============== render ===============//
  render() {
    return (
    <div className="root">
      
      <div className="mainHeader">                                        
        <span className="mainChatName"><b>Username:</b> {this.state.username}</span> 
        <button onClick={this.props.onOut} className="logOutButton" title="Logout">Logout</button>
      </div>

    <div className="main window">{this.state.messages.map(newChatBubble)}</div>    
    <textarea maxLength="200" placeholder="Message" className="inputText" type="text"
              onChange={this.onChange} onKeyDown={this.onEnterPress}/>
    <button onClick={this.onClick} className="sendBtn">Send</button>  
    </div>
    );
  }
}


//=============== export ===============//
export default Chat;
