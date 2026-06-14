import { getUsersList} from "@/app/api/users";
import UsersTable from "./UsersTable";

const UsersPage = async () => {
  const data = await getUsersList();
  const users = data?.users || [];



  return (
    <div className="p-6 mt-10 md:mt-0 bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total Users: {users.length}
        </p>
      </div>

      {/* Table */}
      <UsersTable users={users}/>
    </div>
  );
};

export default UsersPage;