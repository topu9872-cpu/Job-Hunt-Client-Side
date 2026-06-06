"use client";

import React, { useState } from "react";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiLayers,
  FiPlus,
  FiX,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";

const CreateJobForm = () => {
  // 1. Form Core States
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "Google",
    companylogo: "",
    location: "",
    jobType: "Full-time",
    experienceLevel: "Mid-Level",
    salaryMin: "",
    salaryMax: "",
    salaryPeriod: "Hour",
    description: "",
  });
  console.log(formData);
  // 2. Dynamic Skills Tag Management State
  const [skills, setSkills] = useState(["ReactJS", "Node.js", "JavaScript"]);
  const [skillInput, setSkillInput] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Form Submit Submission Engine
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Job Data Created Successfully:", { ...formData, skills });
    setSkillInput("");
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const uploadToImgBB = async (file) => {
    const formDataImg = new FormData();
    formDataImg.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=process.env.NEXT_PUBLIC_IMGBB_API_KEY`,
      {
        method: "POST",
        body: formDataImg,
      },
    );

    const data = await res.json();
    return data.data.url;
  };

  return (
    <div className="max-w-4xl mx-auto border border-gray-500 rounded-2xl p-4 font-sans antialiased">
      {/* Toast Notification */}
      {isSubmitted && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 animate-bounce">
          <FiCheckCircle size={20} />
          <span className="font-bold text-sm">
            Job Posting Created Successfully!
          </span>
        </div>
      )}
      <img
        src={
          formData.companylogo ||
          "https://i.ibb.co.com/wZfmHD2J/elg21-bird-8788491.jpg"
        }
        width={70}
        height={70}
        alt="logo"
      />

      {/* Header Banner */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold  tracking-tight">
          Create a New Job Posting
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill out the detailed insights to publish your recruitment requisition
          position pipeline.
        </p>
      </div>

      {/* Main Form Elements Layout */}
      <form
        onSubmit={handleSubmit}
        className=" border-gray-400 rounded-2xl shadow-sm overflow-hidden"
      >
        <div className="p-6 md:p-8 space-y-8">
          {/* SECTION 1: ROLE DETAILS */}
          <div>
            <h2 className="text-lg font-bold  flex items-center gap-2 mb-4">
              <FiBriefcase className="text-gray-500" />
              <span>Role Specifications</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  required
                  placeholder="e.g. ReactJS Full Stack Engineer"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3  border border-gray-400 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3  border border-gray-400 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Company Logo
                </label>
                <input
                  type="file"
                  name="companylogo"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const imageUrl = await uploadToImgBB(file);

                    setFormData((prev) => ({
                      ...prev,
                      companylogo: imageUrl,
                    }));
                  }}
                  className="w-full px-4 py-3 border border-gray-400 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Location / Metro Area
                </label>
                <div className="relative">
                  <FiMapPin
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 "
                    size={16}
                  />
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g. Morristown, NJ"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-400 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Job Arrangement Type
                </label>
                <div className="relative">
                  <FiClock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    size={16}
                  />
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3  border bg-background  border-gray-200 rounded-xl text-sm focus:outline-none cursor-pointer"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Remote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Experience Tier
                </label>
                <div className="relative">
                  <FiLayers
                    className="absolute left-3.5 top-1/2 -translate-y-1/2"
                    size={16}
                  />
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border bg-background  border-gray-400 rounded-xl text-sm focus:outline-none   cursor-pointer"
                  >
                    <option>Entry-Level</option>
                    <option>Mid-Level</option>
                    <option>Senior-Level</option>
                    <option>Lead / Management</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* SECTION 2: COMPENSATION PROFILE */}
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <FiDollarSign className="text-gray-500" />
              <span>Compensation Range</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                  Minimum Pay ($)
                </label>
                <input
                  type="number"
                  name="salaryMin"
                  required
                  placeholder="44.00"
                  value={formData.salaryMin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                  Maximum Pay ($)
                </label>
                <input
                  type="number"
                  name="salaryMax"
                  required
                  placeholder="54.00"
                  value={formData.salaryMax}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Rate Period
                </label>
                <select
                  name="salaryPeriod"
                  value={formData.salaryPeriod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border bg-background  border-gray-300 rounded-xl text-sm focus:outline-none cursor-pointer"
                >
                  <option>Hour</option>
                  <option>Year</option>
                  <option>Month</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-400" />

          {/* SECTION 3: DESCRIPTION & DYNAMIC QUALIFICATIONS */}
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <FiFileText />
              <span>Job Details & Qualifications</span>
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Job Summary Description
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  placeholder="Outline context flexibility, benefits structures, project terms..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3  border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition resize-none leading-relaxed"
                />
              </div>

              {/* Dynamic Tag Builder Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                  Required Skills / Frameworks
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Press enter or click '+' to add skills (e.g. UX, Tomcat)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddSkill(e))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-black focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="p-3.5 rounded-xl transition flex items-center justify-center shrink-0"
                  >
                    <FiPlus size={20} />
                  </button>
                </div>

                {/* Displaying Rendered Skill Badge Chips */}
                <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-gray-300 min-h-14">
                  {skills.length === 0 ? (
                    <span className="text-xs m-1.5 self-center">
                      No qualification tags added yet.
                    </span>
                  ) : (
                    skills.map((skill, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1.5  text-xs font-bold pl-3 pr-1.5 py-1.5 rounded-lg border border-gray-200 shadow-sm transition"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="p-0.5 rounded-md  hover:text-rose-600 transition"
                        >
                          <FiX size={14} />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Action Controls Footer Area */}
        <div className=" px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 btn btn-error rounded-xl text-sm font-bold transition"
          >
            Cancel Requisition
          </button>
          <button
            type="submit"
            className=" px-6 py-2.5 rounded-xl btn btn-info text-sm font-bold transition shadow-sm"
          >
            Publish Job Posting
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;
