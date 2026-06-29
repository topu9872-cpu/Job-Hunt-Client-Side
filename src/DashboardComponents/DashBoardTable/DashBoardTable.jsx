"use client";

import { getRectuterJobsData } from "@/app/api/Server/Server";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { DeleteModal } from "../DeleteModal/deleteModal";
import EditJobModal from "../CompanyEdit/CompanyEdit";

const DashboardTable = () => {
  const [getJobData, setGetJobData] = useState([]);
  const { data: session } = authClient.useSession();
  const users = session?.user;

  useEffect(() => {
    const handleData = async () => {
      const datas = await getRectuterJobsData();
      setGetJobData(datas);
    };

    handleData();
  }, []);

  // Dynamic status color generator
  const getStatusStyle = (status) => {
    const normalizeStatus = status?.toLowerCase() || "";

    if (normalizeStatus === "Seleted") {
      return "bg-green-500/10 text-green-400";
    }
    if (normalizeStatus === "pending") {
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
    if (normalizeStatus === "Rejected") {
      return "bg-red-500/10 text-red-400 ";
    }
  };

  const filteredJobs = getJobData.filter((item) => item?.userId === users?.id);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl p-4 sm:p-6">
        {/* Header Block */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Manage All Jobs
          </h1>
          <p className="text-sm opacity-60 mt-0.5">
            Manage your Company's data and their roles
          </p>
        </div>

        {/* Dashboard Surface Card */}
        <div className="rounded-2xl border border-white/10 bg-white/2 backdrop-blur-md overflow-hidden shadow-sm">
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/2 text-xs font-semibold uppercase tracking-wider opacity-70">
                  <th scope="col" className="px-6 py-4 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium">
                    Job Type
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium">
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-right pr-10"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5 font-normal">
                {filteredJobs.map((i) => (
                  <tr
                    key={i._id}
                    className="hover:bg-white/2 transition-colors duration-150"
                  >
                    {/* Job Title */}
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {i.title}
                    </td>

                    {/* Job Type */}
                    <td className="px-6 py-4 whitespace-nowrap opacity-80">
                      {i.jobType}
                    </td>

                    {/* Conditional Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(i.status)}`}
                      >
                        {i.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                      
                        <EditJobModal jobData={i}/>
                        <DeleteModal id={i._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center border-t border-white/5 bg-white/1">
              <p className="text-sm opacity-50 font-medium">
                No job postings found
              </p>
              <p className="text-xs opacity-40 mt-0.5">
                Jobs you publish will show up in this directory table.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
