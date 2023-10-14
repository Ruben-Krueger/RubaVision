import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import nullThrows from 'capital-t-null-throws';

const root = ReactDOM.createRoot(nullThrows(document.getElementById('root')));
// Not using "StrictMode here" as in development there is no way to prevent double rendering of components
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode
root.render(<App />);
