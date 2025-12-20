// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ roles, children }: any) => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/" />;

//   if (roles && !roles.includes(user.role)) {
//     return <h2>Unauthorized</h2>;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
