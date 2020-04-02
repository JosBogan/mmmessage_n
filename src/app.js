import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import './styles/messages.scss'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


// import io from 'socket.io-client'

import SecureRoute from './components/auth/SecureRoute'
import UnSecureRoute from './components/auth/UnSecureRoute'

import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'



class App extends React.Component {

  state = {
    socket: null,
    messages: []
  }

  // async componentDidMount() {

  //   const socket = io('localhost:4000')
  //   this.setState({ socket })

  //   socket.on('chat message', (message) => {
  //     console.log(message)
  //     const messages = [...this.state.messages, message]
  //     this.setState({ messages })
  //   })
  // }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <UnSecureRoute path="/register" component={Register}/>
          <UnSecureRoute path="/login" component={Login} />
          <SecureRoute 
            path="/boards" 
            render={(props => (
              <Home socket={this.state.socket} messages={this.state.messages}/>
            ))}/>
          {/* <Home 
            socket={this.state.socket}
            messages={this.state.messages}
          /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)