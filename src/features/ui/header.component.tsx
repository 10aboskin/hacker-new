import Logo from "../../assets/yCombinatorLogo.svg?react";
import MoonIcon from "../../assets/moon.svg?react";
import SunIcon from "../../assets/sun.svg?react";
import { ViewToggle } from "./view-toggle.component";
import { useState } from "react";

export const Header = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const toggleTheme = () => {
    // if set via local storage previously
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        setTheme("dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        setTheme("light");
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        setTheme("light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        setTheme("dark");
      }
    }
  };

  return (
    <header className="flex items-center w-full px-24 border-t-8 border-orange h-36">
      <Logo className="h-10 w-10" />
      <h1 className="ml-4 text-2xl font-extrabold">Hacker News</h1>
      <ViewToggle className="ml-10" />
      {theme === "light" && (
        <button className="ml-auto cursor-pointer hover:bg-black hover:bg-opacity-10 p-2 rounded-full">
          <MoonIcon onClick={toggleTheme} className=" h-6 w-6" />
        </button>
      )}
      {theme === "dark" && (
        <button className="ml-auto cursor-pointer hover:bg-white hover:bg-opacity-10 p-2 rounded-full">
          <SunIcon onClick={toggleTheme} className="ml-auto h-6 w-6" />
        </button>
      )}
    </header>
  );
};

export default Header;
