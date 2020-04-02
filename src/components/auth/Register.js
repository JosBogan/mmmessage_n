import React from 'react'
import axios from 'axios'

class Register extends React.Component {

  state = {
    data: {
      username: null,
      email: null,
      password: null,
      passwordConfirmation: null
    }
  }

  onChange = (event) => {
    const data = { ...this.state.data, [event.target.name]: event.target.value }
    this.setState({ data })
  }

  onSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post('/api/register', this.state.data)
      console.log(res.data)
      this.props.history.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Username</label>
            <input 
              onChange={this.onChange}
              name="username"
            />
          </div>
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
          <div>
            <label>Password Confirmation</label>
            <input 
              onChange={this.onChange}
              name="passwordConfirmation"
              type="password"/>
          </div>
          <button type="Submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Register