import StoryListItem from "../features/stories/story-list-item.component";
import { selectStarredStories } from "../features/stories/stories.slice";
import { useAppSelector } from "../store";

export const TopStoriesPage = () => {
  const starredStories = useAppSelector(selectStarredStories);

  return (
    <main className="px-24 mb-16">
      <ul>
        {starredStories.map(
          ({ id, title, url, by, descendants, score, time }) => (
            <StoryListItem
              key={id}
              {...{ id, title, url, score, by, time, descendants }}
            />
          )
        )}
      </ul>
    </main>
  );
};

export default TopStoriesPage;
