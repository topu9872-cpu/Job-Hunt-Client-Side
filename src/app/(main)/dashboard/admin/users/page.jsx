import { getUsersList } from "@/app/api/users";

const UsersPage = async () => {
  const data = await getUsersList();
  const users = data?.users || [];

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total Users: {users.length}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            {/* Head */}
            <thead className="bg-gray-100 dark:bg-gray-900 text-left">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Verified</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >

                  {/* Name */}
                  <td className="px-4 py-3 font-medium">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          : user.role === "recruiter"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Plan */}
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                    {user.plan}
                  </td>

                  {/* Verified */}
                  <td className="px-4 py-3">
                    {user.emailVerified ? (
                      <span className="text-green-600 font-medium">
                        Verified
                      </span>
                    ) : (
                      <span className="text-red-500 font-medium">
                        Unverified
                      </span>
                    )}
                  </td>

                  {/* Joined */}
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  {/* Action UI (NO LOGIC) */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2 items-center">

                      <select
                        defaultValue={user.role}
                        className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-950 text-xs"
                      >
                        <option value="user">User</option>
                        <option value="seeker">Seeker</option>
                        <option value="recruiter">Recruiter</option>
                        <option value="admin">Admin</option>
                      </select>

                      <button className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700 transition">
                        Save
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
};

export default UsersPage;