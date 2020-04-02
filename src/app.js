import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import './styles/messages.scss'
import axios from 'axios'


import io from 'socket.io-client'

import Home from './components/Home'

// const messages = []

// const socket = io('localhost:4000')

// socket.on('chat message', (message) => {
//   console.log(message)
//   messages.push(message)
// })


class App extends React.Component {

  state = {
    socket: null,
    messages: []
  }

  async componentDidMount() {

    const socket = io('localhost:4000')
    this.setState({ socket })

    socket.on('chat message', (message) => {
      console.log(message)
      const messages = [...this.state.messages, message]
      this.setState({ messages })
    })
  }

  render() {
    return (
      <Home 
        socket={this.state.socket}
        messages={this.state.messages}
      />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)