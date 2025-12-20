import { NavLink } from "react-router-dom";
import "./user.css";

const UserSidebar = () => {
  return (
    <aside className="user-sidebar">
      <h3>User Panel</h3>

      <NavLink to="dashboard">
        Dashboard
      </NavLink>

      <NavLink to="profile">
        Profile
      </NavLink>
    </aside>
  );
};

export default UserSidebar;
