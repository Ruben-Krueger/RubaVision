import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import nullThrows from 'capital-t-null-throws';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const root = ReactDOM.createRoot(nullThrows(document.getElementById('root')));
// Not using "StrictMode here" as in development there is no way to prevent double rendering of components
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode
root.render(<App />);
