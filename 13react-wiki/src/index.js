import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wiki from './Wiki';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Wiki />, document.getElementById('root'));
registerServiceWorker();
