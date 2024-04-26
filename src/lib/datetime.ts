import { formatDuration, intervalToDuration } from "date-fns";

export const getDateFromTimestamp = (timestamp: number) =>
  new Date(timestamp * 1000); // mult by 1000 to convert seconds to ms

export const formatTime = (timestamp: number) => {
  const start = getDateFromTimestamp(timestamp);
  const end = new Date();
  const formattedDuration = formatDuration(intervalToDuration({ start, end }), {
    delimiter: ",", // give it a delimiter to split on
  });
  return formattedDuration.split(",")[0]; // split to get the highest magnitude value
};

export default formatTime;
