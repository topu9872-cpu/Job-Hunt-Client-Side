"use client"
import React, { useState } from 'react';

const CreateCompanyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    location: '',
    rating: '',
    founded: '',
    description: '',
    companySize: '',
    openJobs: '',
    review: '',
    salary: '',
    type: ''
  });
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    console.log('Company Data Submitted:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 rounded-xl border border-current/20 bg-transparent">
      <div className="mb-8 border-b border-current/10 pb-4">
        <h2 className="text-2xl font-bold">Create Company Profile</h2>
        <p className="text-sm opacity-60 mt-1">Enter the organization details to generate a new directory listing.</p>
      </div>

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
              step="0.1"
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
            className="px-6 py-3 btn btn-info text-white font-medium rounded-lg  transition duration-200 shadow-md"
          >
            Create Company Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompanyForm;