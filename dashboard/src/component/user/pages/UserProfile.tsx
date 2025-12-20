import { useAuth } from "../../../context/AuthContext";
import '../user.css'

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="card">
      <h2 className="card-title">Profile</h2>

      <p><b>Name:</b> {user?.name}</p>
      <p><b>Email:</b> {user?.email}</p>
      <p><b>Role:</b> {user?.role}</p>
    </div>
  );
};

export default UserProfile;
