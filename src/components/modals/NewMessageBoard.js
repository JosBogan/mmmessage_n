import React from 'react'
import axios from 'axios'

import Auth from '../../lib/auth'

class NewMessageBoard extends React.Component {

  state = {
    users: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log(res.data)
      this.setState({ users: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div 
        className="new_message_board"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="new_message_board_header">New Message Board</h2>
        <div>
          <input />
        </div>
      </div>
    )
  }
}

export default NewMessageBoard