import { Story } from "./stories.types";
import axios from "axios";

const getUrl = (baseUrl: string) =>
  `https://hacker-news.firebaseio.com/v0${baseUrl}.json`;

export const getTopStories = async () => {
  const { data } = await axios.get<Array<number>>(getUrl("/topstories"));

  return data;
};

export const getItem = async (itemId: number) => {
  const { data } = await axios.get<Story>(getUrl(`/item/${itemId}`));

  return data;
};
