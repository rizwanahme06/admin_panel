import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { AdminSettings } from "./pages/AdminSettings";
import { AdminRoles } from "./pages/AdminRoles";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        <AdminTopbar />
        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/roles" element={<AdminRoles />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
