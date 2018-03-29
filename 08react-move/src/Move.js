import React, { Component } from 'react';
import './Move.css';

class MoveControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 10,
      top: 5,
      left: 5,
    };
    this.speed = this.speed.bind(this);
    this.keypress = this.keypress.bind(this);
    this.sliderDefault = this.sliderDefault.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.keypress);
  }

  speed(e) {
    this.setState({
      speed: parseInt(e.target.value, 10),
    });
  }

  keypress(e) {
    var speed = this.state.speed;
    var key = e.keyCode;
    var topPosition = this.state.top;
    var leftPosition = this.state.left;

    if (key === 37) {
      leftPosition -= speed;
      if (leftPosition <= speed) {
        this.setState({ left: 5 });
      } else if (leftPosition > 5) {
        this.setState({ left: leftPosition });
      }
    } else if (key === 39) {
      leftPosition += speed;
      var distanceRight = 450 - leftPosition;
      if (speed >= distanceRight) {
        this.setState({ left: 445 });
      } else if (leftPosition < 445) {
        this.setState({ left: leftPosition });
      }
    } else if (key === 38) {
      topPosition -= speed;
      if (topPosition <= speed) {
        this.setState({ top: 5 })
      } else if (topPosition > 5) {
        this.setState({ top: topPosition });
      }
    } else if (key === 40) {
      topPosition += speed;
      var distanceDown = 450 - topPosition;
      if (speed >= distanceDown) {
        this.setState({ top: 445 });
      } else if (topPosition < 445) {
        this.setState({ top: topPosition });
      }
    }
  }

  sliderDefault(e) {
    e.preventDefault();
  }

  reset(e) {
    this.setState({
      speed: 10,
      top: 5,
      left: 5
    })
  }

  render() {
    var squareStyle = {
      width: "500px",
      height: "500px",
      margin: "25px auto",
      background: "rgb(25,25,25)",
      border: "15px solid #f6ea8c",
      borderRadius: "10px"
    };
    var moveStyle = {
      position: "relative",
      left: this.state.left - 225,
      top: this.state.top,
      width: "50px",
      height: "50px"
    }
    return (
      <div className='container-fluid'>
        <div style={squareStyle}>
          <img src='http://www.stevenbready.com/images/icons/react.png' alt='react-icon.png' style={moveStyle} />
        </div>
        <input type='range' value={this.state.speed} min={1} max={50} onChange={this.speed} onKeyDown={this.sliderDefault} />
        <p style={{ color: "#f26d5b", }}>Speed: {this.state.speed}</p>
        <button className='btn mb-3' style={{background: '#f6ea8c'}} onClick={this.reset}>Reset</button>
      </div>
    );
  }
}


class Move extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This is a simple demo to move an icon in the screen.</p>
          <p>You can control the moving speed and reset everything by click the reset button.</p>
        </div>
        <div className='text-center'>
          <h3 className='pt-3' style={{color: '#f26d5b'}}>Move React with the Arrow Keys</h3>
          <MoveControl />
        </div>
      </div>
    );
  }
}

export default Move;
