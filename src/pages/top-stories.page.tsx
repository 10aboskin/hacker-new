import {
  selectStatus,
  selectStoryList,
} from "../features/stories/stories.slice";

import Spinner from "../features/ui/spinner.component";
import StoryList from "../features/stories/story-list.component";
import { useAppSelector } from "../store";

export const TopStoriesPage = () => {
  const status = useAppSelector(selectStatus);
  const storyList = useAppSelector(selectStoryList);

  if (status === "loading") return <Spinner />;

  if (status === "succeeded")
    return (
      <>
        <StoryList storyList={storyList} />
        <button className="py-2 px-4 bg-orange text-white font-semibold">
          show more
        </button>
      </>
    );
};

export default TopStoriesPage;
