import React from 'react';
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";

import HeaderImage from '../../assets/reactrouterlogo.png'
const Header = () => {

    return (
        <header className='header'>
            <Link to={'/'}>
                <Image src={HeaderImage} className={'header-logo'} />
            </Link>

            <div className={'header-text'}>
                React Router 4
            </div>

        </header>
    );
};

export default Header;
