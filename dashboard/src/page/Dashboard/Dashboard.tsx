// import AdminPanel from "../../component/admin/AdminPanel";
// import Header from "../../component/layout/Header";
// import RoleGuard from "../../component/routing/RoleGuard";
// import UserPanel from "../../component/user/UserPanel";

// const Dashboard = () => {

//   return (
//     <>
//       <Header />

//       <RoleGuard allowedRoles={["admin"]}>
//         <AdminPanel />
//       </RoleGuard>

//       <RoleGuard allowedRoles={["user"]}>
//         <UserPanel />
//       </RoleGuard>
//     </>
//   );
// };

// export default Dashboard;

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === "admin"
    ? <Navigate to="/dashboard/admin" replace />
    : <Navigate to="/dashboard/user" replace />;
};

export default Dashboard;
