import React from "react";
import {NavLink} from 'react-router-dom';

const Sidebar = () => {

    const links = [
        {name: 'Login', url: '/login'},
        {name: 'Account', url: '/account'},
        {name: '404 Error', url: '/404Error'},
    ];

    let linksComponents = links.map((link, index) => {
        return (
            <li key={index} className='navList'>
                <NavLink className='navLink' activeClassName='activeNavLink'
                         to={link.url}>{link.name}</NavLink>
            </li>
        );
    });

    return (
        <div className={'leftNavContainer'}>
            <ul>
                <li className='navList'><NavLink className='navLink' activeClassName='activeNavLink' to='/' exact>Home</NavLink></li>
                {linksComponents}
            </ul>
        </div>
    );
};

export default Sidebar;
