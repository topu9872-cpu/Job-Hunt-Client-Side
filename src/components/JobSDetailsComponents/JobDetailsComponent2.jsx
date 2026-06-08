import React from "react";
import {
  FiMapPin,
  FiInfo,
  FiChevronRight,
  FiBriefcase,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";
import { HiSparkles, HiOutlineBuildingOffice } from "react-icons/hi2";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const JobDetailsComponent2 = ({ jobDetailsData }) => {
  const {
    _id,
    benefits,
    category,
    company,
    deadline,
    description,
    experience,
    featured,
    jobType,
    location,
    logo,
    postedAt,
    requirements,
    salary,
    skills,
    title,
    vacancy,
  } = jobDetailsData;
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6  min-h-screen font-sans">
      {/* =========================================================
          1. PAY DETAILS SECTION (Screenshot 2026-06-06 131348.png)
          ========================================================= */}
      <div className="rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-2xl font-bold ">Pay details</h2>
            <div className="flex items-center gap-1  px-2.5 py-1 rounded-md text-sm font-medium">
              <FiMapPin size={14} />
              <span>{location}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left Column: Total Pay */}
            <div>
              <div className="flex items-baseline ">
                <span className="text-3xl font-bold tracking-tight">
                  {" "}
                  {salary ? `${salary} k` : "$44.00 - $54.00 Per Hour"}{" "}
                </span>
                <span className=" font-medium ml-0.5">/hr</span>
              </div>
              <p className=" font-bold mt-1">Total pay</p>
              <div className="flex items-center gap-1 text-sm mt-0.5">
                <span>Employer provided</span>
                <FiInfo size={14} className="cursor-pointer" />
              </div>
            </div>

            {/* Right Column: Median Pay (Separated by border on desktop) */}
            <div className="md:border-l  md:pl-10">
              <div className="text-3xl font-bold  tracking-tight">$49.00</div>
              <p className=" font-bold mt-1">Median pay</p>
            </div>
          </div>
        </div>

        {/* Footer Link Banner */}
        <div className=" border-t px-6 py-3.5 flex items-center gap-2 text-[#37b788] font-bold text-base cursor-pointer transition">
          <HiSparkles size={18} className="text-[#35a77d]" />
          <span>Is this pay right for me?</span>
        </div>
      </div>

      <div className=" rounded-xl shadow-sm overflow-hidden relative">
        <div className="p-6">
          <h2 className="text-2xl font-bold  mb-6">Company overview</h2>

          <div className="relative flex items-center">
            {/* Grid Container for items */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 w-full pr-10">
              {/* Metric 1 */}
              <div className="border-r last:border-none pr-2">
                <FiDollarSign size={24} className=" mb-2" />
                <p className="font-bold text-sm leading-tight">
                  $10+ billion (USD)
                </p>
                <p className="text-xs  mt-1 font-medium">Revenue</p>
              </div>
              {/* Metric 2 */}
              <div className="border-r  last:border-none pr-2">
                <FiUsers size={24} className=" mb-2" />
                <p className="font-bold  text-sm leading-tight">
                  10000+ Employees
                </p>
                <p className="text-xs mt-1 font-medium">Employees</p>
              </div>
              {/* Metric 3 */}
              <div className="border-r  last:border-none pr-2">
                <FiMapPin size={24} className=" mb-2" />
                <p className="font-bold  text-sm leading-tight">
                  Dublin, Ireland
                </p>
                <p className="text-xs mt-1 font-medium">Headquarters</p>
              </div>
              {/* Metric 4 */}
              <div className="border-r last:border-none pr-2">
                <HiOutlineBuildingOffice size={24} className=" mb-2" />
                <p className="font-bold text-sm leading-tight">
                  Company - Public
                </p>
                <p className="text-xs mt-1 font-medium">Company</p>
              </div>
              {/* Metric 5 */}
              <div className="last:border-none pr-2">
                <FiBriefcase size={24} className=" mb-2" />
                <p className="font-bold  text-sm leading-tight truncate">
                  Business Cons...
                </p>
                <p className="text-xs mt-1 font-medium">Industry</p>
              </div>
            </div>

            {/* Slider/Carousel Navigation Trigger */}
            <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md p-2.5 rounded-full text-gray-700 hover:bg-gray-50 transition z-10">
              <FiChevronRight size={20} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Footer Link Banner */}
        <div className="border-t border-gray-100 px-6 py-3.5 flex items-center gap-2 text-[#3ca880] font-bold text-base cursor-pointer hover:bg-[#ebf5f0] transition">
          <HiSparkles size={18} className="text-[#36ab80]" />
          <span>Learn about management at Accenture</span>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsComponent2;
