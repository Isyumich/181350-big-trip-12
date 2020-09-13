import {convertTimeFormat} from "./utils/common.js";
import {YEAR_MONTHS} from "../const.js";
import AbstractView from "./abstract.js";

const getMonth = (time, months) => {
  return months[time.getMonth()];
};

const getDateFormat = (time) => {
  return time.getFullYear() + `-` + convertTimeFormat(time.getMonth()) + `-` + convertTimeFormat(time.getDate());
};

export const createTripDaysItemTemplate = (number, trip) => {
  const {dateFrom} = trip;
  const startDateTime = getDateFormat(dateFrom);

  return (`<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${number + 1}</span>
        <time class="day__date" datetime="${startDateTime}">${getMonth(dateFrom, YEAR_MONTHS)} ${dateFrom.getDate()}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`);
};


export default class TripDaysItem extends AbstractView {
  constructor(number, trip, daysContainers) {
    super();
    this._number = number;
    this._trip = trip;
    this._daysContainers = daysContainers;
  }

  getTemplate() {
    return createTripDaysItemTemplate(this._number, this._trip, this._daysContainers);
  }
}
