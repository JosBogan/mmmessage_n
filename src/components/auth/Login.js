import React from 'react'
import axios from 'axios'

import Auth from '../../lib/auth'

class Login extends React.Component {

  state = {
    data: {
      email: null,
      password: null
    }
  }

  onChange = (event) => {
    const data = { ...this.state.data, [event.target.name]: event.target.value }
    this.setState({ data })
  }

  onSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post('/api/login', this.state.data)
      console.log(res.data)
      Auth.setToken(res.data.token)
      this.props.history.push('/boards')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Email</label>
            <input 
              onChange={this.onChange}
              name="email"
            />
          </div>
          <div>
            <label>Password</label>
            <input 
              onChange={this.onChange}
              name="password"
              type="password"/>
          </div>
          <button type="Submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Login