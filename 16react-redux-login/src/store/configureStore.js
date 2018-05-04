import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from '../reducers/loginReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
  return createStore(
    loginReducer,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}
