import { useAuth } from "../context/AuthContext";

type RoleGuardProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const { user } = useAuth();

  if (!user) return null;

  if (!allowedRoles.includes(user.role)) {
    return null; // or <Unauthorized />
  }

  return <>{children}</>;
};

export default RoleGuard;
