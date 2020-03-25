import React from 'react'

class NewComment extends React.Component {

  state = {
    message: null
  }

  handlesubmit = (event) => {
    event.preventDefault()
    console.log(this.state.message)
    this.props.closeNewComment()
  }

  handleChange = () => {
    this.setState({ message: event.target.value })
  }

  render() {
    return (
      <div 
        className="message_wrapper"
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