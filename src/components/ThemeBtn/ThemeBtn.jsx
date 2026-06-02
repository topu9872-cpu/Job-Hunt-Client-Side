"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";

import { MdSunny } from "react-icons/md";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
     {theme === "dark" ? <MdSunny className="text-yellow-500" />
 : <FaMoon className="text-cyan-500"/>} 
    </button>
  );
}