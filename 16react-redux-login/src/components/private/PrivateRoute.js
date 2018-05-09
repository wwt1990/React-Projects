import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from 'react-redux';

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route {...rest} render={props => (
        (this.props.isLoginSuccess && localStorage.getItem('userToken')) ? (
          <Component {...props} />
        ) : (
          <Redirect to={
            {
              pathname: '/login',
              state: { target: props.location }
            }
          }/>
        )
      )} />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoginSuccess: state.isLoginSuccess,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
