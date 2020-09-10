import {getRandomInteger, getRandomArrayElement} from "../view/utils/common.js";
import {
  OFFERS_PRICE,
  MAX_OFFERS_COUNT,
  OFFERS,
  CITIES,
  DESCRIPTIONS,
  ROUT_POINT,
} from "../const.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
  return {
    id: generateId(),
    isChange: false,
    isFavourite,
    typeRoutPoint: type,
    city: getRandomArrayElement(CITIES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: `http://picsum.photos/248/152?r=${Math.random()}`,
    price: getRandomInteger(1, 1000000),
    startTime: new Date(getRandomInteger(2019, 2020), getRandomInteger(0, 11),
        getRandomInteger(0, 31), getRandomInteger(0, 24), getRandomInteger(0, 59)),
    finishTime: new Date(getRandomInteger(2019, 2020), getRandomInteger(0, 11),
        getRandomInteger(0, 31), getRandomInteger(0, 24), getRandomInteger(0, 59)),
    offers: generateOffers(type),
  };
};

