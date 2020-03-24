import React from 'react'


class Home extends React.Component{

  state = {
    clicked: false,
    mouseStartPosition: null,
    mouseDifference: {
      x: 0,
      y: 0
    }, // Difference between mouse starting position and dragged-to position
    canvasOffset: {
      x: -2000,
      y: -1250
    },
    canvasPosition: {
      x: 0,
      y: 0
    },
    // boardPosition: [-2000, -1250], // final position of the board when released (mouse diff + previous board position)
    // relativeDifference: [-2000, -1250], // relative mouse difference to the board rather than screen
    // prevMouseLocation: {
    //   x: 0,
    //   y: 0
    // },
    scale: 1
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleDrag)
    window.addEventListener('mouseup', this.handleMouseUp)
  }


  handleDrag = () => {
    if (!this.state.clicked) return

    // Gets the diff between the previous mouse position and new
    const mouseDifference = {
      x: (event.clientX - this.state.mouseStartPosition.x),
      y: (event.clientY - this.state.mouseStartPosition.y)
    }


    // Sets the offset
    // const canvasOffset = {
    //   x: this.state.canvasOffset.x + mouseDifference.x,
    //   y: this.state.canvasOffset.y + mouseDifference.y
    // }

    console.log(this.state.scale)
    const canvasPosition = {
      x: (this.state.canvasPosition.x + mouseDifference.x),
      y: (this.state.canvasPosition.y + mouseDifference.y)
    }

    console.log(canvasPosition)

    // Sets the new Mouse start Position for new tick of event
    const mouseStartPosition = {
      x: event.clientX,
      y: event.clientY
    }
  
    // this.setState({ mouseDifference, canvasOffset, mouseStartPosition })
    this.setState({ mouseDifference, canvasPosition, mouseStartPosition })
  }

  handleClick = () => {
    const mouseStartPosition = { x: event.clientX, y: event.clientY }
    console.log(mouseStartPosition)
    this.setState({ clicked: true, mouseStartPosition })
  }

  // handleMouseUp = () => {
  //   if (!this.state.clicked) return
  //   const boardPosition = [this.state.mouseDifference[0] + this.state.boardPosition[0], this.state.mouseDifference[1] + this.state.boardPosition[1]]
  //   this.setState({ clicked: false, boardPosition })
  // }

  handleMouseUp = () => {
    if (!this.state.clicked) return
    console.log(this.state.canvasPosition)
    this.setState({ clicked: false })
  }


  // handleScroll = () => {
  //   // event.preventDefault()
  //   let scale = this.state.scale
  //   scale += event.deltaY * -0.01
  //   scale = Math.min(Math.max(.2, scale), 2)

  //   const rect = event.target.getBoundingClientRect()
  //   const scaleChange = scale - this.state.scale
  //   const zoomPoints = {
  //     x: Math.round(event.clientX - rect.x),
  //     y: Math.round(event.clientY - rect.y)
  //   }
  //   const offset = {
  //     x: Math.round(-(zoomPoints.x * (scaleChange))),
  //     y: Math.round(-(zoomPoints.y * (scaleChange)))
  //   }

  //   const canvasOffset = {
  //     x: this.state.canvasOffset.x + offset.x,
  //     y: this.state.canvasOffset.y + offset.y
  //   }
  //   this.setState({ scale, canvasOffset })
  // }

  handleScroll = () => {
    const xs = (event.clientX - this.state.canvasPosition.x) / this.state.scale
    const ys = (event.clientY - this.state.canvasPosition.y) / this.state.scale
    
    let scale = this.state.scale
    // get scroll direction & set zoom level
    scale += event.deltaY * -0.01
    scale = Math.min(Math.max(.2, scale), 2)
    console.log(scale)
    // reverse the offset amount with the new scale
    const canvasPosition = {
      x: event.clientX - xs * scale,
      y: event.clientY - ys * scale
    }
    this.setState({ canvasPosition, scale })
  }

  render() {
    // console.log(this.state.canvasOffset)
    return (
      <div className="container">
        {/* <section className="chats"></section> */}
        <section className="board">
          <div 
            className="board_panel"
            style={{
              position: 'relative',
              // left: `${this.state.canvasOffset.x}px`,
              // top: `${this.state.canvasOffset.y}px`,
              // left: '-2000px',
              // top: '-1250px',
              left: '0px',
              top: '0px',
              transform: `scale(${this.state.scale}) translate(${this.state.canvasPosition.x}px, ${this.state.canvasPosition.y}px)`
            }}
            onMouseDown={this.handleClick}
            // onMouseUp={this.handleMouseUp}
            // onMouseMove={this.handleDrag}
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