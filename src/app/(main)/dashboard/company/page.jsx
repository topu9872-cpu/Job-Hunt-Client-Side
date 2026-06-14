"use client";

import { getCompaniesPost, getUsersCompaniesData } from "@/app/api/Server/Server";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateCompanyForm = ({ onSubmit }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  // Mode toggling between 'table' view and 'create' form view
  const [viewMode, setViewMode] = useState("table"); 
  const [companies, setCompanies] = useState([]);
  const [hiddenCompanies, setHiddenCompanies] = useState(new Set());

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    location: "",
    rating: "",
    founded: "",
    description: "",
    companySize: "",
    openJobs: "",
    review: "",
    salary: "",
    type: "",
    postedAt: new Date().toLocaleDateString("en-GB"),
    status: "pending"
  });

  // Fetch companies data on load
  const fetchCompanies = async () => {
    if (!user?.id) return;
    try {
      const companyData = await getUsersCompaniesData(user.id);
      if (companyData) {
        setCompanies(Array.isArray(companyData) ? companyData : [companyData]);
      }
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    
    const result = await getCompaniesPost({ ...formData, userId: user?.id });
    if (result) {
      setTimeout(() => {
        toast.success("Company Created Successfully!");
      }, 400);
      
      // Refresh the data list and switch back to table view
      await fetchCompanies();
      setViewMode("table");
      
      // Reset Form
      setFormData({
        name: "", logo: "", location: "", rating: "", founded: "",
        description: "", companySize: "", openJobs: "", review: "",
        salary: "", type: "", postedAt: new Date().toLocaleDateString("en-GB"),
        status: "pending"
      });
    } else {
      toast.error("Failed to Create Company!");
    }
  };

  // Visibility handler (Hide functionality)
  const toggleVisibility = (companyId) => {
    setHiddenCompanies((prev) => {
      const next = new Set(prev);
      if (next.has(companyId)) {
        next.delete(companyId);
      } else {
        next.add(companyId);
      }
      return next;
    });
    toast.success("Visibility setting updated");
  };

  return (
    <div className="max-w-6xl mt-10 md:mt-0 mx-auto my-8 p-6 rounded-xl border border-current/20 bg-transparent">
      
      {/* Navigation Headers */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-current/10 pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {viewMode === "table" ? "Company Directory" : "Create Company Profile"}
          </h2>
          <p className="text-sm opacity-60 mt-1">
            {viewMode === "table" 
              ? "Manage your active, hidden, and pending organizational structures." 
              : "Enter the organization details to generate a new directory listing."}
          </p>
        </div>
        <button
          onClick={() => setViewMode(viewMode === "table" ? "create" : "table")}
          className="px-4 py-2 bg-info  text-white text-sm font-medium rounded-lg transition"
        >
          {viewMode === "table" ? "+ New Company" : "← Back to Dashboard"}
        </button>
      </div>

      {/* VIEW ONE: COMPANIES TABLE */}
      {viewMode === "table" && (
        <div className="overflow-x-auto rounded-lg border border-current/10">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-current/10 bg-current/5 font-semibold">
                <th className="p-4">Company Name</th>
                <th className="p-4">Location</th>
                <th className="p-4">Industry</th>
                <th className="p-4">Open Jobs</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-current/10">
              {companies.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center opacity-50">
                    No records found. Click "+ New Company" to get started.
                  </td>
                </tr>
              ) : (
                companies.map((company) => {
                  const isHidden = hiddenCompanies.has(company.id || company._id);
                  return (
                    <tr 
                      key={company.id || company._id} 
                      className={`hover:bg-current/5 transition-opacity duration-200 ${isHidden ? "opacity-40" : "opacity-100"}`}
                    >
                      <td className="p-4 font-medium flex items-center gap-3">
                        {company.logo && (
                          <img src={company.logo} alt="logo" className="w-8 h-8 rounded object-cover border border-current/10" />
                        )}
                        <div>
                          <div>{company.name}</div>
                          <span className="text-xs opacity-50">Size: {company.companySize || "N/A"}</span>
                        </div>
                      </td>
                      <td className="p-4 opacity-80">{company.location || "—"}</td>
                      <td className="p-4 opacity-80">
                        <span className="px-2 py-1 bg-current/5 rounded text-xs">
                          {company.type || "General"}
                        </span>
                      </td>
                      <td className="p-4 font-semibold">{company.openJobs || 0}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                          company.status === "approved" ? "bg-green-500/20 text-green-500" : company.status === "rejected"? 'bg-red-100 text-red-500' : "bg-yellow-500/20 text-yellow-500"
                        }`}>
                          {company.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => toggleVisibility(company.id || company._id)}
                          className="px-2.5 py-1.5 text-xs font-medium border border-current/20 rounded hover:bg-current/10 transition"
                        >
                          {isHidden ? "👁️ Show" : "🙈 Hide"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW TWO: CREATE COMPANY FORM */}
      {viewMode === "create" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name & Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Company Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Stripe, Inc."
                className="w-full px-4 py-2.5 bg-transparent border border-current/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:opacity-40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Industry Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="e.g., FinTech, SaaS"
                className="w-full px-4 py-2.5 bg-transparent border border-current/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:opacity-40"
              />
            </div>
          </div>

          {/* Row 2: Logo URL */}
          <div>
            <label className="block text-sm font-semibold mb-2">Logo Image URL</label>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
              className="w-full px-4 py-2.5 bg-transparent border border-current/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:opacity-40"
            />
          </div>

          {/* Row 3: Location & Founded */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">Headquarters Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA"
                className="w-full px-4 py-2.5 bg-transparent border border-current/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:opacity-40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Year Founded</label>
              <input
                type="number"
                name="founded"
                value={formData.founded}
                onChange={handleChange}
                placeholder="e.g., 2015"
                className="w-full px-4 py-2.5 bg-transparent border border-current/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:opacity-40"
              />
            </div>
          </div>

          {/* Row 4: Rating, Company Size, Open Jobs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Rating (0.0 - 5.0)</label>
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="1"
                value={formData.rating}
                onChange={handleChange}
                placeholder="4.5"
                className="w-full px-4 py-2.5 bg-transparent border border-current/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:opacity-40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Company Size</label>
              <input
                type="text"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                placeholder="e.g., 500-1000"
                className="w-full px-4 py-2.5 bg-transparent border border-current/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:opacity-40"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Open Jobs Count</label>
              <input
                type="number"
                name="openJobs"
                value={formData.openJobs}
                onChange={handleChange}
                placeholder="12"
                className="w-full px-4 py-2.5 bg-transparent border border-current/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:opacity-40"
              />
            </div>
          </div>

          {/* Row 5: Salary Range */}
          <div>
            <label className="block text-sm font-semibold mb-2">Average Salary Range</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., $95k - $140k"
              className="w-full px-4 py-2.5 bg-transparent border border-current/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder:opacity-40"
            />
          </div>

          {/* Row 6: Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Company Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a brief overview of what the company does..."
              className="w-full px-4 py-2.5 bg-transparent border border-current/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none placeholder:opacity-40"
            />
          </div>

          {/* Row 7: Review */}
          <div>
            <label className="block text-sm font-semibold mb-2">Featured Review / Executive Summary</label>
            <textarea
              name="review"
              rows="3"
              value={formData.review}
              onChange={handleChange}
              placeholder="e.g., 'Great work culture and competitive equity packages...'"
              className="w-full px-4 py-2.5 bg-transparent border border-current/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none placeholder:opacity-40"
            />
          </div>

          {/* Submit Actions */}
          <div className="flex justify-end pt-4 border-t border-current/10">
            <button
              type="submit"
              className="px-6 py-3 btn btn-info text-white font-medium rounded-lg transition duration-200 shadow-md"
            >
              Create Company Profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateCompanyForm;