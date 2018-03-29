import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Quote from './Quote';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Quote />, document.getElementById('root'));
registerServiceWorker();
