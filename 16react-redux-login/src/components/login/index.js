import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import { Redirect } from "react-router-dom";

import * as loginActions from '../../actions/loginActions';
import LoginForm from './LoginForm';
import LoginIntro from './LoginIntro';
import LoginInfo from './LoginInfo';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  emailChange(e) {
    this.setState({email: e.target.value});
  }

  passwordChange(e) {
    this.setState({password: e.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.actions.login(email, password);
  }


  componentDidUpdate() {
    const { isLoginSuccess } = this.props;
    if (isLoginSuccess) {
      localStorage.setItem('userToken', this.state.email)
      this.props.history.push("/account");
      toastr["success"]("Login successfully!")
    }
  }

  render() {
    const { email, password } = this.state;
    const { isLoginPending, isLoginSuccess, loginError } = this.props;

    const { target } = this.props.location.state || { target: {pathname: '/account'} };
        if (isLoginSuccess) {
            return <Redirect to={target}/>;
        }

    return (
      <div className='container-fluid'>
        <LoginIntro />
        <div className="panel panel-default">
          <h1 className='display-4 my-5 text-center'>Redux Login</h1>
          <LoginForm
            email={email}
            password={password}
            emailChange={this.emailChange}
            passwordChange={this.passwordChange}
            handleClick={this.handleClick}
            isLoginPending={isLoginPending}
            isLoginSuccess={isLoginSuccess}
            loginError={loginError} />
          <LoginInfo />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
