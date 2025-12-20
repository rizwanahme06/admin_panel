// import { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { authFetch } from "../../context/Api";

// const AdminUsers = () => {
//   const { token } = useAuth();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     authFetch("/users", token)
//       .then(setUsers)
//       .catch(console.log);
//   }, [token]);

//   return (
//     <div>
//       <h2>User Management</h2>
//       <ul>
//         {users.map((u: any) => (
//           <li key={u.id}>{u.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminUsers;


import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { authFetch } from "../../context/Api";
import "./admin.css";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status?: "active" | "inactive";
};

const AdminUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    authFetch("/users", token)
      .then(setUsers)
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>User Management</h2>
        <button className="primary-btn">+ Add User</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>
                <span className={`role ${user.role}`}>
                  {user.role}
                </span>
              </td>

              <td>
                <span className={`status ${user.status || "active"}`}>
                  {user.status || "active"}
                </span>
              </td>

              <td className="actions">
                <button>Edit</button>
                <button className="danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
