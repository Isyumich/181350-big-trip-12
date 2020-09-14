import {FilterType} from "../../const.js";

export const filter = {
  [FilterType.EVERYTHING]: (trips) => trips,
  [FilterType.FUTURE]: (trips) => trips.filter((trip) => trip.dateFrom > new Date()),
  [FilterType.PAST]: (trips) => trips.filter((trip) => trip.dateFrom < new Date()),
};
