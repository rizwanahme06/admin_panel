import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import UserTopbar from "./UserTopbar";
import "./user.css";

const UserLayout = () => {
  return (
    <div className="user-layout">
      <UserSidebar />

      <div className="user-main">
        <UserTopbar />
        <main className="user-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
