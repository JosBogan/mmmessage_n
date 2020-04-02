import React from 'react'
import NewComment from './messages/NewMessage'
import Message from './messages/Message'

class Home extends React.Component{

  state = {
    clicked: false,
    mouseStartPosition: null,
    canvasPosition: {
      x: -2000 + (window.innerWidth / 2),
      y: -1250 + (window.innerHeight / 2)
    },
    scale: 1,
    newComment: {
      toggle: false,
      coords: {
        x: null,
        y: null
      }
    }
  }

  newCommentDefault = {
    toggle: false,
    coords: {
      x: null,
      y: null
    }
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleDrag)
    window.addEventListener('mouseup', this.handleMouseUp)
  }


  handleDrag = (event) => {
    if (!this.state.clicked) return
    // Gets the diff between the previous mouse position and new
    const mouseDifference = {
      x: (event.clientX - this.state.mouseStartPosition.x),
      y: (event.clientY - this.state.mouseStartPosition.y)
    }
    const canvasPosition = {
      x: (this.state.canvasPosition.x + mouseDifference.x),
      y: (this.state.canvasPosition.y + mouseDifference.y)
    }

    // Sets the new Mouse start Position for new tick of event
    const mouseStartPosition = {
      x: event.clientX,
      y: event.clientY
    }

    this.setState({ canvasPosition, mouseStartPosition, newComment: this.newCommentDefault })
  }

  closeNewMessage = () => {
    this.setState({ newComment: this.newCommentDefault })
  }

  handleClick = (event) => {
    const mouseStartPosition = { x: event.clientX, y: event.clientY }
    this.setState({ clicked: true, mouseStartPosition, newComment: this.newCommentDefault })
  }

  handleMouseUp = () => {
    if (!this.state.clicked) return
    this.setState({ clicked: false })
  }

  handleScroll = (event) => {
    let scale = this.state.scale
    scale += event.deltaY * -0.01
    scale = Math.min(Math.max(.2, scale), 2)

    const chatOffset = document.querySelector('.chats').getBoundingClientRect().width

    const cds = {
      x: ((event.clientX - chatOffset) - this.state.canvasPosition.x) / this.state.scale,
      y: (event.clientY - this.state.canvasPosition.y) / this.state.scale
    }

    const canvasPosition = {
      x: (event.clientX - chatOffset) - cds.x * scale,
      y: event.clientY - cds.y * scale
    }

    this.setState({ scale, canvasPosition , newComment: this.newCommentDefault })
  }

  createComment = (event) => {
    const newComment = {
      toggle: !this.state.newComment.toggle, 
      coords: { 
        x: event.clientX,
        y: event.clientY
      } 
    }
    this.setState({ newComment })
  }

  render() {
    return (
      <div className="container">
        <section className="chats"></section>
        <section className="board">
          <div 
            className="board_panel"
            style={{
              position: 'relative',
              transform: `translate(${this.state.canvasPosition.x}px, ${this.state.canvasPosition.y}px) scale(${this.state.scale}) `
            }}
            onMouseDown={this.handleClick}
            onWheel={this.handleScroll}
            onDoubleClick={this.createComment}
          >
            <Message 
              createComment={this.createComment}
              coords={{
                x: 2000,
                y: 1250
              }}
              messageText={'This is the Root message'}
            />
            {this.props.messages.map(message => (
              <Message 
                key={message.coords.y}
                createComment={this.createComment}
                messageText={message.message}
                coords={message.coords}
              />
            ))}
          </div>
          {this.state.newComment.toggle && 
          <NewComment 
            coords={this.state.newComment.coords}
            closeNewMessage={this.closeNewMessage}
            socket={this.props.socket}
            canvasPosition={this.state.canvasPosition}
            scale={this.state.scale}
          />
          }
        </section>
      </div>
    )
  }
}

export default Home