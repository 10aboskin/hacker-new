import Spinner from "../features/ui/spinner.component";
import { useAppSelector } from "../store";

export const TopStoriesPage = () => {
  const filteredStories = useAppSelector(({ stories: { storyList, stars } }) =>
    storyList.filter((story) => stars.includes(story.id))
  );

  return (
    <main className="px-24 mb-16">
      {status === "loading" && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {status === "succeeded" && <></>}
    </main>
  );
};

export default TopStoriesPage;
