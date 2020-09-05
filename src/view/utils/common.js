
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = function (sourceArray) {
  const index = getRandomInteger(0, sourceArray.length - 1);
  return sourceArray[index];
};

export const getDateAscendingSortedArray = function (array) {
  let sortedArray = array;
  for (let i = 0; i < sortedArray.length - 1; i++) {
    let minElement = sortedArray[i];

    for (let j = i + 1; j < sortedArray.length; j++) {
      if (sortedArray[j].startTime < minElement.startTime) {
        minElement = sortedArray[j];
        const swap = sortedArray[i];
        sortedArray[i] = minElement;
        sortedArray[j] = swap;
      }
    }
  }
  return sortedArray;
};

export const getPriceDescendingSortedArray = function (array) {
  let sortedArray = array;
  for (let i = 0; i < sortedArray.length - 1; i++) {
    let maxElement = sortedArray[i];

    for (let j = i + 1; j < sortedArray.length; j++) {
      if (sortedArray[j].price > maxElement.price) {
        maxElement = sortedArray[j];
        const swap = sortedArray[i];
        sortedArray[i] = maxElement;
        sortedArray[j] = swap;
      }
    }
  }
  return sortedArray;
};

export const getTimeDescendingSortedArray = function (array) {
  let sortedArray = array;
  for (let i = 0; i < sortedArray.length - 1; i++) {
    let maxElement = sortedArray[i];

    for (let j = i + 1; j < sortedArray.length; j++) {
      if (Math.abs(sortedArray[j].finishTime - sortedArray[j].startTime) > Math.abs(maxElement.finishTime - maxElement.startTime)) {
        maxElement = sortedArray[j];
        const swap = sortedArray[i];
        sortedArray[i] = maxElement;
        sortedArray[j] = swap;
      }
    }
  }
  return sortedArray;
};

export const convertTime = (time) => {
  if (time < 10) {
    time = `0` + time;
  }
  return time;
};
