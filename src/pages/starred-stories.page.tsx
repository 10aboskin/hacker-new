import {
  SortType,
  selectSortedStarredStories,
  setSortType,
  sortingFns,
} from "../features/stories/stories.slice";

import StoryList from "../features/stories/story-list.component";
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";

export const StarredStoriesPage = () => {
  const dispatch = useDispatch();
  const sortedStories = useAppSelector(selectSortedStarredStories);

  return (
    <>
      <label htmlFor="sort" className="text-sm block">
        Sort
      </label>
      <select
        name="sort"
        className="dark:bg-gray-700 p-2"
        onChange={({ target: { value } }) => {
          if (value in sortingFns) {
            dispatch(setSortType(value as SortType));
          }
        }}
      >
        <option value="new">Newest</option>
        <option value="old">Oldest</option>
        <option value="most">Most Points</option>
        <option value="least">Least Points</option>
      </select>
      {sortedStories.length ? (
        <StoryList storyList={sortedStories} numbered={false} />
      ) : (
        <div className="flex items-center justify-center">
          <div className="text-2xl font-extrabold text-neutral-500">
            No Starred Posts
          </div>
        </div>
      )}
    </>
  );
};

export default StarredStoriesPage;
