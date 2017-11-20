import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './bootstrap.css'
import './narrow-jumbotron.css'
import './starter-template.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
