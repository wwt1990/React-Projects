import * as types from './actionTypes';
import mockLoginApi from '../api/mockLoginApi';

export function loginPending(isLoginPending) {
  return {
    type: types.LOGIN_PENDING,
    isLoginPending
  };
}

export function loginSuccess(isLoginSuccess) {
  return {
    type: types.LOGIN_SUCCESS,
    isLoginSuccess
  }
}

export function loginError(loginError) {
  return {
    type: types.LOGIN_ERROR,
    loginError
  }
}

export function login(email, password) {
  return dispatch => {
    dispatch(loginPending(true));
    dispatch(loginSuccess(false));
    dispatch(loginError(null));

    mockLoginApi(email, password, error => {
      dispatch(loginPending(false));
      if(!error) {
        dispatch(loginSuccess(true));
      } else {
        dispatch(loginError(error));
      }
    });
  }
}
