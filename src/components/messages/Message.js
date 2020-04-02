import React from 'react'

class Message extends React.Component {

  state = {
    clicked: false,
    splineCoords: {
      start: {
        x: null,
        y: null
      },
      end: {
        x: null,
        y: null
      }
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.newMessageSpline)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  newMessageSpline = (event) => {
    if (!this.state.clicked) return
    const splineCoords = {
      start: { ...this.state.splineCoords.start },
      end: {
        x: event.clientX,
        y: event.clientY
      }
    }
    this.setState({ splineCoords })
  }

  onMouseDown = (event) => {
    event.stopPropagation()
    const splineCoords = {
      start: {
        x: event.clientX,
        y: event.clientY
      },
      end: {
        x: null,
        y: null
      }
    }
    this.setState({ clicked: true, splineCoords })
  }

  onMouseUp = (event) => {
    if (!this.state.clicked) return
    this.props.createComment(event)
    this.setState({ clicked: false })
  }

  render() {
    return (
      <div 
        className="message_wrapper"
        style={{
          left: this.props.coords.x,
          top: this.props.coords.y
        }}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        {/* {this.state.splineCoords.end &&
        } */}
        <p className="message_text">{this.props.messageText}</p>
      </div>
    )
  }
}

export default Message