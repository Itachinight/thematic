import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Journal from './Journal';
import './helpers/momentLocaleSetup';

ReactDOM.render(<Journal/>, document.getElementById('root'));