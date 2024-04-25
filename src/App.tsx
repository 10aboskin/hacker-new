import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import { getStories, toggleStar } from "./features/stories/stories.slice";
import { useAppDispatch, useAppSelector } from "./store";

import Link from "./features/ui/link.component";
import Logo from "./assets/yCombinatorLogo.svg?react";
import MoonIcon from "./assets/moon.svg?react";
import Spinner from "./features/ui/spinner.component";
import StarIcon from "./assets/star.svg?react";
import cn from "./lib/cn";
import formatTime from "./lib/format-time";

function App() {
  const [selectedView, setSelectedView] = useState<"latest" | "starred">(
    "latest"
  );

  const dispatch = useAppDispatch();

  const {
    storyList: stories,
    status,
    stars,
  } = useAppSelector((state) => state.stories);
  const filteredStories = useAppSelector((state) =>
    state.stories.storyList.filter((story) =>
      state.stories.stars.includes(story.id)
    )
  );

  const initFetch = useCallback(() => {
    dispatch(getStories());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const ViewToggle = ({ className }: HTMLAttributes<HTMLDivElement>) => {
    return (
      <div className={cn("flex items-center", className)}>
        <span
          className={cn("w-20 text-center", {
            "cursor-pointer": selectedView !== "latest",
            "text-orange font-bold": selectedView === "latest",
          })}
          onClick={() => setSelectedView("latest")}
        >
          latest
        </span>
        <span className="">{"|"}</span>
        <span
          className={cn("w-20 text-center", {
            "cursor-pointer": selectedView !== "starred",
            "text-orange font-bold": selectedView === "starred",
          })}
          onClick={() => setSelectedView("starred")}
        >
          starred
        </span>
      </div>
    );
  };

  return (
    <>
      <header className="flex items-center w-full px-24 border-t-8 border-orange h-36">
        <Logo className="h-10 w-10" />
        <h1 className="ml-4 text-2xl font-extrabold">Hacker News</h1>
        <ViewToggle className="ml-10" />
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
              {stories.map(
                ({ id, title, url, by, descendants, score, time }) => (
                  <li className="marker:text-gray-500 marker:text-lg text-xl my-8">
                    <div className="inline-block ml-2">
                      <span className="font-bold font-mono">{title}</span>
                      <Link href={url} className="ml-4 text-gray-500 text-xs">
                        {url &&
                          URL.canParse(url) &&
                          `(${new URL(url).hostname})`}
                      </Link>
                    </div>
                    <div className="ml-8 text-gray-500 text-xs flex items-center gap-1 mt-2">
                      <span>{score} points by</span>
                      <Link>{by}</Link>
                      <Link>{formatTime(time)} ago</Link>
                      <span>{"|"}</span>
                      <span>{descendants} comments</span>
                      <span>{"|"}</span>
                      <button
                        className="flex items-center group cursor-pointer"
                        onClick={() => dispatch(toggleStar(id))}
                      >
                        <StarIcon
                          className={cn(
                            "h-4 w-4 fill-transparent stroke-gray-500",
                            {
                              "fill-orange stroke-none": stars.includes(id),
                            }
                          )}
                        />
                        <span className="ml-1 group-hover:underline">
                          {stars.includes(id) ? "saved" : "save"}
                        </span>
                      </button>
                    </div>
                  </li>
                )
              )}
            </ol>
            {selectedView === "starred" && filteredStories.length === 0 && (
              <div>No Stories Starred</div>
            )}
            <button className="py-2 px-4 bg-orange text-white font-semibold">
              show more
            </button>
          </>
        )}
      </main>
      <footer className="w-full border-t-4 border-orange h-36 flex flex-col justify-center items-center">
        <h1 className="font-semibold mb-2">Hacker News</h1>
        <ViewToggle />
      </footer>
    </>
  );
}

export default App;
