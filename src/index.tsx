import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import nullThrows from 'capital-t-null-throws';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyCZ9rpPyHILOo6lqAXXQTXq4cuf-0zs-6g',
	authDomain: 'rubavision-bc073.firebaseapp.com',
	projectId: 'rubavision-bc073',
	storageBucket: 'rubavision-bc073.appspot.com',
	messagingSenderId: '315992148553',
	appId: '1:315992148553:web:ce3ec7a938e7cb61c68d98',
	measurementId: 'G-VBRWFQ2N3E'
};
// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(nullThrows(document.getElementById('root')));
// Not using "StrictMode here" as in development there is no way to prevent double rendering of components
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode
root.render(<App />);
