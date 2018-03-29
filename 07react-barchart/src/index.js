import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Barchart from './Barchart';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Barchart />, document.getElementById('root'));
registerServiceWorker();
