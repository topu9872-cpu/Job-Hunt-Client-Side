import Image from "next/image";
import NavLink from "./NavLink";
import { ThemeSwitch } from "../ThemeBtn/ThemeBtn";

const NavBar = () => {
  const navData = (
    <>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/jobs">Jobs</NavLink>
      <NavLink href="/companies">Companies</NavLink>
      <NavLink href="/dashboard">Dashboard</NavLink>
    </>
  );

  return (
    <div className="">
      <div className="navbar mx-auto fixed top-0 z-50  w-11/12 ">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navData}
            </ul>
          </div>
          <a className="">
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
          <ul className="menu menu-horizontal gap-5 border rounded-full px-4">
            {navData}
          </ul>
        </div>
        <div className="navbar-end gap-5">
          <a className="btn">Button</a>
          <ThemeSwitch/>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
