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

const AdminSidebar = () => {
  return (
    <aside style={{ width: 220, background: "#111827", color: "#fff" }}>
      <h3 style={{ padding: 16 }}>Admin</h3>
      <nav style={{ padding: 16 }}>
        <div>Dashboard</div>
        <div>Users</div>
        <div>Roles</div>
        <div>Settings</div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
