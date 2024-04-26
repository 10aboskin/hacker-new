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

  return (
    <main className="px-24 mb-16">
      {status === "loading" && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {status === "succeeded" && (
        <>
          <StoryList storyList={storyList} />
          <button className="py-2 px-4 bg-orange text-white font-semibold">
            show more
          </button>
        </>
      )}
    </main>
  );
};

export default TopStoriesPage;
