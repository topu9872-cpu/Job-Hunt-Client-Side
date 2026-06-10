"use client";
import Image from "next/image";
import NavLink from "./NavLink";
import { ThemeSwitch } from "../ThemeBtn/ThemeBtn";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router=useRouter()
  const navData = (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/jobs">Jobs</NavLink>
      <NavLink href="/companies">Companies</NavLink>
      <NavLink href="/plan">Plan</NavLink>
      <NavLink href="/dashboard">Dashboard</NavLink>
    </>
  );

  const { data: session } = authClient.useSession();
  const user = session?.user;

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
      <div className="navbar mx-auto fixed  z-50  w-11/12 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              tabIndex="-1"
              className="menu menu-sm dropdown-content  bg-white/10 backdrop-blur-xs rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navData}
            </ul>
          </div>
          <a className="z-50">
            {" "}
            <Image
              src={
                "/assets/Gemini_Generated_Image_5d3v7a5d3v7a5d3v-removebg-preview_LE_upscale_prime_light_ai_30-removebg-preview.png"
              }
              width={70}
              height={70}
              alt="icon"
            />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-5 rounded-full border border-white/20 bg-white/10 backdrop-blur-xs shadow">
            {navData}
          </ul>
        </div>
        <div className="navbar-end gap-5">
          {user ? (
            <div className="flex gap-5">
              <h1 className="text-yellow-500 tracking-wide truncate max-w-30">
                Hi, {user.name}
              </h1>
              <button
                onClick={handleSignout}
                className="btn btn-error text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4 flex">
              <Link href={'/login'} className="btn btn-info text-white">Login</ Link>
              <Link href={'/signup'} className="btn btn-info text-white">Sigin</Link>
            </div>
          )}
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
