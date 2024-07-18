import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BasketContextProvider from './Store/BasketContextProvider';
import UserContextProvider from './Store/UserContextProvider';
import React from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <BasketContextProvider>
      <App />
    </BasketContextProvider>
  </UserContextProvider>
);
