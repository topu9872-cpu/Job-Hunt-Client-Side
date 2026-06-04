"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineTrophy } from "react-icons/hi2";
import { FaBookmark, FaStar } from "react-icons/fa";

const CompanyCard = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="w-full min-h-screen flex items-center justify-center  p-4">
      {/* CARD */}
      <div className="w-full max-w-2xl rounded-2xl p-6  border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl  border shadow-sm hover:scale-105 transition">
              <FcGoogle className="w-9 h-9" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">Google</h1>
              <p className="text-sm ">Mountain View, California</p>
            </div>
          </div>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            {isBookmarked ? (
              <FaBookmark className="w-5 h-5 sm:w-6 text-yellow-400 sm:h-6 stroke-[0.3]" />
            ) : (
              <BsBookmark className="w-5 h-5 sm:w-6 sm:h-6 stroke-[0.3]" />
            )}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            <HiOutlineTrophy className="text-green-600" />
            Best Place to Work
          </span>

          <span className="bg-yellow-100 flex items-center gap-1 text-yellow-600 px-3 py-1 rounded-full text-xs font-semibold">
            <FaStar /> 4.4 Rating
          </span>
        </div>

        <div className="mt-4 text-sm ">
          <span className="font-semibold ">10000+</span> employees
          <span className="mx-2">•</span>
          Founded <span className="font-semibold">1998</span>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-3  text-sm leading-relaxed ">
          Google builds products and platforms that connect billions of users
          worldwide, focusing on AI, search, cloud computing and innovation.
        </p>

        {/* FOOTER */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap gap-6 text-sm">
          <div className="">
            <span className="font-bold ">5.5K</span>{" "}
            <span className="text-green-600 font-medium">Jobs</span>
          </div>

          <div className="">
            <span className="font-bold ">70K</span>{" "}
            <span className="text-green-600 font-medium">Reviews</span>
          </div>

          <div className="">
            <span className="font-bold">129K</span>{" "}
            <span className="text-green-600 font-medium">Salaries</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
