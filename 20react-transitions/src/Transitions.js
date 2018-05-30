import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Transitions.css';


const transitionDivStyle = {
  width: '150px',
  height: '150px',
  padding: '10px',
  margin: '10px auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '22px',
  fontFamily: 'Avenir',
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: '75px',
  color: 'rgb(25,25,25)'
};


class Transitions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: true
    }
    this.toggleFade = this.toggleFade.bind(this);
  }

  toggleFade() {
    if (!this.state.fade) {
      this.setState({ fade: true });
    }
    else {
      this.setState({ fade: false });
    }
  }

  render() {
    const background = {
      background: '#c03546'
    };

    const btnBg = {
      background: '#a39f9f'
    }
    const btnStyle = this.state.fade ? background : btnBg;

    var component;
    if (this.state.fade) {
      component = (
        <div style = {Object.assign({}, transitionDivStyle, background)} onClick = {this.toggleFade} className = "transitionBox">
          <p>Click to fade out</p>
        </div>
      );
    }
    return (
      <div>
        <button style = {btnStyle} className='btn' onClick = {this.toggleFade}>{this.state.fade ? 'fade out' : 'fade in'}</button>
        <ReactCSSTransitionGroup
          transitionName="fadeDiv"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}>
          {component}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Transitions;
