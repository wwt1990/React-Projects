import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import * as loginActions from '../../actions/loginActions';
class Account extends React.Component {

  handleClick(e) {
    e.preventDefault();
    localStorage.removeItem('userToken');
    this.props.actions.logout();
    toastr["success"]("Logout successfully!")
  }
  render() {
    return(
      <div>
          <h1>Welcome! You are now logged into your account!</h1>
          <Link className='btn btn-primary' to='/login' onClick={this.handleClick.bind(this)}>Log out</Link>
      </div>
    );
  }
};


const mapStateToProps = state => {
  return {
    isLoginSuccess: state.isLoginSuccess,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
