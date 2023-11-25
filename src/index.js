import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//for redux
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import User from './store/data'
import UserList from './store/userslist'
import Messages from './store/messages'
const store=configureStore({
  reducer:{
    user:User,
    userList:UserList,
    messages:Messages
  }
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
    </Provider> 
);
