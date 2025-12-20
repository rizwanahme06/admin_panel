import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

type RoleGuardProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const { user } = useAuth();

  if (!user){ return <Navigate to="/" replace />;};

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
