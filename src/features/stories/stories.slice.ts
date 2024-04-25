import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem, getTopStories } from "./stories.service";

type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
};

export type StoriesState = {
  stories: Story[];
  status: string;
  error: string | undefined;
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
    stories: [],
    status: "idle",
    error: undefined,
  } as StoriesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array
        state.stories = action.payload;
      })
      .addCase(getStories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default storiesSlice.reducer;
