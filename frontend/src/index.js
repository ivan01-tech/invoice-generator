import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import UsersContextProvider from './context/UsersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UsersContextProvider >
        <Routes >
          <Route path='/*' element={<App />} />
        </Routes >
      </UsersContextProvider >
    </BrowserRouter>
  </React.StrictMode>
);
