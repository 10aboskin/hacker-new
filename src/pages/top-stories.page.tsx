import Spinner from "../features/ui/spinner.component";
import StoryListItem from "../features/stories/story-list-item.component";
import { useAppSelector } from "../store";

export const TopStoriesPage = () => {
  const { storyList, status } = useAppSelector((state) => state.stories);

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
            {storyList.map(
              ({ id, title, url, by, descendants, score, time }) => (
                <StoryListItem
                  key={id}
                  {...{ id, title, url, score, by, time, descendants }}
                />
              )
            )}
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
