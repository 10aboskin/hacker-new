import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { getItem, getTopStories } from "./stories.service";

import { RootState } from "../../store";
import { Story } from "./stories.types";

export type StoriesState = {
  storyList: Story[];
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

export const getStories = createAsyncThunk("stories/getAll", async () => {
  const topStories = await getTopStories();
  // @ts-ignore tsc doesn't know about 'fromAsync' yet it seems
  const storyData = await Array.fromAsync(
    topStories.slice(0, 12).map(getItem) // fetching the first 12 to display
  );
  return storyData;
});

export const selectStarredStories = createSelector(
  ({ stories: { storyList, stars } }: RootState) => ({ storyList, stars }),
  ({ storyList, stars }) =>
    storyList.filter((story) => stars.includes(story.id))
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
