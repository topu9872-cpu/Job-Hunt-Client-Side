"use client";
import Image from "next/image";
import {
  FiHome,
  FiBriefcase,
  FiPieChart,
  FiSettings,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { MdCreateNewFolder } from "react-icons/md";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { icon: <FiHome size={20} />, label: "Overview", href: "/dashboard" },
    { icon: <FiBriefcase size={20} />, label: "Job Applications", href: "/dashboard/jobapplications" },
    { icon: <MdCreateNewFolder size={20} />, label: "Create Job", href: "/dashboard/createjob" },
    { icon: <FiPieChart size={20} />, label: "Analytics", href: "/dashboard/analytics" },
    { icon: <FiSettings size={20} />, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <>
      {/* MOBILE TOP BUTTON */}
      <button
        className="fixed top-4 left-4 z-50 p-2 mt-20 rounded-lg hover:bg-gray-100 md:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FiMenu size={22} />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 mt-0 md:mt-16 h-screen w-64 bg-background shadow-2xl
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
            <FiX size={24} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item, idx) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <a
                key={idx}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)} // auto close mobile
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all
                  ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* USER */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full object-cover border border-slate-700"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Julie Sweet</p>
            <p className="text-xs text-gray-400 truncate">
              julie.s@accenture.com
            </p>
          </div>
        </div>
      </aside>

      {/* BACKDROP */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;