import React from 'react'

class Home extends React.Component{

  state = {
    clicked: false,
    mouseStartPosition: null,
    mouseDifference: [0, 0], // Difference between mouse starting position and dragged-to position
    boardPosition: [0, 0], // final position of the board when released (mouse diff + previous board position)
    relativeDifference: [0, 0], // relative mouse difference to the board rather than screen
    scale: 1
  }

  handleDrag = () => {
    if (!this.state.clicked) return
    const mouseDifference = [event.clientX - this.state.mouseStartPosition[0], event.clientY - this.state.mouseStartPosition[1]]
    // if (mouseDifference[0] + this.state.boardPosition[0] <= 50 && mouseDifference[1] + this.state.boardPosition[1] <= 50) 
    const relativeDifference = [event.clientX + this.state.boardPosition[0] - this.state.mouseStartPosition[0], event.clientY + this.state.boardPosition[1] - this.state.mouseStartPosition[1]]
    this.setState({ mouseDifference, relativeDifference })
  }

  handleClick = () => {
    this.setState({ clicked: true, mouseStartPosition: [event.clientX, event.clientY] })
  }

  handleMouseUp = () => {
    const boardPosition = [this.state.mouseDifference[0] + this.state.boardPosition[0], this.state.mouseDifference[1] + this.state.boardPosition[1]]
    this.setState({ clicked: false, boardPosition })
  }

  handleScroll = () => {
    event.preventDefault()
    let scale = this.state.scale
    scale += event.deltaY * -0.01
    scale = Math.min(Math.max(.3, scale), 2)
    console.log(scale)
    this.setState({ scale })
  }

  render() {
    return (
      <div className="container">
        <section className="chats"></section>
        <section className="board">
          <div 
            className="board_panel"
            style={{ transform: 
              `translate(${this.state.relativeDifference[0]}px, ${this.state.relativeDifference[1]}px) scale(${this.state.scale})` }}
            onMouseDown={this.handleClick}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleDrag}
            onWheel={this.handleScroll}
          >
            <div>gdfs</div>
          </div>
        </section>
      </div>
    )
  }
}

export default Home