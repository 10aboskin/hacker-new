import { Story } from "./stories.types";
import axios from "axios";

const getUrl = (path: string) =>
  `https://hacker-news.firebaseio.com/v0${path}.json`;

export const getTopStories = async () => {
  const { data } = await axios.get<Array<number>>(getUrl("/topstories"));

  return data;
};

export const getStory = async (itemId: number) => {
  const { data } = await axios.get<Story>(getUrl(`/item/${itemId}`));

  return data;
};

export const getStoryList = async (storyIds: number[]) => {
  // @ts-espect-error tsc doesn't know about 'fromAsync' yet i think
  return await Array.fromAsync(storyIds.map(getStory));
};

export const getStories = async () => {
  const topStories = await getTopStories();
  return await getStoryList(topStories.slice(0, 12)); // fetching the first 12 to display
};
