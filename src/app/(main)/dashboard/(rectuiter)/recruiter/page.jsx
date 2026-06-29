import React from "react";
import { Briefcase, Building2, FileText } from "lucide-react";
import DashboardTable from "@/DashboardComponents/DashBoardTable/DashBoardTable";
import {
  getRectuitersJobs,
  getRectuterApplications,
  getRectuterJobsData,
} from "@/app/api/Server/Server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function RecruiterDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const totalJobs = await getRectuitersJobs(user?.id);
  const totalApplications = await getRectuterApplications(user?.id);
  const totalCompanies = await getRectuterJobsData();
  const filteredJobs = totalCompanies.filter(
    (item) => item?.userId === user?.id,
  );
  const stats = [
    {
      id: 1,
      name: "Total Jobs",
      value:totalJobs.length || 0,
      icon: Briefcase,
    },
    {
      id: 2,
      name: "Total Companies",
      value: filteredJobs.length || 0,
      icon: Building2,
    },
    {
      id: 3,
      name: "Total Applications",
      value: totalApplications.length,
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-transparent p-4 sm:p-6 lg:p-8 text-current transition-colors duration-200">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Recruiter Overview
        </h1>
        <p className="text-sm opacity-70 mt-1">
          Overview of active metrics, applicant logs, and scheduled interviews.
        </p>
      </div>
      {/* Stats Grid - Automatic 3 Column Layout */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.id}
              className="p-6 rounded-xl border border-current/10 bg-current/2 backdrop-blur-md shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium opacity-70">
                  {stat.name}
                </span>
                <div className="p-2 rounded-lg bg-current/5">
                  <IconComponent className="h-5 w-5 opacity-80" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {stat.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <DashboardTable />
    </div>
  );
}
