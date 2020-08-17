import {getRandomInteger} from "../util.js";
import {getRandomArrayElement} from "../util.js";
import {generateOffers} from "./offersType.js";
import {CITIES} from "../const.js";
import {DESCRIPTIONS} from "../const.js";
import {ROUT_POINT} from "../const.js";

export const generateTrip = () => {
  const type = getRandomArrayElement(ROUT_POINT);
  return {
    typeRoutPoint: type,
    city: getRandomArrayElement(CITIES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: `http://picsum.photos/248/152?r=${Math.random()}`,
    price: getRandomInteger(1, 1000000),
    startTime: new Date(getRandomInteger(2019, 2020), getRandomInteger(0, 11),
        getRandomInteger(0, 31), getRandomInteger(0, 59), getRandomInteger(0, 59)),
    finishTime: new Date(getRandomInteger(2019, 2020), getRandomInteger(0, 11),
        getRandomInteger(0, 31), getRandomInteger(0, 59), getRandomInteger(0, 59)),
    offers: generateOffers(type),
  };
};

