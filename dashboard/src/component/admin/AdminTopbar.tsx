//  import { useAuth } from "../../context/AuthContext";

//  const AdminTopbar = () => {
//    const { user } = useAuth();

//    if (!user) return null;

//    return (
//      <header
//        style={{
//          height: 60,
//          background: "#1F2937",
//          color: "#fff",
//          display: "flex",
//          alignItems: "center",
//          justifyContent: "space-between",
//          padding: "0 16px",
//        }}
//      >
//        <h2>Admin Panel</h2>
//        <div>
//          {user.name} ({user.role})
//        </div>
//      </header>
//    );
//  }

//  export default AdminTopbar;

import { useAuth } from "../../context/AuthContext";

const AdminTopbar = () => {
  const { user, logout } = useAuth();

  return (
    <header style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
      <span>Welcome, {user?.name}</span>
      <button onClick={logout} style={{ float: "right" }}>
        Logout
      </button>
    </header>
  );
};

export default AdminTopbar;
