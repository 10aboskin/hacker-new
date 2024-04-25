import Logo from "./assets/yCombinatorLogo.svg?react";
import MoonIcon from "./assets/moon.svg?react";
import StarIcon from "./assets/star.svg?react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

const cn = (...inputs: Parameters<typeof clsx>) => {
  // Merge class names
  return twMerge(clsx(inputs));
};

function App() {
  const [selected, setSelected] = useState<"latest" | "starred">("latest");
  const [mode, setMode] = useState<"light" | "dark">("light");
  const posts = [
    {
      title:
        "Physicists Create a Bizarre 'Wigner Crystal' Made Purely of Electrons",
      source: "quantummagazine.org",
    },
  ];
  return (
    <div className="border-t-8 border-orange p-16">
      <header className="flex items-center w-full">
        <Logo className="h-10 w-10" />
        <h1 className="ml-4 text-3xl font-extrabold">Hacker News</h1>
        <div className="ml-10 flex items-center">
          <span
            className={cn("", {
              "text-orange font-bold": selected === "latest",
            })}
          >
            latest
          </span>
          <span className="px-2">{"|"}</span>
          <span className="">starred</span>
        </div>
        <MoonIcon className="ml-auto h-6 w-6" />
      </header>
      <main>
        <ol className="list-decimal list-inside">
          {posts.map(({ title, source }) => (
            <li className="marker:text-gray-500 text-2xl">
              <span className="font-bold font-mono">{title}</span>
              <span className="ml-4 text-gray-500 text-sm">({source})</span>
              <div className="ml-8 text-gray-500 text-sm flex items-center">
                <span>42 points by johndoe 1 hour ago</span>
                <span className="px-2">{"|"}</span>
                <span>24 comments</span>
                <span className="px-2">{"|"}</span>
                <span className="flex items-center">
                  <StarIcon
                    className={cn("h-4 w-4 fill-transparent stroke-gray-500", {
                      "fill-orange stroke-none": true,
                    })}
                  />
                  <span className="ml-1">saved</span>
                </span>
              </div>
            </li>
          ))}
        </ol>
        <button className="py-2 px-4 bg-orange text-white text-lg">
          show more
        </button>
      </main>
      <footer className="w-full border-t-4 border-orange">
        <h1 className="ml-4 text-lg font-semibold">Hacker News</h1>
        <div className="ml-10 flex items-center">
          <span
            className={cn("", {
              "text-orange font-bold": selected === "latest",
            })}
          >
            latest
          </span>
          <span className="px-2">{"|"}</span>
          <span className="">starred</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
