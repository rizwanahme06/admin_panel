// import { useAuth } from "../../context/AuthContext";
import Header from "../../component/Header";
import AdminPanel from "../../component/AdminPanel";
import UserPanel from "../../component/UserPanel";
// import CommonPanel from "../../component/CommonPanel";
import RoleGuard from "../../component/RoleGuard";

const Dashboard = () => {
  // const { user } = useAuth();

  return (
    <>
      <Header />

      <RoleGuard allowedRoles={["admin"]}>
        <AdminPanel />
      </RoleGuard>

      <RoleGuard allowedRoles={["user"]}>
        <UserPanel />
      </RoleGuard>

      {/* <CommonPanel /> */}
    </>
  );
};

export default Dashboard;
