import React, { Component } from 'react';
import io from 'socket.io-client'; // hämtar functionen io() från socket.io-client
import { loginObj } from './login'; // hämtar objektet loginObj från login.js
import {emojify} from 'react-emojione';  // hämtar objektet loginObjemojify från react-emojione
const Linkify = require('linkifyjs/react'); // hanterar länkar

function convertUrlEmoji(str){ // konverterar url till en emoji
  let options = {/* … */};
  let content = emojify(str); // konverterar strängen (t.ex. '':heart') till en emoji
  return <Linkify tagName="span" options={options}>{content}</Linkify>; // skapar LINK 
    }

function scrollBottom(){ // skrollar upp eller ner                                  <------------------------------------ ändra
  let element = document.querySelector(".main"); // pekar på .main
      element.scrollTop = element.scrollHeight; // scrollar <--------------------------------------------------- ?
}

function Unix_timestamp(t){ // sätter en timestamp på chat-medelanden                <------------------------------------ ändra
  let ts = new Date(t);
  return ts.toLocaleString() + " ";
}

function createUser(str) {
  return (
  <div key={str.id}><br/>
  <span className="messTime"><b>{Unix_timestamp(str.timestamp)}</b></span><br/>
  <span className="userName"><b>{str.username + ":    "}</b></span>
  <span className="userMess">{convertUrlEmoji(str.content)}</span>
  </div>
  );
}

class Chat extends Component {                                               //<------------------------------------ ändra

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
    scrollBottom();
}

  componentWillUnmount(){
    this.socket.disconnect();
    this.socket = null;
}

  onChange = (e) => this.setState({content:e.target.value});

  /*
  onEnterPress = (e) => { // <-------------------------------------------------------- Hmmm.....?
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.onClick();
    }
  }
*/

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

  render() {

    return (

    <div className="mainRoot">                                     
   
    <div className="mainHeader">                                        
    
    <span className="mainChatName"><b>Username:</b> {this.state.username}</span> 
    </div>
    <div className="main window">{this.state.messages.map(createUser)}</div>    
    <textarea maxLength="200" placeholder="Message" onChange={this.onChange} onKeyDown={this.onEnterPress} className="inputText" type="text"/>
    <button onClick={this.onClick} className="sendBtn">Send</button> 
    <div className="textError"></div>  
    </div>
    );
  }
}

export default Chat;  //<----------------------------- ändra
