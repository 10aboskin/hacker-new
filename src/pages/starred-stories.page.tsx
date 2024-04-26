import { compareAsc, compareDesc } from "date-fns";
import { useMemo, useState } from "react";

import { Story } from "../features/stories/stories.types";
import StoryListItem from "../features/stories/story-list-item.component";
import { getDateFromTimestamp } from "../lib/datetime";
import { selectStarredStories } from "../features/stories/stories.slice";
import { useAppSelector } from "../store";

const sortingFns = {
  new: (a: Story, b: Story) =>
    compareDesc(getDateFromTimestamp(a.time), getDateFromTimestamp(b.time)),
  old: (a: Story, b: Story) =>
    compareAsc(getDateFromTimestamp(a.time), getDateFromTimestamp(b.time)),
  most: (a: Story, b: Story) => b.score - a.score,
  least: (a: Story, b: Story) => a.score - b.score,
};

type SortingFnName = keyof typeof sortingFns;

export const TopStoriesPage = () => {
  const starredStories = useAppSelector(selectStarredStories);

  const [sort, setSort] = useState<SortingFnName>("new");

  const sortedStories = useMemo(() => {
    const sortedPosts = starredStories.slice();
    sortedPosts.sort(sortingFns[sort]);
    return sortedPosts;
  }, [sort, starredStories]);

  return (
    <main className="px-24 mb-16">
      <label htmlFor="sort" className="text-sm block">
        Sort
      </label>
      <select
        name="sort"
        className="dark:bg-gray-700 p-2"
        onChange={({ target: { value } }) => {
          if (value in sortingFns) {
            setSort(value as SortingFnName);
          }
        }}
      >
        <option value="new">Newest</option>
        <option value="old">Oldest</option>
        <option value="most">Most Points</option>
        <option value="least">Least Points</option>
      </select>
      {sortedStories.length ? (
        <ul>
          {sortedStories.map((story) => (
            <StoryListItem key={story.id} story={story} />
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center">
          <div className="text-2xl font-extrabold text-neutral-500">
            No Starred Posts
          </div>
        </div>
      )}
    </main>
  );
};

export default TopStoriesPage;
