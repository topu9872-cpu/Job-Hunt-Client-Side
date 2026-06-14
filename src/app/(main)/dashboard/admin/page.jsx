"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboardPage = () => {
  const searchParams = useSearchParams();
  const currentTimeline = searchParams.get("timeline") || "month";

  // 📊 Revenue Data
  const revenueData =
    currentTimeline === "today"
      ? [
          { name: "10AM", revenue: 1200 },
          { name: "12PM", revenue: 1800 },
          { name: "2PM", revenue: 900 },
          { name: "4PM", revenue: 2400 },
          { name: "6PM", revenue: 2100 },
        ]
      : [
          { name: "Week 1", revenue: 12000 },
          { name: "Week 2", revenue: 18000 },
          { name: "Week 3", revenue: 14000 },
          { name: "Week 4", revenue: 24750 },
        ];

  const metrics = [
    { title: "Total Users", value: "12,540" },
    { title: "Total Jobs", value: "8,430" },
    { title: "Revenue", value: "$68,750" },
    { title: "Applicants", value: "2,310" },
  ];

  const pieData = [
    { name: "18-24", value: 25.5 },
    { name: "25-34", value: 40.2 },
    { name: "35-44", value: 20.1 },
    { name: "45+", value: 14.2 },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#a855f7", "#f59e0b"];

  const jobs = [
    {
      id: "#JH-001",
      name: "Michael Brown",
      role: "Frontend Developer",
      stage: "Interview",
      color: "text-yellow-500 bg-yellow-500/10",
    },
    {
      id: "#JH-002",
      name: "Sarah Johnson",
      role: "React Developer",
      stage: "Hired",
      color: "text-green-500 bg-green-500/10",
    },
    {
      id: "#JH-003",
      name: "David Wilson",
      role: "Backend Developer",
      stage: "Applied",
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      id: "#JH-004",
      name: "Emma Stone",
      role: "UI/UX Designer",
      stage: "Rejected",
      color: "text-red-500 bg-red-500/10",
    },
  ];

  return (
    <div className="min-h-screen mt-10 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* HEADER */}
        <div className="mb-8 animate-fadeUp">
          <h1 className="text-3xl font-bold">Job Hunt Dashboard</h1>
          <p className="text-sm text-slate-500">
            Real-time hiring analytics & applications
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="p-4 bg-white dark:bg-black rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition-all animate-fadeUp"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="text-xs text-slate-500">{m.title}</p>
              <h2 className="text-xl font-bold">{m.value}</h2>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* AREA CHART */}
          <div className="lg:col-span-2 p-5 bg-white dark:bg-black rounded-xl shadow animate-fadeUp">
            <h3 className="font-bold mb-4">Revenue Overview</h3>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fill="url(#rev)"
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

         {/* 🍩 PIE (JOB HUNT STYLE DONUT + CENTER TOTAL) */}
<div className="p-5 bg-white dark:bg-black rounded-xl shadow animate-fadeUp">
  <h3 className="font-bold mb-4 ">User Demographics</h3>

  <div className="relative">
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>

        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={4}
          stroke="none"
          animationDuration={1200}
        >
          {pieData.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>

    {/* 🔥 CENTER TOTAL */}
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <p className="text-2xl font-bold ">
        12,540
      </p>
      <p className="text-xs text-slate-500">Total Users</p>
    </div>
  </div>
</div>
        </div>

        {/* JOB TABLE */}
        <div className="p-6 bg-white dark:bg-black rounded-xl shadow">

          <div className="mb-5">
            <h3 className="text-lg font-bold">Job Applications Pipeline</h3>
            <p className="text-xs text-slate-500">
              Animated hiring flow tracking
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead>
                <tr className="text-left text-xs text-slate-500 border-b">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Candidate</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Stage</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody>

                {jobs.map((j, i) => (
                  <tr
                    key={i}
                    style={{ animationDelay: `${i * 100}ms` }}
                    className="
                      animate-row
                      hover:bg-slate-50 dark:hover:bg-slate-800/40
                      hover:scale-[1.01]
                      transition-all duration-300
                    "
                  >
                    <td className="py-4 font-semibold text-blue-500">
                      {j.id}
                    </td>

                    <td className="py-4">{j.name}</td>

                    <td className="py-4 text-slate-500">{j.role}</td>

                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${j.color}`}>
                        {j.stage}
                      </span>
                    </td>

                    <td className="py-4 text-right text-xs text-slate-500 hover:text-blue-500 cursor-pointer">
                      View →
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        </div>

      </main>

      {/* ANIMATION STYLES */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeUp {
          animation: fadeUp 0.6s ease both;
        }

        .animate-row {
          animation: fadeUp 0.5s ease both;
        }
      `}</style>

    </div>
  );
};

export default AdminDashboardPage;