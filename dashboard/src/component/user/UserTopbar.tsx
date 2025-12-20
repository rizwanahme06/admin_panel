import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./user.css";

const UserTopbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <header className="user-topbar">
      <span>Welcome, {user?.name}</span>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </header>
  );
};

export default UserTopbar;
