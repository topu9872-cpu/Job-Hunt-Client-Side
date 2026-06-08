'use client'
import React, { useState } from "react";
// Import required icons from react-icons
import { SiAccenture } from "react-icons/si";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FiBookmark, FiEdit2, FiChevronDown } from "react-icons/fi";
import { FaCheckCircle, FaCheck, FaTimes, FaBookmark } from "react-icons/fa";
import Image from "next/image";
import { BsBookmark } from "react-icons/bs";

const JobDetailsComponent1 = ({ jobDetailsData }) => {

   const [sevedJob, setSevedJob] = useState([]);
  
    const handleToggle = async (id) => {
      setSevedJob((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    };

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
    workMode
  } = jobDetailsData;
  console.log(jobDetailsData);

  return (
    <div className="max-w-4xl mx-auto p-6  font-sans antialiased">
      {/* =========================================================
          SECTION 1: HEADER (From Screenshot 2026-06-06 131328.png)
          ========================================================= */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* Accenture Logo Placeholder using SiAccenture */}
          <Image
            src={logo}
            height={60}
            width={60}
            alt={title}
            className=" text-2xl"
          />
          <span className="font-bold text-lg tracking-tight">Accenture</span>
          <span className="text-sm font-medium  ml-1 flex items-center gap-0.5">
            4.1<span className="text-xs">★</span>
          </span>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition ">
          <HiOutlineDotsHorizontal size={24} />
        </button>
      </div>

      {/* Job Title */}
      <h1 className="text-[32px] font-bold  leading-tight mb-4">
        {title}
      </h1>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className=" px-3 py-1.5 rounded-md text-sm font-medium">
          {workMode}
        </span>
        <span className=" px-3 py-1.5 rounded-md text-sm font-medium">
          {salary ? `${salary} k` : "$44.00 - $54.00 Per Hour"} (Employer
          provided)
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mb-8">
        <button className=" text-black bg-green-200 px-6 py-3 rounded-xl font-bold transition shadow-sm">
          Apply on employer site
        </button>
        <button className="border border-gray-400 p-2 rounded-xl  transition flex items-center justify-center">
          <button
                         onClick={() => {
                         
                           handleToggle(_id);
                         }}
                         className="  p-1 shrink-0 active:scale-95"
                       >
                         {!sevedJob.includes(_id) ? (
                           <BsBookmark className="w-5 h-5 sm:w-6 sm:h-6 stroke-[0.3]" />
                         ) : (
                           <FaBookmark className="w-5 h-5 sm:w-6 text-yellow-400 sm:h-6 stroke-[0.3]" />
                         )}
                       </button>
        </button>
      </div>

     
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Your qualifications for this job
          </h2>
          
        </div>

        {/* Existing Qualifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 mb-6">
          {skills?.map((skill, ind) => (
            <div
              key={ind}
              className="flex items-center gap-3  font-medium"
            >
              <FaCheckCircle className="text-[#107a4a] text-xl shrink-0" />
              <span>{skill}</span>
            </div>
          ))}
        </div>

        {/* Questionnaire Box */}
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-semibold  mb-5">
            Do you also have these qualifications?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-4">
            {requirements?.map((requirement, ind) => (
              <div key={ind} className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <button className="p-2  rounded-lg  transition">
                    <FaCheck size={14} />
                  </button>
                  <button className="p-2  hover:bg-[#e5e7eb] rounded-lg  transition">
                    <FaTimes size={14} />
                  </button>
                </div>
                <span className="text-base font-medium ">
                  {requirement}
                </span>
              </div>
            ))}
          </div>

          <button className="flex items-center gap-1 text-[#41cb8d] font-bold text-sm mt-2 hover:underline">
            Show more <FiChevronDown size={18} className="mt-0.5" />
          </button>
        </div>
      </div>

      <hr className="border-gray-200 my-8" />

      
      <div className="space-y-5 text-[15px] leading-relaxed ">
        <p>
          <strong className=" font-bold">Accenture Flex</strong>{" "}
          {description}
        </p>
        <p>
          As an{" "}
          <strong className=" font-bold">Accenture Flex</strong>{" "}
          employee, you will apply your skills and experience to help drive
          business transformation for leading organizations and communities. In
          addition to delivering innovative solutions for Accenture’s clients,
          you will work with a highly skilled, diverse network of people across
          Accenture businesses who are using the latest emerging technologies to
          address today’s biggest business challenges.
        </p>
        <p>
          You will receive competitive rewards and access to benefits programs
          and world-class learning resources.{" "}
          <strong className=" font-bold">Accenture Flex</strong>{" "}
          employees work in their local metro area onsite at the project,
          significantly reducing and/or...
        </p>

        <button className="flex items-center gap-1 text-[#41cb8d] font-bold text-base pt-2 hover:underline">
          Show more <FiChevronDown size={20} className="mt-0.5" />
        </button>
      </div>
    </div>
  );
};

export default JobDetailsComponent1;
