'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NavLink = ({ children, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="relative px-3 font-semibold  py-1 rounded-full">
      {isActive && (
        <motion.div
          layoutId="navbar-tab"
          className="absolute inset-0 bg-info rounded-full"
          transition={{
            type: "spring",
            stiffness: 600,
            damping:90,
          }}
        />
      )}

      <span
        className={`relative z-50 ${
          isActive && "text-white" 
        }`}
      >
        {children}
      </span>
    </Link>
  );
};

export default NavLink;