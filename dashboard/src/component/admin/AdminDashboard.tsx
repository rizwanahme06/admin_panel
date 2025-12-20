// import { useAuth } from "../../context/AuthContext";
// import AdminSidebar from "./AdminSlidebar";

// const AdminDashboard = () => {
//   const { user } = useAuth();

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <aside style={{ width: 220, background: "#111827", color: "#fff" }}>
//         <h3 style={{ padding: "16px" }}>Admin</h3>
//         <AdminSidebar />
//       </aside>

//       <main style={{ flex: 1, padding: "16px" }}>
//         <header
//           style={{
//             height: 60,
//             background: "#1F2937",
//             color: "#fff",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "0 16px",
//           }}
//         >
//           <h2>Admin Panel</h2>
//           <div>
//             {user.name} ({user.role})
//           </div>
//         </header>

//         <section style={{ marginTop: "16px" }}>
//           <h3>Welcome, {user.name}!</h3>
//           <p>This is your dashboard.</p>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;


import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../context/Api";

type User = {
  id: number;
  name: string;
  role: string;
};

const AdminDashboard = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    authFetch("/users", token)
      .then(setUsers)
      .catch(() => setError("Access denied"))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} — <strong>{u.role}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
