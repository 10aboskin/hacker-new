import { getStories, toggleStar } from "../features/stories/stories.slice";
import { useAppDispatch, useAppSelector } from "../store";
import { useCallback, useEffect } from "react";

import Spinner from "../features/ui/spinner.component";
import StarIcon from "../assets/star.svg?react";
import StoryDetailLink from "../features/ui/link.component";
import cn from "../lib/cn";
import formatTime from "../lib/format-time";

export const TopStoriesPage = () => {
  const dispatch = useAppDispatch();

  const {
    storyList: stories,
    status,
    stars,
  } = useAppSelector((state) => state.stories);

  const initFetch = useCallback(() => {
    dispatch(getStories());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <main className="px-24 mb-16">
      {status === "loading" && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {status === "succeeded" && (
        <>
          <ol className="list-decimal list-inside">
            {stories.map(({ id, title, url, by, descendants, score, time }) => (
              <li className="marker:text-gray-500 marker:text-lg text-xl my-8">
                <div className="inline-block ml-2">
                  <span className="font-bold font-mono">{title}</span>
                  <StoryDetailLink
                    href={url}
                    className="ml-4 text-gray-500 text-xs"
                  >
                    {url && URL.canParse(url) && `(${new URL(url).hostname})`}
                  </StoryDetailLink>
                </div>
                <div className="ml-8 text-gray-500 text-xs flex items-center gap-1 mt-2">
                  <span>{score} points by</span>
                  <StoryDetailLink>{by}</StoryDetailLink>
                  <StoryDetailLink>{formatTime(time)} ago</StoryDetailLink>
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
            ))}
          </ol>
          <button className="py-2 px-4 bg-orange text-white font-semibold">
            show more
          </button>
        </>
      )}
    </main>
  );
};

export default TopStoriesPage;
