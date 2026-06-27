"use client";

import Image from "next/image";
import {
  FiHome,
  FiBriefcase,
  FiSettings,
  FiX,
  FiMenu,
  FiUser,
  FiUsers,
  
  FiFileText,
  FiUserCheck,
  FiAlertCircle,
} from "react-icons/fi";

import { MdCreateNewFolder, MdNoteAdd, MdWorkHistory } from "react-icons/md";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FaBuildingColumns } from "react-icons/fa6";
import Link from "next/link";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const recruiterMenuItems = [
    {
      icon: <FiHome size={20} />,
      label: "Overview",
      href: "/dashboard/recruiter",
    },
    {
      icon: <FiBriefcase size={20} />,
      label: "Job Applications",
      href: "/dashboard/jobapplications",
    },
    {
      icon: <MdCreateNewFolder size={20} />,
      label: "Create Job",
      href: "/dashboard/createjob",
    },
    {
      icon: <MdNoteAdd size={20} />,
      label: "Company",
      href: "/dashboard/company",
    },
    {
      icon: <FiSettings size={20} />,
      label: "Profile",
      href: "/dashboard/rectuiter-profile",
    },
  ];

  const seekerMenuItems = [
    {
      icon: <FiHome size={20} />,
      label: "Overview",
      href: "/dashboard/seeker",
    },
    {
      icon: <MdWorkHistory size={20} />,
      label: "My Applications",
      href: "/dashboard/applications",
    },
    { icon: <FiBriefcase size={20} />, label: "Browse Jobs", href: "/jobs" },
    {
      icon: <FiUser size={20} />,
      label: "Profile",
      href: "/dashboard/profile",
    },
    {
      icon: <FiSettings size={20} />,
      label: "Profile",
      href: "/dashboard/user-profile",
    },
  ];

  const adminMenuItems = [
    {
      icon: <FiHome size={20} />,
      label: "Dashboard",
      href: "/dashboard/admin",
    },
    {
      icon: <FaBuildingColumns size={20} />,
      label: "Companies",
      href: "/dashboard/admin/companies",
    },
    
    {
      icon: <FiUserCheck size={20} />,
      label: "Users Management",
      href: "/dashboard/admin/users",
    },
   
    {
      icon: <MdWorkHistory size={20} />,
      label: "Applications",
      href: "/dashboard/admin/applications",
    },
   
    {
      icon: <FiSettings size={20} />,
      label: "Profile",
      href: "/dashboard/admin/profile",
    },
  ];
  const navLinksMap = {
    seeker: seekerMenuItems,
    recruiter: recruiterMenuItems,
    admin: adminMenuItems,
  };

  const role = user?.role?.toLowerCase() || "seeker";

  const navItems = navLinksMap[role] || seekerMenuItems;

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        className="relative top-30 left-10 md:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FiMenu size={20} />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 pt-16 h-screen bg-background w-60 shadow-[5px_0px_10px_rgba(0,0,0,0.2)]
          flex flex-col transform transition-transform duration-300 ease-in-out
          md:translate-x-0 md:relative
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-400">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="status status-success animate-ping status-md"></div>
            <h1>
              Job <span className="text-info">Hunt</span>
            </h1>
          </div>

          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <FiX size={20} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all
                  ${
                    isActive
                      ? "bg-info text-white shadow-lg shadow-emerald-500/20"
                      : "hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* USER */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-3">
          {user?.image?.trim() ? (
            <Image
              src={user.image}
              alt="user name"
              width={40}
              height={40}
              className="rounded-full w-12 h-12 object-cover border border-slate-700"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <FiUser />
            </div>
          )}

          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
      </aside>

      {/* BACKDROP */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
