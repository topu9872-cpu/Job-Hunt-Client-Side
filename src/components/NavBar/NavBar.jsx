"use client";
import Image from "next/image";
import NavLink from "./NavLink";
import { ThemeSwitch } from "../ThemeBtn/ThemeBtn";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const navLinks = [];

  const navData = (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/jobs">Jobs</NavLink>
      <NavLink href="/companies">Companies</NavLink>
      <NavLink href="/plan">Plan</NavLink>
    </>
  );

  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  };

  if (user?.email) {
    const userRole = user?.role || "seeker";
    navLinks.push(
      <NavLink key="dashboard" href={dashboardLinks[userRole] || "/dashboard/seeker"}>
        Dashboard
      </NavLink>
    );
  }

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <div className="mx-auto z-50 flex justify-center">
      <div className="navbar mx-auto fixed z-50 w-11/12 px-2 sm:px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden px-1 sm:px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-white/10 backdrop-blur-xs rounded-box z-1 mt-3 w-52 p-2 shadow gap-1"
            >
              {navData} {navLinks}
            </ul>
          </div>
          <Link href="/" className="z-50 flex items-center">
            <Image
              src="/assets/job-hunt-icon.png"
              width={70}
              height={70}
              alt="icon"
              className="w-12 sm:w-17 h-full"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-5 rounded-full border border-white/20 bg-white/10 backdrop-blur-xs shadow">
            {navData} {navLinks}
          </ul>
        </div>
        <div className="navbar-end gap-2 sm:gap-5">
          {user ? (
            <div className="flex gap-2 sm:gap-5 items-center">
              <h1 className="text-yellow-500 tracking-wide truncate max-w-25 sm:max-w-30 text-xs sm:text-base">
                Hi, {user.name}
              </h1>
              <button
                onClick={handleSignout}
                className="btn btn-xs sm:btn-sm md:btn-md btn-error text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-2 sm:space-x-4 flex">
              <Link href={"/login"} className="btn btn-xs sm:btn-sm md:btn-md btn-info text-white">
                Login
              </Link>
              <Link href={"/signup"} className="btn btn-xs sm:btn-sm md:btn-md btn-info text-white">
                Sigin
              </Link>
            </div>
          )}
          <div className="scale-90 sm:scale-100">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;