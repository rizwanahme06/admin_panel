import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./UserLayout";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";

const UserPanel = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
};

export default UserPanel;
