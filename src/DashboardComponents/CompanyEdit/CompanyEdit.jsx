"use client";

import React, { useState, useEffect } from "react";
import { uploadToImgBB } from "@/app/api/Server/api";
import { updateRectuiterJob } from "@/app/api/Server/Server";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Modal, Button } from "@heroui/react";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiLayers,
  FiPlus,
  FiX,
  FiFileText,
  FiEdit,
} from "react-icons/fi";

const EditJobModal = ({ jobData, onRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [images, setImages] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    jobCreaterId: "",
    location: "",
    jobType: "Full-time",
    experience: "Mid-Level",
    salaryMin: "",
    salaryMax: "",
    salaryPeriod: "Hour",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (jobData && isOpen) {
      setFormData({
        title: jobData.title || "",
        company: jobData.company || "",
        jobCreaterId: jobData.jobCreaterId || user?.id,
        location: jobData.location || "",
        jobType: jobData.jobType || "Full-time",
        experience: jobData.experience || "Mid-Level",
        salaryMin: jobData.salaryMin || "",
        salaryMax: jobData.salaryMax || "",
        salaryPeriod: jobData.salaryPeriod || "Hour",
        description: jobData.description || "",
        status: jobData.status || "pending",
      });
      setSkills(jobData.skills || []);
    }
  }, [jobData, isOpen, user]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalLogoUrl = jobData?.logo || "";

      if (images) {
        finalLogoUrl = await uploadToImgBB(images);
      }

      const res = await updateRectuiterJob(jobData._id, {
        ...formData,
        skills,
        userId: user?.id,
        logo: finalLogoUrl,
      });

      if (res) {
        toast.success("Job Updated Successfully!");
        router.refresh()
        if (onRefresh) onRefresh();
        setIsOpen(false);
      } else {
        toast.error("Failed to Update Job!");
      }
    } catch (error) {
      toast.error("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onPress={() => setIsOpen(true)} isIconOnly variant="flat">
        <FiEdit size={16} />
      </Button>

      {/* HeroUI Theme-Agnostic Compound Layout Component */}
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        variant="blur"
      >
        <Modal.Container
          size="md"
          placement="center"
          className="max-w-2xl bg-background border border-divider rounded-2xl text-foreground shadow-2xl"
        >
          <Modal.Dialog>
            <form onSubmit={handleSubmit}>
              {/* Header Context */}
              <div className="flex flex-col gap-1 border-b border-divider px-6 py-4">
                <Modal.Heading className="text-xl font-bold">
                  Edit Job Posting
                </Modal.Heading>
                <p className="text-xs text-default-500 font-normal">
                  Modify the detailed insights to update your recruitment
                  pipeline status.
                </p>
              </div>

              {/* Body Content Form Scope */}
              <div className="py-6 px-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* SECTION 1: ROLE SPECIFICATIONS */}
                <div>
                  <h2 className="text-sm font-bold flex items-center gap-2 mb-4 text-default-700">
                    <FiBriefcase className="text-default-400" />
                    <span>Role Specifications</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-default-500 mb-2">
                        Job Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-default-100 border border-divider rounded-xl text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:border-primary transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-default-500 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-default-100 border border-divider rounded-xl text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:border-primary transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-default-500 mb-2">
                        Company Logo
                      </label>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setImages(file);
                        }}
                        className="w-full text-xs text-default-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-default-200 file:text-foreground hover:file:bg-default-300 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-default-500 mb-2">
                        Location / Metro Area
                      </label>
                      <div className="relative">
                        <FiMapPin
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-default-400"
                          size={16}
                        />
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-default-100 border border-divider rounded-xl text-sm text-foreground placeholder:text-default-400 focus:outline-none focus:border-primary transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-default-500 mb-2">
                        Job Arrangement Type
                      </label>
                      <div className="relative">
                        <FiClock
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-default-400"
                          size={16}
                        />
                        <select
                          name="jobType"
                          value={formData.jobType}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-default-100 border border-divider rounded-xl text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer appearance-none"
                        >
                          <option className="bg-background text-foreground">
                            Full-time
                          </option>
                          <option className="bg-background text-foreground">
                            Part-time
                          </option>
                          <option className="bg-background text-foreground">
                            Contract
                          </option>
                          <option className="bg-background text-foreground">
                            Remote
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-default-500 mb-2">
                        Experience Tier
                      </label>
                      <div className="relative">
                        <FiLayers
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-default-400"
                          size={16}
                        />
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2.5 bg-default-100 border border-divider rounded-xl text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer appearance-none"
                        >
                          <option className="bg-background text-foreground">
                            Entry-Level
                          </option>
                          <option className="bg-background text-foreground">
                            Mid-Level
                          </option>
                          <option className="bg-background text-foreground">
                            Senior-Level
                          </option>
                          <option className="bg-background text-foreground">
                            Lead / Management
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-divider" />

                {/* SECTION 2: COMPENSATION PROFILE */}
                <div>
                  <h2 className="text-sm font-bold flex items-center gap-2 mb-4 text-default-700">
                    <FiDollarSign className="text-default-400" />
                    <span>Compensation Range</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-default-500 mb-2">
                        Minimum Pay ($)
                      </label>
                      <input
                        type="number"
                        name="salaryMin"
                        required
                        value={formData.salaryMin}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-default-100 border border-divider rounded-xl text-sm text-foreground focus:outline-none focus:border-primary transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-default-500 mb-2">
                        Maximum Pay ($)
                      </label>
                      <input
                        type="number"
                        name="salaryMax"
                        required
                        value={formData.salaryMax}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-default-100 border border-divider rounded-xl text-sm text-foreground focus:outline-none focus:border-primary transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-default-500 mb-2">
                        Rate Period
                      </label>
                      <select
                        name="salaryPeriod"
                        value={formData.salaryPeriod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-default-100 border border-divider rounded-xl text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer appearance-none"
                      >
                        <option className="bg-background text-foreground">
                          Hour
                        </option>
                        <option className="bg-background text-foreground">
                          Year
                        </option>
                        <option className="bg-background text-foreground">
                          Month
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <hr className="border-divider" />

                {/* SECTION 3: DESCRIPTION & QUALIFICATIONS */}
                <div>
                  <h2 className="text-sm font-bold flex items-center gap-2 mb-4 text-default-700">
                    <FiFileText className="text-default-400" />
                    <span>Job Details & Qualifications</span>
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-default-500 mb-2">
                        Job Summary Description
                      </label>
                      <textarea
                        name="description"
                        required
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-default-100 border border-divider rounded-xl text-sm text-foreground focus:outline-none focus:border-primary transition resize-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-default-500 mb-2">
                        Required Skills / Frameworks
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder="Press enter to add skills"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddSkill(e);
                            }
                          }}
                          className="flex-1 px-4 py-2.5 bg-default-100 border border-divider rounded-xl text-sm text-foreground focus:outline-none focus:border-primary transition"
                        />
                        <Button
                          type="button"
                          onPress={handleAddSkill}
                          variant="flat"
                          className="min-w-0 px-4 rounded-xl"
                        >
                          <FiPlus size={16} />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2 p-3 rounded-xl border border-divider bg-default-50 min-h-14">
                        {skills.length === 0 ? (
                          <span className="text-xs text-default-400 self-center">
                            No qualification tags added yet.
                          </span>
                        ) : (
                          skills.map((skill, index) => (
                            <span
                              key={index}
                              className="flex items-center gap-1.5 text-xs font-semibold pl-3 pr-1.5 py-1.5 rounded-lg border border-divider bg-default-100 text-foreground"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="p-0.5 text-default-400 hover:text-danger transition"
                              >
                                <FiX size={12} />
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Control Actions */}
              <div className="flex justify-end gap-2 border-t border-divider px-6 py-4">
                <Button
                  type="button"
                  variant="light"
                  onPress={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={loading}
                  className="font-semibold rounded-xl"
                >
                  Save Updates
                </Button>
              </div>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
};

export default EditJobModal;
