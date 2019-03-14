import React, { Component } from 'react'; // hämtar React
import Login from './login.js'; // hämtar functionen/conductorn Login() från login.js
import Chat from './chat.js' // hämtar functionen/conductorn Chat() från chat.js
import './App.css'; // hämtar css.

class App extends Component {
  constructor(props){
    super(props);
    this.state = {isLoggedIn: false}; // default på login ar 'false'
  }

  onLogin = () => this.setState({isLoggedIn: true}); // när functionen 'onLogin' kallas, sätts logins värde till 'true'
  onOut = () => this.setState({isLoggedIn: false}); // när functionen 'onOut' kallas, sätts logins värde tillbaka till 'false'

  render() {
    return  (
       // OM isLoggedIn är 'true' -> visa Chat (med onOut = close-knapp), ANNARS gå tillbaka till Login
          this.state.isLoggedIn ? <Chat onOut={this.onOut}/> : <Login onLogin={this.onLogin}/>
          );
    }
}

export default App; // exportera allting i den här filen (App.js)
