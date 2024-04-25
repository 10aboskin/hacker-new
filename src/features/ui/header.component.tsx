import Logo from "../../assets/yCombinatorLogo.svg?react";
import MoonIcon from "../../assets/moon.svg?react";
import { ViewToggle } from "./view-toggle.component";

export const Header = () => {
  return (
    <header className="flex items-center w-full px-24 border-t-8 border-orange h-36">
      <Logo className="h-10 w-10" />
      <h1 className="ml-4 text-2xl font-extrabold">Hacker News</h1>
      <ViewToggle className="ml-10" />
      <MoonIcon className="ml-auto h-6 w-6" />
    </header>
  );
};

export default Header;
