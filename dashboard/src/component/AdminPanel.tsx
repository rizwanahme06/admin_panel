// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { authFetch } from "../context/Api";

// const AdminPanel = () => {
//   const { token } = useAuth();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     authFetch("http://localhost:5000/users", token)
//       .then(res => {
//         if (!res.ok) throw new Error("Unauthorized");
//         return res.json();
//       })
//       .then(data => setUsers(data))
//       .catch(() => console.log("Access denied"));
//   }, [token]);

//   return (
//     <div>
//       <h2>Admin Panel</h2>
//       <ul>
//         {users.map((u: any) => (
//           <li key={u.id}>
//             {u.name} ({u.role})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminPanel;


import AdminSidebar from "./admin/AdminSlidebar";
import AdminTopbar from "./admin/AdminTopbar";
import AdminDashboard from "./admin/AdminDashboard";

const AdminPanel = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        <AdminTopbar />

        <main style={{ padding: "20px" }}>
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
