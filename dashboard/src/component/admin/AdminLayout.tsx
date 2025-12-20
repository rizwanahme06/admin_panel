import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSlidebar";
import AdminTopbar from "./AdminTopbar";
import AdminDashboard from "./AdminDashboard";
import  AdminUsers  from "./AdminUsers";
import { AdminSettings } from "./AdminSettings";
import { AdminRoles } from "./AdminRoles";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        <AdminTopbar />
        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
