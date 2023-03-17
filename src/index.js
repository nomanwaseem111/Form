import App from './App';

import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import awsconfig from './aws-exports.js';
import { Amplify,Auth } from 'aws-amplify';

Amplify.configure(awsconfig);
Auth.configure(awsconfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <App />
   
);

