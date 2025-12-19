import React from 'react';
import './App.css';
import LoginForm from './page/login/login';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './component/ProtectedRoute';
import Dashboard from './page/Dashboard/Dashboard';

function App() {
  return (
    // <>
    // <LoginForm />
    // </>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
  );
}

export default App;
