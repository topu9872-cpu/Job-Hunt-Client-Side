import dynamic from "next/dynamic";

const AdminDashboard = dynamic(
  () => import("@/DashboardComponents/AdminDashboard/AdminDashboard"),
  {
    loading: () => (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    ),
  },
);

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default AdminDashboardPage;
