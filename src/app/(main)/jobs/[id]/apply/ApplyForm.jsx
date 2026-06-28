"use client";

import { uploadToImgBB } from "@/app/api/Server/api";
import { getUserApplyPost } from "@/app/api/Server/Server";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

const ApplyForm = ({ user, job }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.massage
    ) {
      toast.error("Please fill all fields!");
      return;
    }
    if (!resumeFile) {
      toast.error("Please upload resume!");
      return;
    }

    let resumeUrl = "";

    if (resumeFile) {
      resumeUrl = await uploadToImgBB(resumeFile);
    }

    const loadingToast = toast.loading("Submitting...");

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        massage: formData.massage,
        resume: resumeUrl,
        jobId: job?._id,
        jobTitle: job?.title,
        companyName: job?.company,
        userId: user?.id,
        userRole: user?.role,
        image: user?.image,
        applicationData: new Date(),
        jobCreaterId: job?.jobCreaterId,
        status: "pending",
      };

      const res = await getUserApplyPost(userData);

      if (res?.insertedId || res?.acknowledged) {
        toast.success("Applied Successfully!", {
          id: loadingToast,
        });

        setResumeFile(null);
        window.location.reload();
      } else {
        toast.error("Failed to Apply!", {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        id: loadingToast,
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl border rounded-2xl p-6 shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Job Application</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="file"
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setResumeFile(e.target.files?.[0])}
          />

          <textarea
            name="massage"
            rows="5"
            placeholder="Message..."
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full btn btn-info text-white p-3 rounded-lg"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
