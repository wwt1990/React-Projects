import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Multisearch from './Multisearch';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Multisearch />, document.getElementById('root'));
registerServiceWorker();
