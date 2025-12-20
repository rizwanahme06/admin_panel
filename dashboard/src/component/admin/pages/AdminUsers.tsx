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


// import { useEffect, useState } from "react";
// import ".././admin.css";
// import { authFetch } from "../../../context/Api";
// import { useAuth } from "../../../context/AuthContext";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   status?: "active" | "inactive";
// };

// const AdminUsers = () => {
//   const { token } = useAuth();
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!token) return;

//     authFetch("/users", token)
//       .then(setUsers)
//       .catch(() => setError("Failed to load users"))
//       .finally(() => setLoading(false));
//   }, [token]);

//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p className="error">{error}</p>;

//   return (
//     <div className="admin-page">
//       <div className="admin-header">
//         <h2>User Management</h2>
//         <button className="primary-btn">+ Add User</button>
//       </div>

//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.name}</td>
//               <td>{user.email}</td>

//               <td>
//                 <span className={`role ${user.role}`}>
//                   {user.role}
//                 </span>
//               </td>

//               <td>
//                 <span className={`status ${user.status || "active"}`}>
//                   {user.status || "active"}
//                 </span>
//               </td>

//               <td className="actions">
//                 <button>Edit</button>
//                 <button className="danger">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminUsers;


// import { useEffect, useState } from "react";
// import { authFetch } from "../../../context/Api";
// import { useAuth } from "../../../context/AuthContext";

// type User = {
//   id: number;
//   name: string;
//   role: string;
// };

// const AdminUsers = () => {
//   const { token } = useAuth();
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!token) return;

//     authFetch("/users", token)
//       .then(setUsers)
//       .finally(() => setLoading(false));
//   }, [token]);

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <>
//       <h2>Users</h2>

//       <table width="100%" border={1} style={{borderCollapse:'collapse', padding:20}}>
//         <thead style={{backgroundColor:'lightgray',fontSize:22,paddingBottom:20,textAlign:'center', paddingTop:20}}>
//           <tr>
//             <th>Name</th>
//             <th>Role</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map(u => (
//             <tr key={u.id} style={{textAlign:'center',fontSize:20,paddingBottom:10}}>
//               <td>{u.name}</td>
//               <td>{u.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default AdminUsers;



import { useEffect, useState } from "react";
import { authFetch, updateUserRole } from "../../../context/Api";
import { useAuth } from "../../../context/AuthContext";
import './AdminUsers.css'

type User = {
  id: number;
  name: string;
  role: string;
};

const AdminUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    authFetch("/users", token)
      .then(setUsers)
      .finally(() => setLoading(false));
  }, [token]);

  const handleRoleChange = async (id: number, role: string) => {
    if (!token) return;

    await updateUserRole(id, role, token);

    // update UI without refetch
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, role } : u))
    );
  };

  if (loading) return <p>Loading users...</p>;

  return (
  <div className="admin-users">
    <h2 className="page-title">Users</h2>

    <div className="table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>
                <select
                  className={`role-select ${u.role}`}
                  value={u.role}
                  onChange={e =>
                    handleRoleChange(u.id, e.target.value)
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

  
  // return (
  //   <>
  //     <h2>Users</h2>

  //     <table width="100%" >
  //       <thead >
  //         <tr>
  //           <th>Name</th>
  //           <th>Role</th>
  //         </tr>
  //       </thead>

  //       <tbody >
  //         {users.map(u => (
  //           <tr key={u.id}>
  //             <td>{u.name}</td>
  //             <td>
  //               <select
  //                 value={u.role}
  //                 onChange={e =>
  //                   handleRoleChange(u.id, e.target.value)
  //                 }
  //               >
  //                 <option value="user">User</option>
  //                 <option value="admin">Admin</option>
  //               </select>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </>
  // );
};

export default AdminUsers;
