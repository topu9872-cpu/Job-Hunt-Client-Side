"use client";
import React, { useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineTrophy } from "react-icons/hi2";
import { FaBookmark, FaStar } from "react-icons/fa";
import Image from "next/image";

const CompanyCard = ({ company }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const {
    name,
    logo,
    location,
    rating,
    founded,
    description,
    companySize,
    openJobs,
    
    salary,
    type,
  } = company;
  
  

  return (
    <div className="w-full flex p-4">
      {/* CARD */}
      <div className="w-full max-w-2xl rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">

        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl border shadow-sm">
              <Image src={logo} width={50} height={50} alt={name} />
            </div>

            <div className="min-h-15">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="text-sm">{location}</p>
            </div>
          </div>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            {isBookmarked ? (
              <FaBookmark className="w-5 h-5 text-yellow-400" />
            ) : (
              <BsBookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* TAGS */}
        <div className="mt-4 flex items-center gap-2">
          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            <HiOutlineTrophy />
            {type}
          </span>

          <span className="bg-yellow-100 flex items-center gap-1 text-yellow-600 px-3 py-1 rounded-full text-xs font-semibold">
            <FaStar /> {rating}
          </span>
        </div>

        {/* INFO */}
        <div className="mt-4 text-sm">
          <span className="font-semibold">{companySize}</span> employees
          <span className="mx-2">•</span>
          Founded <span className="font-semibold">{founded}</span>
        </div>

        {/* DESCRIPTION (unchanged logic) */}
        <p className="mt-3 text-sm leading-relaxed flex-1">
          {description}
        </p>

        {/* FOOTER (FIXED ALIGNMENT ONLY) */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between text-sm">

          <div>
            <span className="font-bold">
              {openJobs || "55.5k-85k"}
            </span>{" "}
            <span className="text-green-600 font-medium">Jobs</span>
          </div>

          <div>
            <span className="font-bold">
              {rating || "70K-110k"}
            </span>{" "}
            <span className="text-green-600 font-medium">Reviews</span>
          </div>

          <div>
            <span className="font-bold">
              {`${salary} k `|| "129K-160k"}
            </span>{" "}
            <span className="text-green-600 font-medium">Salaries</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CompanyCard;