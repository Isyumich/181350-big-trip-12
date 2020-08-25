import {convertTime, createElement} from "../util.js";
import {YEAR_MONTHS} from "../const.js";

const getMonth = (time, months) => {
  return months[time.getMonth()];
};

const getDateFormat = (time) => {
  return time.getFullYear() + `-` + convertTime(time.getMonth()) + `-` + convertTime(time.getDate());
};

export const createTripDaysItemTemplate = (number, trip, daysContainers) => {
  const {startTime} = trip;
  const startDateTime = getDateFormat(startTime);
  let daysItemTemplate = ``;

  if (daysContainers !== null) {
    const date = startTime.getFullYear() + `-` + convertTime(startTime.getMonth()) + `-` + convertTime(startTime.getDate());
    let counter = 0;
    for (let element of daysContainers) {
      if (element.dateTime === date) {
        counter++;
      }
    }
    if (counter === 0) {
      daysItemTemplate = `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${number + 1}</span>
        <time class="day__date" datetime="${startDateTime}">${getMonth(startTime, YEAR_MONTHS)} ${startTime.getDate()}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`;
    }
  }
  return (daysItemTemplate);
};

export default class TripDaysItem {
  constructor(number, trip, daysContainers) {
    this._number = number;
    this._trip = trip;
    this._daysContainers = daysContainers;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysItemTemplate(this._number, this._trip, this._daysContainers);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
