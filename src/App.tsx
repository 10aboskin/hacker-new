import {
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { formatDuration, intervalToDuration } from "date-fns";
import { useAppDispatch, useAppSelector } from "./store";

import Logo from "./assets/yCombinatorLogo.svg?react";
import MoonIcon from "./assets/moon.svg?react";
import Spinner from "./features/ui/spinner.component";
import StarIcon from "./assets/star.svg?react";
import clsx from "clsx";
import { getStories } from "./features/stories/stories.slice";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Parameters<typeof clsx>) => {
  // Merge class names
  return twMerge(clsx(inputs));
};

const Link = ({
  className,
  children,
}: PropsWithChildren<{
  className?: HTMLAttributes<HTMLAnchorElement>["className"];
}>) => {
  return <a className={cn("hover:underline", className)}>{children}</a>;
};

function App() {
  const [selected] = useState<"latest" | "starred">("latest");

  const dispatch = useAppDispatch();
  const { stories, status } = useAppSelector((state) => state.stories);

  const initFetch = useCallback(() => {
    dispatch(getStories());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

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
    <>
      <header className="flex items-center w-full px-24 border-t-8 border-orange h-36">
        <Logo className="h-10 w-10" />
        <h1 className="ml-4 text-2xl font-extrabold">Hacker News</h1>
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
      <main className="px-24 mb-16">
        {status === "loading" && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
        {status === "succeeded" && (
          <>
            <ol className="list-decimal list-inside">
              {stories.map(({ title, url, by, descendants, score, time }) => (
                <li className="marker:text-gray-500 marker:text-lg text-xl my-8">
                  <div className="inline-block ml-2">
                    <span className="font-bold font-mono">{title}</span>
                    <span className="ml-4 text-gray-500 text-xs">
                      {url && URL.canParse(url) && `(${new URL(url).hostname})`}
                    </span>
                  </div>
                  <div className="ml-8 text-gray-500 text-xs flex items-center gap-1 mt-2">
                    <span>{score} points by</span>
                    <Link>{by}</Link>
                    <Link>{formatTime(time)} ago</Link>
                    <span>{"|"}</span>
                    <span>{descendants} comments</span>
                    <span>{"|"}</span>
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
              ))}
            </ol>
            <button className="py-2 px-4 bg-orange text-white font-semibold">
              show more
            </button>
          </>
        )}
      </main>
      <footer className="w-full border-t-4 border-orange h-36 flex flex-col justify-center items-center">
        <h1 className="font-semibold mb-2">Hacker News</h1>
        <div className="flex items-center">
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
    </>
  );
}

export default App;
