"use client";

import { handleUpdateRole } from "@/app/api/users";
import { useState } from "react";
import toast from "react-hot-toast";

const UsersTable = ({ users }) => {
  
  const [role, setRole] = useState('');
 
  const [loadingId, setLoadingId] = useState(null);

  const handleRoleUpdate = async (userId) => {
  
    try {

      setLoadingId(userId);
      await handleUpdateRole( userId,role);

      toast.success("Role updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    } finally {
      setLoadingId(null);
    }
  };

  return (
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
                <td className="px-4 py-3 font-medium">{user.name}</td>

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
                    <span className="text-green-600 font-medium">Verified</span>
                  ) : (
                    <span className="text-red-500 font-medium">Unverified</span>
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
                      onChange={(e) => setRole(e.target.value)}
                      className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-950 text-xs"
                    >
                      <option value="seeker">Seeker</option>
                      <option value="recruiter">Recruiter</option>
                      <option value="admin">Admin</option>
                    </select>

                    <button
                      onClick={() => handleRoleUpdate(user?.id)}
                      disabled={loadingId === user?.id}
                      className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {loadingId === user?.id ? "Saving..." : "Save"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
