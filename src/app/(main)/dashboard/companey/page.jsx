"use client";

import React, { useState } from "react";
import { 
  HiOutlineBuildingOffice, HiOutlineGlobeAlt, HiOutlineCurrencyDollar,
  HiOutlineUsers, HiOutlineMapPin, HiOutlineStar 
} from "react-icons/hi2";
import { FiCheckCircle } from "react-icons/fi";

const CreateCompanyForm = () => {
  // 1. Form States
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    revenue: "$10+ billion (USD)",
    employeeCount: "10000+ Employees",
    headquarters: "",
    industry: "Business Consulting",
    rating: 3.7,
    description: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Input value change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission process
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Company Created Successfully:", formData);
    
    // Clear success notification toast after 4 seconds
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto border border-gray-400 mt-12 rounded-2xl p-6 font-sans antialiased">
      
      {/* Toast Notification Pop */}
      {isSubmitted && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300">
          <FiCheckCircle size={20} />
          <span className="font-bold text-sm">Company Profile Created Successfully!</span>
        </div>
      )}

      {/* Main Form Page Headers */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Create Company Profile</h1>
        <p className="text-sm  mt-1">Configure structural organizational benchmarks, headquarter roots, and display indices.</p>
      </div>

      {/* Transparent Form Card Block */}
      <form onSubmit={handleSubmit} className="border border-gray-200 rounded-2xl overflow-hidden">
        
        <div className="p-6 md:p-8 space-y-8">
          
          {/* SECTION 1: IDENTITY & ONLINE OVERVIEW */}
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <HiOutlineBuildingOffice  size={22} />
              <span>Company Identity</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="e.g. Accenture"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Corporate Website URL</label>
                <div className="relative">
                  <HiOutlineGlobeAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="file"
                    name="website"
                    required
                  
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* SECTION 2: DEMOGRAPHICS & METRICS */}
          <div>
            <h2 className="text-lg font-bold  flex items-center gap-2 mb-4">
              <HiOutlineUsers  size={22} />
              <span>Scale & Operational Metrics</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider  mb-2">Global Headquarters Location</label>
                <div className="relative">
                  <HiOutlineMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2" size={18} />
                  <input
                    type="text"
                    name="headquarters"
                    required
                    placeholder="e.g. Dublin, Ireland"
                    value={formData.headquarters}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Industry Sector</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 bg-background cursor-pointer"
                >
                  <option>Business Consulting</option>
                  <option>Information Technology</option>
                  <option>Financial Services</option>
                  <option>Software Engineering</option>
                  <option>Design & UX Agency</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Annual Revenue Band</label>
                <div className="relative">
                  <HiOutlineCurrencyDollar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border bg-background  border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition cursor-pointer appearance-none"
                  >
                    <option>$10+ billion (USD)</option>
                    <option>$1 - $10 billion (USD)</option>
                    <option>$100 - $999 million (USD)</option>
                    <option>Under $100 million (USD)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider  mb-2">Total Employee Strength</label>
                <div className="relative">
                  <HiOutlineUsers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border bg-background  border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition cursor-pointer appearance-none"
                  >
                    <option>10000+ Employees</option>
                    <option>5000 - 9999 Employees</option>
                    <option>1000 - 4999 Employees</option>
                    <option>Under 1000 Employees</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* SECTION 3: RATINGS & STRATEGIC OVERVIEW */}
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <HiOutlineStar  size={22} />
              <span>Public Ratings & Overview</span>
            </h2>

            <div className="space-y-6">
              {/* Range Slider for Core Score Setup */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider ">Initial Profile Score Rating</label>
                  <span className="text-info font-extrabold text-sm">
                    ★ {formData.rating} / 5.0
                  </span>
                </div>
                <input
                  type="range"
                  name="rating"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="w-full h-2 border border-gray-200 rounded-lg appearance-none cursor-pointer accent-info "
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider  mb-2">Company About & Mission Summary</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Describe your flexibility framework parameters, diversity indexes, or workplace transformation track records..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Transparent Footer Action Area */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl text-white text-sm font-bold btn btn-error transition"
          >
            Discard
          </button>
          <button
            type="submit"
            className="btn btn-info text-white px-6 py-2.5 rounded-xl text-sm font-bold  transition shadow-sm"
          >
            Create Profile
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateCompanyForm;