import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SocketProvider } from './SocketContext'; // Adjust the path if necessary
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
);

reportWebVitals();
