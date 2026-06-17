"use client";

import { getDaysAgo } from "@/app/api/Server/api";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsBookmark, BsLightningChargeFill } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
const AllCards = ({ jobsData }) => {
  const [sevedJob, setSevedJob] = useState([]);


  const handleToggle = async (id) => {
    setSevedJob((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      {jobsData?.map((job) => (
        <Link
          href={`/jobs/${job._id}`}
          key={job._id}
          className="w-full p-4 flex justify-center duration-500 items-center "
        >
          <div className="w-full sm:max-w-md h-60 border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm font-sans relative transition-all duration-200 hover:shadow-md">
            <div className="flex justify-between items-start gap-4">
              <div className="flex gap-3 items-center min-w-0">
                <div className="w-full h-full sm:w-12 sm:h-12  rounded-xl flex items-center justify-center  shrink-0 overflow-hidden">
                  <Image
                    src={job?.logo}
                    width={40}
                    height={40}
                    alt={job.title || "title"}
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="text-sm sm:text-base  font-medium truncate">
                      {job.company}
                    </span>
                    <span className=" text-xs sm:text-sm font-semibold flex items-center gap-0.5 shrink-0">
                      4.1
                      <span className="text-[10px] text-yellow-500 sm:text-xs">
                        ★
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bookmark Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleToggle(job._id);
                }}
                className="  p-1 shrink-0 active:scale-95"
              >
                {!sevedJob.includes(job._id) ? (
                  <BsBookmark className="w-5 h-5 sm:w-6 sm:h-6 stroke-[0.3]" />
                ) : (
                  <FaBookmark className="w-5 h-5 sm:w-6 text-yellow-400 sm:h-6 stroke-[0.3]" />
                )}
              </button>
            </div>

            <div className=" mt-auto sm:mt-4">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight leading-tight hover:text-blue-600 cursor-pointer wrap-break-word">
                {job.title || job.jobTitle}
              </h2>
              <p className="text-sm sm:text-base mt-0.5 sm:mt-1">
                {job.location}
              </p>
              <p className=" text-sm sm:text-base font-medium mt-1 flex flex-wrap gap-x-1 items-center">
                <span>
                  {job.salaryMin && job.salaryMax
                    ? `${job.salaryMin} - ${job.salaryMax} K`
                    : `${job.salary}`}
                </span>

                <span className=" font-normal text-xs sm:text-sm">
                  (Employer provided)
                </span>
              </p>
            </div>

            {/* Bottom Section: Easy Apply Badge and Date posted */}
            <div className="mt-4 sm:mt-5 flex justify-between items-center gap-2">
              {/* Easy Apply Badge */}
              <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-[#cff3e7] text-[#0ca678] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg font-bold text-xs sm:text-sm tracking-wide select-none">
                <BsLightningChargeFill className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Easy Apply
              </div>

              {/* Time Posted */}
              <span className="text-xs sm:text-sm font-medium shrink-0">
                {getDaysAgo(job.postedAt) <= 10
                  ? `🔥 New • ${getDaysAgo(job.postedAt)} days ago`
                  : "14+ days ago"}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllCards;
