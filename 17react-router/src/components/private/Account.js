import React from 'react';
import { NavLink, Link, Route, Switch } from "react-router-dom";
import AccountSummary from "./AccountSummary";
import AccountBalance from "./AccountBalance";
import AccountEdit from "./AccountEdit";
import PageNotFound from '../PageNotFound';

const Account = ({match}) => {
  const links = [
      {name: 'Balance', url: `${match.url}/balance`},
      {name: 'Edit', url: `${match.url}/edit`}
  ];

  let linksComponents = links.map((link, index) => {
      return (
          <li key={index} className='accountList'>
              {' | '}
              <NavLink className='accountLink' activeClassName='activeAccountLink'
                       to={link.url}>{link.name}&nbsp;</NavLink>
          </li>
      );
  });

  return (
      <div>
          <ul className='accountListContainer'>
              <li className='accountList'><NavLink className='accountLink' activeClassName='activeAccountLink' to='/account' exact>Summary&nbsp;</NavLink></li>
              {linksComponents}
          </ul>

          <Switch>
            <Route path={`${match.url}/balance`} component={AccountBalance}/>
            <Route path={`${match.url}/edit`} component={AccountEdit}/>
            <Route exact path={`${match.url}`} component={AccountSummary}/>
            <Route component={PageNotFound} />
          </Switch>
          <Link className='btn btn-primary' to={'/logout'}>Sign Out</Link>
      </div>
  );






};

export default Account;
