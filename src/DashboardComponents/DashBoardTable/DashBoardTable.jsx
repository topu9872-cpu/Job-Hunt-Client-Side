"use client";

import { getRectuterJobsData } from "@/app/api/Server/Server";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

const DashboardTable = () => {
  const [getJobData, setGetJobData] = useState([]);

  const { data: session } = authClient.useSession();
  const users = session?.user;

  useEffect(() => {
    const handleData = async () => {
      const datas = await getRectuterJobsData();
      setGetJobData(datas);
    };

    handleData();
  }, []);

  return (
    <div className="w-full flex z-50 justify-center ">
      <div className="w-screen p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold ">Manage All Jobs</h1>
          <p className="text-sm ">Manage your Company`s data and their roles</p>
        </div>

        {/* Table */}
        <div className=" rounded-2xl overflow-hidden">
          {/* Table Head */}
          <div className="grid grid-cols-4 text-sm font-semibold px-6 py-4">
            <span>Name</span>
            <span>JobType</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {getJobData
            .filter((item) => item?.userId === users?.id)
            .map((i) => (
              <div
                key={i._id}
                className="grid grid-cols-4 items-center px-6 py-4 border-t border-white/5 hover:bg-white/5 transition"
              >
                {/* Name */}
                <div className="font-medium">{i.title}</div>

                {/* Role */}
                <div>{i.jobType}</div>

                {/* Status */}
                <div>
                  <span className="px-3 py-1 bg-green-200 rounded-full text-xs font-semibold">
                    {i.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 text-2xl">
                  <FaEye className="p-1 rounded-full active:scale-90 cursor-pointer" />
                  <MdOutlineEdit className="p-1 rounded-full active:scale-90 cursor-pointer" />
                  <IoTrashOutline className="p-1 rounded-full text-red-500 active:scale-90 cursor-pointer" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
