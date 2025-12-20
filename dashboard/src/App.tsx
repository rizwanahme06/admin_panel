import React from 'react';
import './App.css';
import LoginForm from './page/login/login';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './page/Dashboard/Dashboard';
import ProtectedRoute from './component/routing/ProtectedRoute';

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
