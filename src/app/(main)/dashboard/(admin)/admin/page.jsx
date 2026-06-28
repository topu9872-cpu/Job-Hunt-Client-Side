import {
  getAllJobs,
  getTotalApplications,
  getTotalSubscriptions,
  getTotalUsers,
} from "@/app/api/Server/Server";

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

const AdminDashboardPage = async () => {
  const totalUsers = await getTotalUsers();
  const totalJobs = await getAllJobs();
  const getTotalApply = await getTotalApplications();

  
  const getSubscriptions = await getTotalSubscriptions();
 
  return (
    <div>
      <AdminDashboard
        totalUsers={totalUsers}
        totalJobs={totalJobs}
        getTotalApply={getTotalApply}
        getSub={getSubscriptions}
      />
    </div>
  );
};

export default AdminDashboardPage;
