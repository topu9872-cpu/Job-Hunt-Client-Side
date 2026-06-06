"use client";

import React, { useState } from "react";

const initialData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Developer",
    status: "active",
    email: "alex@company.com",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Backend Developer",
    status: "on-leave",
    email: "sarah@company.com",
  },
  {
    id: 3,
    name: "David Chen",
    role: "UI/UX Designer",
    status: "active",
    email: "david@company.com",
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Product Manager",
    status: "inactive",
    email: "emily@company.com",
  },
];

const statusStyle = {
  active: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  "on-leave": "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  inactive: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const DashboardTable = () => {
  const [data] = useState(initialData);

  return (
    <div className="w-full flex z-50 justify-center ">
      
      <div className="w-screen p-2">

       
        <div className="mb-6">
          <h1 className="text-2xl font-bold ">
            Team Dashboard
          </h1>
          <p className="text-sm ">
            Manage your team members and their roles
          </p>
        </div>

        {/* Table */}
        <div className=" rounded-2xl overflow-hidden shadow-2xl">

          {/* Table Head */}
          <div className="grid grid-cols-4 text-sm font-semibold px-6 py-4">
            <span>Name</span>
            <span>Role</span>
            <span>Status</span>
            <span>Email</span>
          </div>

          {/* Table Body */}
          {data.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-4 px-2 py-4 border-t border-white/5 hover:bg-white/5 transition"
            >
              {/* Name */}
              <div className=" font-medium">
                {user.name}
              </div>

              {/* Role */}
              <div >
                {user.role}
              </div>

              {/* Status */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[user.status]}`}
                >
                  {user.status}
                </span>
              </div>

              {/* Email */}
              <div className="text-sm ">
                {user.email}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default DashboardTable;