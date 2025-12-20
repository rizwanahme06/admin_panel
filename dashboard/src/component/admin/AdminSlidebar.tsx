// import { useAuth } from "../../context/AuthContext";

// const AdminSidebar = () => {
//   const { user } = useAuth();

//   if (!user) return null;

//   return (
//     <aside style={{ width: 220, background: "#111827", color: "#fff" }}>
//       <h3 style={{ padding: "16px" }}>Admin</h3>

//       {user.role === "admin" && (
//         <>
//           <div>Dashboard</div>
//           <div>User Management</div>
//           <div>Roles</div>
//           <div>Audit Logs</div>
//         </>
//       )}

//       {user.role === "user" && (
//         <>
//           <div>Dashboard</div>
//           <div>Reports</div>
//         </>
//       )}
//     </aside>
//   );
// };

// export default AdminSidebar;

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { user } = useAuth();

  return (
    <aside
      style={{
        width: 220,
        background: "#111827",
        color: "#fff",
        height: "100vh",
      }}
    >
      <h3 style={{ padding: 16, borderBottom: "1px solid #1f2937" }}>
        Admin Panel
      </h3>

      <nav style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          end
          style={({ isActive }) => ({
            color: isActive ? "#60a5fa" : "#fff",
            textDecoration: "none",
          })}
        >
          Dashboard
        </NavLink>

        {/* Users */}
        {user?.role === "admin" && (
          <NavLink
            to="/dashboard/users"
            style={({ isActive }) => ({
              color: isActive ? "#60a5fa" : "#fff",
              textDecoration: "none",
            })}
          >
            Users
          </NavLink>
        )}

        {/* Roles */}
        {user?.role === "admin" && (
          <NavLink
            to="/dashboard/roles"
            style={({ isActive }) => ({
              color: isActive ? "#60a5fa" : "#fff",
              textDecoration: "none",
            })}
          >
            Roles
          </NavLink>
        )}

        {/* Settings */}
        <NavLink
          to="/dashboard/settings"
          style={({ isActive }) => ({
            color: isActive ? "#60a5fa" : "#fff",
            textDecoration: "none",
          })}
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;

