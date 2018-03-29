import React, { Component } from 'react';


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        firstName: '',
        lastName: '',
        birthday: '',
        origin: '',
      },
      firstName: '',
      lastName: '',
      birthday: '',
      origin: '',
      titleDisplay: '',
      formOneDisplay: '',
      formTwoDisplay: 'none',
      resultDisplay: 'none',
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.submitFormOne = this.submitFormOne.bind(this);

    this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.submitFormTwo = this.submitFormTwo.bind(this);

    this.reset = this.reset.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  submitFormOne(e) {
    e.preventDefault();
    var storedDataOne = this.state.userData;
    storedDataOne.firstName = this.state.firstName;
    storedDataOne.lastName = this.state.lastName;

    this.setState( {
      userData: storedDataOne,
      formOneDisplay: 'none',
      formTwoDisplay: '',
    })
  }

  handleBirthdayChange(e) {
    this.setState({ birthday: e.target.value });
  }

  handleOriginChange(e) {
    this.setState({ origin: e.target.value });
  }

  submitFormTwo(e) {
    e.preventDefault();
    var storedDataTwo;
    storedDataTwo = this.state.userData;
    storedDataTwo.birthday = this.state.birthday;
    storedDataTwo.origin = this.state.origin;

    this.setState({
      userData: storedDataTwo,
      formTwoDisplay: 'none',
      titleDisplay: 'none',
      resultDisplay: '',
    });
  }

  reset(e) {
    e.preventDefault();

    this.setState({
      userData: {
        firstName: '',
        lastName: '',
        birthday: '',
        origin: '',
      },
      firstName: '',
      lastName: '',
      birthday: '',
      origin: '',
      titleDisplay: '',
      formOneDisplay: '',
      formTwoDisplay: 'none',
      resultDisplay: 'none',
    });
  }

  render() {
    const titleStyle = {
      display: this.state.titleDisplay,
      fontSize: '20px',
      paddingTop: '20px',
    };

    const formOneStyle = {
      display: this.state.formOneDisplay,
      marginTop: '35px',
      fontSize: '25px',
    };

    const formTwoStyle = {
      display: this.state.formTwoDisplay,
      marginTop: '35px',
      fontSize:'25px',
    };

    const resultStyle = {
      display: this.state.resultDisplay,
    };

    return (
      <div className='container-fluid'>
        <div className='lead text-primary mt-3'>
          <p>This is a simple form service built with React</p>
          <p>Type in text to see how it works.</p>
        </div>
        <div className='text-center' style={{background: '#f98498'}}>
          <h1 style={titleStyle}>Please enter your name:</h1>
          <form onSubmit={this.submitFormOne} style={formOneStyle}>
            <label className='small'>Type your first name:</label>
            <input className='rounded ml-3'
                   type='text'
                   value={this.state.firstName}
                   onChange={this.handleFirstNameChange}
                   style={{width:'200px'}}  />
            <br />
            <label className='small'>Type your last name:</label>
            <input className='rounded ml-3'
                   type='text'
                   value={this.state.lastName}
                   onChange={this.handleLastNameChange}
                   style={{width:'200px'}}  />
            <br />
            <button className='btn btn-primary btn-lg my-3'>Go to next page</button>
          </form>

          <form onSubmit={this.submitFormTwo} style={formTwoStyle}>
            <label className='small'>When were you born:</label>
            <input className='rounded ml-3'
                   type='date'
                   value={this.state.birthday}
                   onChange={this.handleBirthdayChange}
                   style={{width:'200px'}}  />
            <br />
            <label className='small'>Where are you from:</label>
            <input className='rounded ml-3'
                   type='text'
                   value={this.state.origin}
                   onChange={this.handleOriginChange}
                   style={{width:'200px'}} />
            <br />
            <button className='btn btn-primary btn-lg my-3'>Go to next page</button>
          </form>

          <div style={resultStyle}>
            <Result firstName={this.state.userData.firstName}
                    lastName={this.state.userData.lastName}
                    birthday={this.state.userData.birthday}
                    origin={this.state.userData.origin}
                    reset={this.reset}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Result extends Component {
  render() {
    const headStyle = {
      fontSize: '2rem',
      paddingTop: '20px',
    };

    const sentenceStyle = {
      fontSize: '2rem',
      paddingTop: '20px',
    };

    const birthday = parseInt(this.props.birthday, 10);
    const date = new Date();
    const age = parseInt(date.toString().substr(10, 5), 10) - birthday;
    const origin = this.props.origin;

    var ageSentence;
    var originSentence;
    ageSentence = isNaN(birthday)
      ? <h2 style={sentenceStyle}>We couldn't understand your birthday.</h2>
      : <h2 style={sentenceStyle}>You are {age} years old.</h2>

    originSentence = origin.length === 0
      ? <h2 style={sentenceStyle}>We don't know where you are from.</h2>
      : <h2 style={sentenceStyle}>You are from {origin}</h2>

    return (
      <div>
        <h1 style={headStyle}>Hello, {this.props.firstName} {this.props.lastName}!</h1>
        {ageSentence}
        {originSentence}
        <button className='btn btn-warning btn-lg my-3' onClick={this.props.reset}>Reset form</button>
      </div>
    );
  }
}
export default Form;
