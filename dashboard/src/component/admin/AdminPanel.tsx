// // import { useEffect, useState } from "react";
// // import { useAuth } from "../context/AuthContext";
// // import { authFetch } from "../context/Api";

// // const AdminPanel = () => {
// //   const { token } = useAuth();
// //   const [users, setUsers] = useState([]);

// //   useEffect(() => {
// //     authFetch("http://localhost:5000/users", token)
// //       .then(res => {
// //         if (!res.ok) throw new Error("Unauthorized");
// //         return res.json();
// //       })
// //       .then(data => setUsers(data))
// //       .catch(() => console.log("Access denied"));
// //   }, [token]);

// //   return (
// //     <div>
// //       <h2>Admin Panel</h2>
// //       <ul>
// //         {users.map((u: any) => (
// //           <li key={u.id}>
// //             {u.name} ({u.role})
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default AdminPanel;


// import { Routes, Route } from "react-router-dom";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminUsers from "./pages/AdminUsers";

//  const AdminPanel = () => {
// return (

//   <Routes>
//   <Route path="/" element={<AdminDashboard />} />
//   <Route path="/users" element={<AdminUsers />} />
// </Routes>
// )
// }

// export default AdminPanel

import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import { AdminRoles } from "./pages/AdminRoles";
import { AdminSettings } from "./pages/AdminSettings";

const AdminPanel = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="roles" element={<AdminRoles />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default AdminPanel;
