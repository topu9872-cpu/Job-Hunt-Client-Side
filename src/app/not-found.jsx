"use client";

import Link from "next/link";
import { FiHome, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 overflow-hidden">
      <div className="text-center max-w-md">

        {/* Floating 404 */}
        <motion.h1
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-7xl font-extrabold text-info"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold mt-4 text-slate-900 dark:text-white"
        >
          Page Not Found
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-slate-500 mt-2"
        >
          The page you are looking for doesn’t exist or has been moved.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 justify-center mt-6"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg btn btn-info text-white  transition"
          >
            <FiHome />
            Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
          >
            <FiArrowLeft />
            Go Back
          </button>
        </motion.div>
      </div>

      {/* Background floating blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl top-10 left-10"
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />

      <motion.div
        className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10"
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
    </div>
  );
}