// 

import { NavLink } from "react-router-dom";
import "./admin.css";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <h2 className="logo">Admin</h2>

      <nav>
        <NavLink to="/dashboard/admin" end>
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/admin/users">
          Users
        </NavLink>
        <NavLink to="/dashboard/admin/roles">
          Roles
        </NavLink>
        <NavLink to="/dashboard/admin/settings">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
