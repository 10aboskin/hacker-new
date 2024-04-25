import { formatDuration, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

import Logo from "./assets/yCombinatorLogo.svg?react";
import MoonIcon from "./assets/moon.svg?react";
import StarIcon from "./assets/star.svg?react";
import axios from "axios";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Parameters<typeof clsx>) => {
  // Merge class names
  return twMerge(clsx(inputs));
};

const getUrl = (baseUrl: string) =>
  `https://hacker-news.firebaseio.com/v0${baseUrl}.json`;

const getTopStories = async () => {
  const { data } = await axios.get<Array<number>>(getUrl("/topstories"));

  return data;
};

type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
};

const getItem = async (itemId: number) => {
  const { data } = await axios.get<Story>(getUrl(`/item/${itemId}`));

  return data;
};

function App() {
  const [selected, setSelected] = useState<"latest" | "starred">("latest");
  const [mode, setMode] = useState<"light" | "dark">("light");

  const [storyData, setStoryData] = useState<Story[]>([]);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    // fetch top 500
    const topStories = await getTopStories();
    const storyData = await Array.fromAsync(
      topStories.slice(0, 12).map(getItem) // fetching the first 12 to display
    );
    setStoryData(storyData);
  };

  const formatTime = (time: number) => {
    const start = new Date(time * 1000); // mult by 1000 to convert seconds to ms
    const end = new Date();
    const formattedDuration = formatDuration(
      intervalToDuration({ start, end }),
      {
        delimiter: ",", // give it a delimiter to split on
      }
    );
    return formattedDuration.split(",")[0]; // split to get the highest magnitude value
  };

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
          {storyData.map(
            ({ title, url, by, descendants, id, kids, score, time, type }) => (
              <li className="marker:text-gray-500 text-2xl">
                <span className="font-bold font-mono">{title}</span>
                <span className="ml-4 text-gray-500 text-sm">({url})</span>
                <div className="ml-8 text-gray-500 text-sm flex items-center">
                  {score} points by {by} {formatTime(time)}
                  <span className="px-2">{"|"}</span>
                  <span>24 comments</span>
                  <span className="px-2">{"|"}</span>
                  <span className="flex items-center">
                    <StarIcon
                      className={cn(
                        "h-4 w-4 fill-transparent stroke-gray-500",
                        {
                          "fill-orange stroke-none": true,
                        }
                      )}
                    />
                    <span className="ml-1">saved</span>
                  </span>
                </div>
              </li>
            )
          )}
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
