import React from 'react'

class NewComment extends React.Component {

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
        <textarea className="new_message_text_area" autoFocus/>
      </div>
    )
  }
}

export default NewComment