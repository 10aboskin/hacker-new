import axios from "axios";

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
