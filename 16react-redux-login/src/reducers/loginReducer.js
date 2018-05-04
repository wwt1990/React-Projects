import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case types.LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case types.LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    default:
      return state;
  }
}
