import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import nullThrows from 'capital-t-null-throws';

const root = ReactDOM.createRoot(nullThrows(document.getElementById('root')));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
