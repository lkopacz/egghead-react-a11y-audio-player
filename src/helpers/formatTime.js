export const formatTime = (time) => {
  // Hours, minutes and seconds
  const hrs = Math.floor(~~(time / 3600)); // eslint-disable-line
  const mins = Math.floor(~~((time % 3600) / 60)); // eslint-disable-line
  const secs = Math.floor(time % 60);

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += `${hrs}:${mins < 10 ? "0" : ""}`;
  }

  ret += `${mins}:${secs < 10 ? "0" : ""}`;
  ret += `${secs}`;
  return ret;
};

export const formatHumanReadTime = (time) => {
  const formattedTime = formatTime(time);
  const timeArray = formattedTime.split(":").map((time) => parseFloat(time));

  let string = "";
  let minutes;
  let seconds;

  if (timeArray.length > 2) {
    string += `${timeArray[0]} ${timeArray[0] === 1 ? `hour` : `hours`}, `;
    minutes = timeArray[1];
    seconds = timeArray[2];
  } else {
    minutes = timeArray[0];
    seconds = timeArray[1];
  }

  string += `${minutes} ${minutes === 1 ? `minute` : `minutes`}, `;
  string += `${seconds} ${seconds === 1 ? `second` : `seconds`}`;

  return string;
};
