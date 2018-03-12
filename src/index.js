import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import MainTable from './Form'

ReactDOM.render(<MainTable />, document.getElementById('root'));
registerServiceWorker();
