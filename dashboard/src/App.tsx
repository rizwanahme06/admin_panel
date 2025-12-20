// import React from 'react';
// import './App.css';
// import LoginForm from './page/login/login';
// import { Route, Routes } from 'react-router-dom';
// import Dashboard from './page/Dashboard/Dashboard';
// import ProtectedRoute from './component/routing/ProtectedRoute';

// function App() {
//   return (
//       <Routes>
//         <Route path='/' element={<LoginForm />} />
//         <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//       </Routes>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import Login from "./page/login/login";
import Dashboard from "./page/Dashboard/Dashboard";
import AdminPanel from "./component/admin/AdminPanel";
import UserPanel from "./component/user/UserPanel";
import ProtectedRoute from "./component/routing/ProtectedRoute";
import RoleGuard from "./component/routing/RoleGuard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/admin/*"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["admin"]}>
              <AdminPanel />
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/user/*"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["user"]}>
              <UserPanel />
            </RoleGuard>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
