import * as StoriesService from "./stories.api";

import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { compareAsc, compareDesc } from "date-fns";

import { RootState } from "../../store";
import { Story } from "./stories.types";
import { getDateFromTimestamp } from "../../lib/datetime";

export const sortingFns = {
  new: (a: Story, b: Story) =>
    compareDesc(getDateFromTimestamp(a.time), getDateFromTimestamp(b.time)),
  old: (a: Story, b: Story) =>
    compareAsc(getDateFromTimestamp(a.time), getDateFromTimestamp(b.time)),
  most: (a: Story, b: Story) => b.score - a.score,
  least: (a: Story, b: Story) => a.score - b.score,
};

export type SortType = keyof typeof sortingFns;

export type StoriesState = {
  storyList: (Story | null)[];
  status: string;
  error: string | undefined;
  stars: number[];
  sortType: SortType;
};

const initialState = {
  storyList: [],
  status: "idle",
  error: undefined,
  stars: [],
  sortType: "new",
} as StoriesState;

export const selectStoryList = (state: RootState) => state.stories.storyList;
export const selectStars = (state: RootState) => state.stories.stars;
export const selectStatus = (state: RootState) => state.stories.status;
export const selectSortType = (state: RootState) => state.stories.sortType;
export const selectIsStarred = (state: RootState, storyId: number) =>
  state.stories.stars.includes(storyId);

export const selectStarredStories = createSelector(
  [selectStoryList, selectStars],
  (storyList, stars) =>
    storyList.filter(
      (story): story is Story => story !== null && stars.includes(story.id)
    )
);

export const selectSortedStarredStories = createSelector(
  [selectStarredStories, selectSortType],
  (starredStories, sortType) => {
    const sortedStories = starredStories.slice();
    sortedStories.sort(sortingFns[sortType]);
    return sortedStories;
  }
);

export const getStories = createAsyncThunk(
  "stories/getStories",
  StoriesService.getStories
);

export const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: (builder) => ({
    toggleStar: builder.reducer((state, action: PayloadAction<number>) => {
      state.stars = state.stars.includes(action.payload)
        ? state.stars.filter((storyId) => storyId !== action.payload)
        : [...state.stars, action.payload];
    }),
    setSortType: builder.reducer((state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(getStories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.storyList = action.payload;
      })
      .addCase(getStories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleStar, setSortType } = storiesSlice.actions;

export default storiesSlice.reducer;
