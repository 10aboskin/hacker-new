import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem, getTopStories } from "./stories.service";

import { Story } from "./stories.types";

export type StoriesState = {
  storyList: Story[];
  status: string;
  error: string | undefined;
  stars: number[];
};

export const getStories = createAsyncThunk("stories/getAll", async () => {
  const topStories = await getTopStories();
  const storyData = await Array.fromAsync(
    topStories.slice(0, 12).map(getItem) // fetching the first 12 to display
  );
  return storyData;
});

export const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    storyList: [],
    status: "idle",
    error: undefined,
    stars: [],
  } as StoriesState,
  reducers: (builder) => ({
    toggleStar: builder.reducer((state, action: PayloadAction<number>) => {
      state.stars = state.stars.includes(action.payload)
        ? state.stars.filter((storyId) => storyId !== action.payload)
        : (state.stars = [...state.stars, action.payload]);
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
