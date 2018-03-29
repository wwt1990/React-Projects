import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dynamic from './Dynamic';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Dynamic />, document.getElementById('root'));
registerServiceWorker();
