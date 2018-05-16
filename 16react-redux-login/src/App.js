import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/login';
import PrivateRoute from './components/private/PrivateRoute';
import Account from './components/private/Account';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <PrivateRoute path='/account' component={Account} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
