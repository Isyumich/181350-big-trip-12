import {convertTimeFormat} from "./utils/common.js";
import AbstractView from "./abstract.js";

const getDiffTime = (dateFrom, dateTo) => {
  const MINUTE_IN_DAY = 1440;
  const MINUTE_IN_HOUR = 60;

  const diffMinute = Math.abs((dateTo.getTime() - dateFrom.getTime())) / 1000 / 60;
  const dayCount = Math.floor(diffMinute / MINUTE_IN_DAY);
  const dayCountRemains = diffMinute % MINUTE_IN_DAY;
  const hourCount = Math.floor(dayCountRemains / MINUTE_IN_HOUR);
  const minuteCount = dayCountRemains % MINUTE_IN_HOUR;

  return `${
    dayCount > 1 ? `${convertTimeFormat(dayCount)}D ` : ``
  } ${
    hourCount > 1 ? `${convertTimeFormat(hourCount)}H ` : ``
  } ${
    minuteCount > 1 ? `${convertTimeFormat(minuteCount)}M` : ``
  }`;
};

const getDate = (date) => {
  return date.getFullYear() + `-` + convertTimeFormat(date.getMonth() + 1) + `-` + convertTimeFormat(date.getDate()) +
    `T` + convertTimeFormat(date.getHours()) + `:` + convertTimeFormat(date.getMinutes());
};

const getTime = (date) => {
  return convertTimeFormat(date.getHours()) + `:` + convertTimeFormat(date.getMinutes());
};

export const createTripEventsItemTemplate = (trip) => {
  const {typeRoutPoint, city, price, dateFrom, dateTo, offers} = trip;

  let offersName = offers === null ? `` : offers[0].name;
  let offersPrice = offers === null ? `` : offers[0].price;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${typeRoutPoint}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeRoutPoint} to ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getDate(dateFrom)}">${getTime(dateFrom)}</time>
              &mdash;
            <time class="event__end-time" datetime="${getDate(dateTo)}">${getTime(dateTo)}</time>
          </p>
          <p class="event__duration">${getDiffTime(dateFrom, dateTo)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${offersName}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offersPrice}</span>
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripEventsItem extends AbstractView {
  constructor(trip) {
    super();

    this._trip = trip;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createTripEventsItemTemplate(this._trip);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(this._trip);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
