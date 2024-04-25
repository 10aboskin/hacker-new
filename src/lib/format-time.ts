import { formatDuration, intervalToDuration } from "date-fns";

export const formatTime = (time: number) => {
  const start = new Date(time * 1000); // mult by 1000 to convert seconds to ms
  const end = new Date();
  const formattedDuration = formatDuration(intervalToDuration({ start, end }), {
    delimiter: ",", // give it a delimiter to split on
  });
  return formattedDuration.split(",")[0]; // split to get the highest magnitude value
};

export default formatTime;
