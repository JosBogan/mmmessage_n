import React from 'react'

class NewComment extends React.Component {

  state = {
    message: null
  }

  handlesubmit = (event) => {
    event.preventDefault()
    const chatOffset = document.querySelector('.chats').getBoundingClientRect().width
    this.props.socket.emit('chat message', {
      message: this.state.message,
      coords: {
        x: ((this.props.coords.x - chatOffset) - this.props.canvasPosition.x) / this.props.scale,
        y: ((this.props.coords.y) - this.props.canvasPosition.y) / this.props.scale
      }
    })
    
    this.props.closeNewMessage()
  }

  handleChange = () => {
    this.setState({ message: event.target.value })
  }

  render() {
    return (
      <div 
        className="new_message_wrapper"
        style={{
          top: this.props.coords.y,
          left: this.props.coords.x
        }}
        top={this.props.coords.y}
        left={this.props.coords.x}
      >
        <form 
          className="new_message_form_wrapper"
          onSubmit={this.handlesubmit}
          onKeyDown={(event) => event.key === 'Enter' && this.handlesubmit(event)}
        >
          <textarea
            className="new_message_text_area" 
            onChange={this.handleChange}
            autoFocus
          />
          <div
            className="new_message_button_wrapper"
          >
            <button 
              className="new_message_submit_button"
              type="submit"
            >Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default NewComment