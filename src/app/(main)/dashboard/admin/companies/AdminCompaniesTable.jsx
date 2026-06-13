"use client";

import { updateCompaniesData } from "@/app/api/Server/Server";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AdminCompaniesTable = ({ initialCompanies }) => {
  // Initialize state with data sent down from the server page
  const [companies, setCompanies] = useState(initialCompanies);

  // Pure client-side JavaScript execution handler
  const handleStatusChange = async (companyId, newStatus) => {
  try {
    const response = await updateCompaniesData(companyId, newStatus);

    if (!response) {
      toast.error("Update failed!");
      return;
    }

    setCompanies((prev) =>
      prev.map((company) =>
        company._id === companyId
          ? { ...company, status: newStatus }
          : company
      )
    );

    toast.success("Company updated successfully");
  } catch (error) {
    console.log(error);
    toast.error("Server error!");
  }
};
  return (
    <div className="overflow-x-auto rounded-lg border border-current/10">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-current/10 bg-current/5 font-semibold">
            <th className="p-4">Company Profile</th>
            <th className="p-4">Location</th>
            <th className="p-4">Founded</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Moderation Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-current/10">
          {companies.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center opacity-50">
                No active company profiles found in database logs.
              </td>
            </tr>
          ) : (
            companies.map((company) => {
              const currentId = company.id || company._id;

              return (
                <tr
                  key={currentId}
                  className="hover:bg-current/5 transition-colors"
                >
                  {/* Avatar & Basic Info */}
                  <td className="p-4 font-medium flex items-center gap-3">
                    {company.logo && (
                      <img
                        src={company.logo}
                        alt="logo"
                        className="w-10 h-10 rounded-md object-cover border border-current/10"
                      />
                    )}
                    <div>
                      <div className="text-base font-semibold">
                        {company.name}
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-current/5 rounded opacity-70">
                        {company.type || "General"}
                      </span>
                    </div>
                  </td>

                  {/* Metadata fields */}
                  <td className="p-4 opacity-80">
                    {company.location || "Remote"}
                  </td>
                  <td className="p-4 opacity-80">{company.founded || "—"}</td>

                  {/* Status Badges */}
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        company.status === "approved"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : company.status === "rejected"
                            ? "bg-red-500/10 text-red-500 border border-red-500/20"
                            : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>

                  {/* Click Events Trigger Workspace */}
                  <td className="p-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() =>
                          handleStatusChange(currentId, "approved")
                        }
                        disabled={company.status === "approved"}
                        className="px-3 py-1.5 text-xs font-medium bg-green-600 hover:bg-green-700 disabled:opacity-30 disabled:hover:bg-green-600 text-white rounded transition shadow-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(currentId, "rejected")
                        }
                        disabled={company.status === "rejected"}
                        className="px-3 py-1.5 text-xs font-medium bg-red-600 hover:bg-red-700 disabled:opacity-30 disabled:hover:bg-red-600 text-white rounded transition shadow-sm"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCompaniesTable;
