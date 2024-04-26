import * as StoriesService from "./stories.api";

import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { Story } from "./stories.types";

export type StoriesState = {
  storyList: (Story | null)[];
  status: string;
  error: string | undefined;
  stars: number[];
};

const initialState = {
  storyList: [],
  status: "idle",
  error: undefined,
  stars: [],
} as StoriesState;

export const selectStoryList = (state: RootState) => state.stories.storyList;
export const selectStars = (state: RootState) => state.stories.stars;
export const selectStatus = (state: RootState) => state.stories.status;
export const selectIsStarred = (state: RootState, storyId: number) =>
  state.stories.stars.includes(storyId);

export const selectStarredStories = createSelector(
  [selectStoryList, selectStars],
  (storyList, stars) =>
    storyList.filter(
      (story): story is Story => story !== null && stars.includes(story.id)
    )
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

export const { toggleStar } = storiesSlice.actions;

export default storiesSlice.reducer;
