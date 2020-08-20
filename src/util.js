export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = function (sourceArray) {
  const index = getRandomInteger(0, sourceArray.length - 1);
  return sourceArray[index];
};

export const convertTime = (time) => {
  if (time < 10) {
    time = `0` + time;
  }
  return time;
};

