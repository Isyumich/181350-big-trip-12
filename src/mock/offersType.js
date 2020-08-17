import {OFFERS_PRICE, MAX_OFFERS_COUNT, OFFERS} from "../const.js";
import {getRandomInteger} from "../util.js";

const generateNameOffers = () => {
  const index = getRandomInteger(0, OFFERS.length - 1);

  return OFFERS[index];
};

const generatePriceOffers = () => {
  const index = getRandomInteger(0, OFFERS_PRICE.length - 1);

  return OFFERS_PRICE[index];
};

export const generateOffers = (type) => {
  const offersList = [];

  for (let i = 0; i < getRandomInteger(0, MAX_OFFERS_COUNT); i++) {
    offersList.push({
      type,
      name: generateNameOffers(),
      price: generatePriceOffers(),
    });
  }
  return (offersList.length > 0) ? offersList : null;
};

