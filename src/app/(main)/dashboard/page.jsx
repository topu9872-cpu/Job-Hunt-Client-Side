"use client";
import DashboardChart from "@/DashboardComponents/DashboardChart/DashboardChart";
import DashBoardTable from "@/DashboardComponents/DashBoardTable/DashBoardTable";
import Link from "next/link";

import { FiBell, FiSearch } from "react-icons/fi";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen mb-10 z-10 font-sans antialiased">
      <div className="flex flex-col flex-1 ">
        <header className=" h-16 border-b border-gray-400 flex items-center justify-between px-6 ">
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2"
                size={18}
              />
              <input
                type="text"
                placeholder="Search everything..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition w-64"
              />
            </div>
          </div>

          {/* Top Navbar Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2.5 hover:bg-gray-100 hover:text-black rounded-xl relative transition">
              <FiBell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <hr className="h-6 w-px " />
            <Link
              href="/dashboard/createjob"
              className="bg-emerald-500 z-40 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-gray-800 transition"
            >
              + New Post
            </Link>
          </div>
        </header>

        {/* Scrollable Workspace Dashboard Layout Body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Welcome Banner */}
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Welcome back, Julie
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Here is an overview of your recruitment and pay pipeline metrics.
            </p>
          </div>

          {/* Grid Layout for Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className=" border border-gray-300 p-6 rounded-2xl hover:scale-102  transition-all duration-500 ease-in-out  hover:shadow-[0_0_10px] ">
              <p className="text-sm font-semibold text-gray-400">
                Active Applications
              </p>
              <p className="text-3xl font-extrabold  mt-2">1,240</p>
              <span className="text-xs font-bold text-emerald-600  px-2 py-0.5 rounded-md mt-2 inline-block">
                +12% vs last month
              </span>
            </div>

            <div className=" border border-gray-300 p-6 rounded-2xl hover:scale-102  transition-all duration-500 ease-in-out  hover:shadow-[0_0_10px] ">
              <p className="text-sm font-semibold text-gray-400">
                Median Rate Offered
              </p>
              <p className="text-3xl font-extrabold mt-2">$49.00/hr</p>
              <span className="text-xs font-bold text-yellow-500 px-2 py-0.5 rounded-md mt-2 inline-block">
                Employer verified
              </span>
            </div>

            <div className=" border  border-gray-300 p-6 rounded-2xl hover:scale-102  transition-all duration-500 ease-in-out  hover:shadow-[0_0_10px]  sm:col-span-2 lg:col-span-1">
              <p className="text-sm font-semibold ">
                Interview Completion Rate
              </p>
              <p className="text-3xl font-extrabold  mt-2">72%</p>
              <span className="text-xs font-bold text-emerald-600  px-2 py-0.5 rounded-md mt-2 inline-block">
                Highly recommended
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className=" border border-gray-300 rounded-2xl hover:scale-102  transition-all duration-500 ease-in-out  hover:shadow-[0_0_10px] lg:col-span-7 min-h-75 flex items-center justify-center font-medium">
              <DashBoardTable />
            </div>
            <div className="border border-gray-300 rounded-2xl hover:scale-102  transition-all duration-500 ease-in-out  hover:shadow-[0_0_10px] lg:col-span-5  flex items-center justify-center font-medium">
              {" "}
              <DashboardChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
