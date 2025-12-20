import { useAuth } from "../../../context/AuthContext";
import '../user.css'

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="card">
      <h2 className="card-title">User Dashboard</h2>
      <p>Welcome back, <strong>{user?.name}</strong> 👋</p>
      <p>Your role: <strong>{user?.role}</strong></p>
    </div>
  );
};

export default UserDashboard;
