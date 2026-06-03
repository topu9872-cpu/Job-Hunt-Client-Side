"use client";

import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";

import { MdSunny } from "react-icons/md";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
 <button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="relative w-10 h-10 flex items-center justify-center overflow-hidden"
>
  <MdSunny
    className={`absolute text-yellow-500 text-xl transition-all duration-500 ease-in-out ${
      theme === "dark"
        ? "opacity-100 rotate-0 scale-100"
        : "opacity-0 rotate-180 scale-0"
    }`}
  />

  <FaMoon
    className={`absolute text-cyan-500 text-xl transition-all duration-500 ease-in-out ${
      theme === "dark"
        ? "opacity-0 -rotate-180 scale-0"
        : "opacity-100 rotate-0 scale-100"
    }`}
  />
</button>
  );
}