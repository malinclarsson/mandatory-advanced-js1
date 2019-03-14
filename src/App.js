import React, { Component } from 'react';
import Login from './login.js';
import Chat from './chat.js'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {isLoggedIn: false}; // by default
  }

  onLogin = () => this.setState({isLoggedIn: true});
  onOut = () => this.setState({isLoggedIn: false});

  render() {
    return  (
          this.state.isLoggedIn ? <Chat onOut={this.onOut}/> : <Login onLogin={this.onLogin}/>
          );
    }
}

export default App;
