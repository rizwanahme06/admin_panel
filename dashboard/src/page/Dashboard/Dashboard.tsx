import AdminPanel from "../../component/admin/AdminPanel";
import Header from "../../component/layout/Header";
import RoleGuard from "../../component/routing/RoleGuard";
import UserPanel from "../../component/user/UserPanel";

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
