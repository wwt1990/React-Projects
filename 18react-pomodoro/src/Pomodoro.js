import React, { Component } from 'react';
import toastr from 'toastr';
import './Pomodoro.css';

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 25,
      sec: 0,
      isStarted: false,
      isSession: true,
    }
    this.handleStartClick = this.handleStartClick.bind(this);
    this.reset = this.reset.bind(this);
    this.setSession = this.setSession.bind(this);
    this.setBreak = this.setBreak.bind(this);
    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleSecChange = this.handleSecChange.bind(this);
  }

  handleStartClick() {
    this.setState({ isStarted: !this.state.isStarted });
  }

  reset() {
    (this.state.isSession) ? this.setState({
                              isStarted: false,
                              min: 25,
                              sec: 0,
                            })
                            : this.setState({
                              isStarted: false,
                              min: 5,
                              sec: 0,
                            })
  }

  componentDidMount() {
    setInterval(() => {
      if(!this.state.isStarted) return false
      if (this.state.sec === 0) {
        if (parseInt(this.state.min, 10) === 0) {
          (this.state.isSession) ? toastr["info"]("Please take a break!") : toastr["info"]("Welcome back to work!")
          this.setState({ isStarted: false });
          return null;
        } else {
          this.setState({ sec: 59 });
          this.setState(prevState => {
            return { min: prevState.min - 1};
          });
        }
      } else {
        this.setState(prevState => {
          return { sec: prevState.sec - 1};
        });
      }
    }, 1000);
  }

  setSession() {
    this.setState({
      isStarted: false,
      min: 25,
      sec: 0,
      isSession: true
    });
  }

  setBreak() {
    this.setState({
      isStarted: false,
      min: 5,
      sec: 0,
      isSession: false
    });
  }

  handleMinChange(e) {
    this.setState({ min: e.target.value})
  }

  handleSecChange(e) {
    this.setState({ sec: e.target.value})
  }

  render() {
    return (
      <div className='container-fluid ' style={{background: '#ef8dc5'}}>
        <div className='row ml-5'>
          <div className='col-4'>
            <ul className='mt-5'>
              <li onClick={this.setSession}>Session</li>
              <li onClick={this.setBreak}>Break</li>
            </ul>
            <div>
              <input className='rounded mx-3 mb-3 text-center lead'
                     style={{background: '#f7bede', width: '50px'}}
                     type='number'
                     onChange={this.handleMinChange}
                     min={0}
                     max={60}
                     disabled={this.state.isStarted}
                     value={this.state.min} />
              <span>:</span>
              <input className='rounded mx-3 mb-3 text-center lead'
                     style={{background: '#f7bede', width: '50px'}}
                     type='number'
                     onChange={this.handleSecChange}
                     min={0}
                     max={59}
                     disabled={this.state.isStarted}
                     value={(this.state.sec < 10) ? `0${this.state.sec}` : this.state.sec} />
            </div>
            <button className='btn ml-3 mb-5'
                    onClick={this.handleStartClick}>
                    {(this.state.isStarted) ? 'Pause' : 'Start'}
            </button>
            <button className='btn ml-4 mb-5'
                    onClick={this.reset}>Reset
            </button>
          </div>
          <div className='col-8 mt-5'>
            <h1 className='display-1'>{this.state.min} : {(this.state.sec < 10) ? `0${this.state.sec}` : this.state.sec}</h1>
            {(this.state.isSession) ? <i className="fa fa-5x fa-keyboard-o ml-5" aria-hidden="true"></i> : <i className="fa fa-5x fa-coffee ml-5" aria-hidden="true"></i>}
          </div>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
