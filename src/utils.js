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

export const getAscendingSortedArray = function (array) {
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

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

