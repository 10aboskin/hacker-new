import { useAppDispatch, useAppSelector } from "../../store";

import StarIcon from "../../assets/star.svg?react";
import StoryDetailLink from "../ui/link.component";
import cn from "../../lib/cn";
import formatTime from "../../lib/format-time";
import { toggleStar } from "./stories.slice";
import { useMemo } from "react";

type Props = {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
};

export const StoryListItem = ({
  id,
  title,
  url,
  score,
  by,
  time,
  descendants,
}: Props) => {
  const dispatch = useAppDispatch();
  const { stars } = useAppSelector((state) => state.stories);
  const isStarred = useMemo(() => stars.includes(id), [id, stars]);

  return (
    <li className="marker:text-gray-500 marker:text-lg text-xl my-8">
      <div className="inline-block ml-2">
        <span className="font-bold font-mono">{title}</span>
        <StoryDetailLink href={url} className="ml-4 text-gray-500 text-xs">
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
            className={cn("h-4 w-4 fill-transparent stroke-gray-500", {
              "fill-orange stroke-none": isStarred,
            })}
          />
          <span className="ml-1 group-hover:underline">
            {isStarred ? "saved" : "save"}
          </span>
        </button>
      </div>
    </li>
  );
};

export default StoryListItem;
