"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadToImgBB } from "@/app/api/Server/api";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("seeker");
  const [images, setImages] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const image = await uploadToImgBB(images);
    const formData = Object.fromEntries(new FormData(e.target));
    const plan = role === "seeker" ? "seeker_free" : "recruiters_free";
    const { data, error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      image: image,
      role: role,
      plan: plan,
    });


    if (data) {
      toast.success("Account Created Successfully!");
      router.push(redirectTo);
    }

    if (error) {
      toast.error(error.message || "Account Creation Failed!");
    }
  };

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/login",
    });
  };

  const handleGitHubSignup = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/login",
    });
  };

  return (
    <div className="min-h-screen flex items-center mt-10 justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md border border-gray-400 p-6 rounded-2xl shadow-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        {/* NAME */}
        <input
          name="name"
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const url = await uploadToImgBB(file);
            setImages(url);
          }}
          className="w-full p-3 border rounded-lg"
        />

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 border rounded-lg pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* ROLE */}
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              value="seeker"
              checked={role === "seeker"}
              onChange={(e) => setRole(e.target.value)}
            />
            Seeker
          </label>

          <label>
            <input
              type="radio"
              value="recruiter"
              checked={role === "recruiter"}
              onChange={(e) => setRole(e.target.value)}
            />
            Recruiter
          </label>
        </div>

        {/* SUBMIT */}
        <button type="submit" className="w-full btn btn-info">
          Sign Up
        </button>

        {/* SOCIAL */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="btn bg-white text-black"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <button type="button" onClick={handleGitHubSignup} className="btn">
            <svg
              aria-label="GitHub logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
              ></path>
            </svg>
            Login with GitHub
          </button>
        </div>

        <p className="text-center text-sm">
          I have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default SignupForm;
