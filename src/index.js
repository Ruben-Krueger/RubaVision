import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  return <h1>Hello from React!</h1>;
}

console.log('here')

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavigationBar />
  </React.StrictMode>
);
