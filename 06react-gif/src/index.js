import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gif from './Gif';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Gif />, document.getElementById('root'));
registerServiceWorker();
