import { ViewToggle } from "./view-toggle.component";

export const Footer = () => {
  return (
    <footer className="w-full border-t-4 border-orange h-36 flex flex-col justify-center items-center">
      <h1 className="font-semibold mb-2">Hacker News</h1>
      <ViewToggle />
    </footer>
  );
};

export default Footer;
