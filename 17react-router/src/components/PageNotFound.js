import React from 'react';
import NotFoundImage from '../assets/notfound404.png';

const PageNotFound = () => {
    return (
        <div style={{textAlign:'center'}}>
            <h1>Page Not Found</h1>
            <img src={NotFoundImage} alt='not-found-404' width='500px'/>
        </div>
    );
};

export default PageNotFound;
