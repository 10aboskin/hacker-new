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
