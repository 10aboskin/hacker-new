import { Story } from "./stories.types";
import StoryListItem from "./story-list-item.component";
import cn from "../../lib/cn";

type Props = {
  storyList: (Story | null)[];
  numbered?: boolean;
};

export const StoryList = ({ storyList, numbered = true }: Props) => (
  <ul className={cn({ "list-decimal list-inside": numbered })}>
    {storyList.map((story) =>
      story !== null ? (
        <StoryListItem key={story.id} story={story} />
      ) : (
        <li className="marker:text-gray-500 marker:text-lg my-8">
          <span className="text-gray-500 font-extrabold ml-2">
            Post Removed
          </span>
        </li>
      )
    )}
  </ul>
);

export default StoryList;
