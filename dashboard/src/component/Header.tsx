import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  }
  return (
    <header>
      <span>Welcome {user?.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
