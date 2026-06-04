"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

export default function JobSearch({search, location: initiralLocation}) {
  const router=useRouter();
 const [title, setTitle] = useState(search || "");
  const [location, setLocation] = useState("");

 const handleSearch = () => {
  const url = `/jobs?page=1&search=${title}&location=${location}`;

  router.push(url);
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-row items-center gap-3 w-full max-w-4xl mx-auto rounded-xl border border-base-300  shadow-sm"
    >
      <div className="relative w-full">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
        <input onChange={(e)=>setTitle(e.target.value)}
         value={title}
          type="search"
          placeholder="Job title or company"
          className="w-full h-12 pl-11 pr-4 placeholder:text-gray-400 outline-none bg-transparent"
        />
      </div>

      <div className="hidden md:block h-8 w-px bg-gray-400" />

      <div className="relative w-full">
        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
        
        <input onChange={(e)=>setLocation(e.target.value)}
       value={location}
          type="search"
          placeholder="Location"
          className="w-full h-12 pl-11 placeholder:text-gray-400 pr-4 outline-none bg-transparent"
        />
      </div>

      <motion.button onClick={handleSearch}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="btn btn-info text-white border-4  h-12 rounded-r-xl px-8"
      >
        Search
      </motion.button>
    </motion.div>
  );
}