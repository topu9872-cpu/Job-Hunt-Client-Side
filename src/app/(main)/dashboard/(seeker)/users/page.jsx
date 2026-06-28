import { getTotalUsers } from "@/app/api/Server/Server";
import UsersTable from "./UsersTable";


const UsersPage = async () => {
  const data = await getTotalUsers();

  return (
    <div className="p-6 mt-10 md:mt-0 bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total Users: {data.length}
        </p>
      </div>

      {/* Table */}
      <UsersTable users={data} />
    </div>
  );
};

export default UsersPage;
