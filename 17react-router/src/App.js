import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import LoginForm from './components/login/LoginForm';
import Logout from './components/login/Logout';
import PrivateRoute from './components/login/PrivateRoute';
import Account from './components/private/Account';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Sidebar/>
          <div className='rightContentContainer'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={LoginForm} />
              <PrivateRoute path='/account' component={Account} />
              <Route path='/logout' component={Logout} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
