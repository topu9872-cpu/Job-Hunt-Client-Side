"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
const CompanyFilters = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const handleSearch = () => {
   
    router.push(`/companies?search=${search}`);
  };
  return (
    <div className="mt-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-row items-center gap-3  w-full max-w-4xl mx-auto rounded-xl border border-base-300  shadow-sm"
      >
        <div className="relative w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search company"
            className="w-full h-12 pl-11 pr-4 placeholder:text-gray-400 outline-none bg-transparent"
          />
        </div>

        <motion.button
          onClick={handleSearch}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn btn-info text-white border-4  h-12 rounded-r-xl px-8"
        >
          Search
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CompanyFilters;
