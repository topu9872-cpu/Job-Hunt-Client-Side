"use client";
import {
  getRectuterApplications,
  updateRectuterApplications,
} from "@/app/api/Server/Server";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function RecruiterDashboard() {
  const [applications, setApplications] = useState([]);
  const router = useRouter();
  const updateStatus = async (id, status) => {
    const updateApply = await updateRectuterApplications(id, { status });
    if (updateApply.modifiedCount === 1) {
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app)),
      );

      toast.success("Updated applicant status");
    } else {
      toast.error("failed to update application`s status");
    }
  };

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const handleApplications = async () => {
      const applicationsData = await getRectuterApplications(user?.id);
      setApplications(applicationsData);
    };

    handleApplications();
  }, [user]);

  if (!user)
    return (
      <div className="pt-10 md:pt-30 text-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );

  return (
    <div className="p-6 bg-slate-50 dark:bg-zinc-950 min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Control Panel */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Applicant Management
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Directly select or reject candidates below.
            </p>
          </div>
        </div>

        {/* Table View Container */}
        <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm dark:shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Date Applied</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Recruiter Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-sm">
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {app.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-zinc-700 dark:text-zinc-300">
                        {app.role}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                        {new Date(app.applicationData).toLocaleDateString("en-GB")}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-center rounded-full p-0.5 ${
                            app.status === "pending"
                              ? " text-yellow-500"
                              : app.status === "Selected"
                                ? " text-green-500"
                                : " text-red-500"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>

                      {/* Recruiter Decision Buttons with adaptive border/background states */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => updateStatus(app._id, "Selected")}
                            disabled={app.status === "Selected"}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              app.status === "Selected"
                                ? "bg-green-100/50 dark:bg-green-950/20 border-green-200 dark:border-green-900/40 text-green-600 dark:text-green-500 cursor-not-allowed shadow-none"
                                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-green-600 dark:hover:text-green-400 hover:border-green-300 dark:hover:border-green-500/30 hover:bg-green-50 dark:hover:bg-green-950/20 shadow-sm"
                            }`}
                          >
                            <FaCheckCircle className="text-sm" />
                            Select
                          </button>

                          <button
                            onClick={() => updateStatus(app._id, "Rejected")}
                            disabled={app.status === "Rejected"}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              app.status === "Rejected"
                                ? "bg-red-100/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-500 cursor-not-allowed shadow-none"
                                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-950/20 shadow-sm"
                            }`}
                          >
                            <FaTimesCircle className="text-sm" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-zinc-400 dark:text-zinc-500"
                    >
                      No applications found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
