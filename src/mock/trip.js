import {getRandomInteger, getRandomArrayElement} from "../view/utils/common.js";
import {
  OFFERS_PRICE,
  MAX_OFFERS_COUNT,
  OFFERS,
  CITIES,
  DESCRIPTIONS,
  ROUT_POINT,
  MAX_DAY_DURATION,
  MAX_MINUTES_DURATION,
  MAX_DAY_DIFF,
  MAX_HOURS_DURATION,
} from "../const.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getTimeDiff = (maxMinutesDuration, maxDaysDuration, maxHoursDuration, maxDaysDiff) => {
  let currentDate = new Date();
  currentDate = new Date(currentDate.setDate(currentDate.getDate() + getRandomInteger(0, maxDaysDiff)));

  const time = [];
  let startTime = new Date(currentDate.setDate(currentDate.getDate() + getRandomInteger(0, maxDaysDuration)));
  startTime = new Date(startTime.setHours(startTime.getHours() + getRandomInteger(0, maxHoursDuration)));
  startTime = new Date(startTime.setMinutes(startTime.getMinutes() + getRandomInteger(0, maxMinutesDuration)));
  let finishTime = new Date(startTime.setDate(startTime.getDate() + getRandomInteger(0, maxDaysDuration)));
  finishTime = new Date(finishTime.setHours(finishTime.getHours() + getRandomInteger(0, maxHoursDuration)));
  finishTime = new Date(finishTime.setMinutes(finishTime.getMinutes() + getRandomInteger(0, maxMinutesDuration)));

  time.push(startTime);
  time.push(finishTime);

  return time;
};

const generateOffers = (type) => {
  const offersList = [];

  for (let i = 0; i < getRandomInteger(0, MAX_OFFERS_COUNT); i++) {
    offersList.push({
      type,
      name: getRandomArrayElement(OFFERS),
      price: getRandomArrayElement(OFFERS_PRICE),
    });
  }
  return (offersList.length > 0) ? offersList : null;
};

const isFavourite = Boolean(getRandomInteger(0, 1));

export const generateTrip = () => {
  const type = getRandomArrayElement(ROUT_POINT);
  const time = getTimeDiff(MAX_MINUTES_DURATION, MAX_DAY_DURATION, MAX_HOURS_DURATION, MAX_DAY_DIFF);
  return {
    id: generateId(),
    isChange: false,
    isFavourite,
    typeRoutPoint: type,
    city: getRandomArrayElement(CITIES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: `http://picsum.photos/248/152?r=${Math.random()}`,
    price: getRandomInteger(1, 1000000),
    dateFrom: time[0],
    dateTo: time[1],
    offers: generateOffers(type),
  };
};

