import {convertTimeFormat, getRandomArrayElement} from "./utils/common.js";
import SmartView from "./smart.js";
import {DESCRIPTIONS, OFFERS} from "../const.js";

import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const convertYear = (year) => {
  return String(year).slice(2, 4);
};

const getCity = (city) => city === null ? `` : city;

const getTypePoint = (point) => point === null ? `` : point;

const getFormatTime = (time) => {
  return convertTimeFormat(time.getDate()) + `/` + convertTimeFormat(time.getMonth()) + `/` + convertYear(time.getFullYear())
  + ` ` + convertTimeFormat(time.getHours()) + `:` + convertTimeFormat(time.getMinutes());
};

const getTime = (time) => time === null ? `` : getFormatTime(time);

const getPrice = (price) => price === null ? `` : price;

export const createNewEventItemTemplate = (trip) => {
  const {typeRoutPoint, city, price, dateFrom, dateTo} = trip;
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${typeRoutPoint}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" checked>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${getTypePoint(typeRoutPoint)} to ${getCity(city)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="Saint Petersburg"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getTime(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getTime(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${getPrice(price)}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>
      </header>
    </form>`
  );
};

export default class NewEventItem extends SmartView {
  constructor(trip) {
    super();
    this._data = NewEventItem.parseTripToData(trip);
    this._datepickerStart = null;
    this._datepickerEnd = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  reset() {
    this.updateData(NewEventItem);
  }

  getTemplate() {
    return createNewEventItemTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setFormSubmitHandler(this._callback.formSumbit);
  }

  _setDatepickers() {
    if (this._datepickerStart || this._datepickerEnd) {
      this._datepickerStart.destroy();
      this._datepickerEnd.destroy();

      this._datepickerStart = null;
      this._datepickerEnd = null;
    }

    this._datepickerStart = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.dateFrom,
          minDate: new Date(),
          onChange: this._dateFromChangeHandler
        }
    );

    this._datepickerEnd = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.dateTo,
          minDate: this._data.dateFrom,
          onChange: this._dateToChangeHandler
        }
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-wrapper`)
      .addEventListener(`change`, this._typeChangeHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._cityChangeHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._priceChangeHandler);
  }

  _typeChangeHandler(evt) {
    if (evt.target.value !== `on`) {
      this.updateData({
        isChange: true,
        typeRoutPoint: evt.target.value,
        offers: OFFERS[evt.target.value],
      });
    }
  }

  _priceChangeHandler(evt) {
    this.updateData({
      isChange: true,
      price: evt.target.value,
    });
  }

  _cityChangeHandler(evt) {
    this.updateData({
      isChange: true,
      city: evt.target.value,
      description: getRandomArrayElement(DESCRIPTIONS),
    });
  }

  _dateFromChangeHandler([time]) {
    this.updateData({
      "isChange": true,
      "dateFrom": time,
    });
  }

  _dateToChangeHandler([time]) {
    this.updateData({
      "isChange": true,
      "dateTo": time,
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSumbit(NewEventItem.parseDataToTrip(this._data));
  }

  _favoriteClickHandler() {
    this.updateData({
      isChange: true,
      isFavorite: !this._data.isFavorite
    });
  }

  setFormSubmitHandler(callback) {
    this._callback.formSumbit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }

  static parseTripToData(trip) {
    return Object.assign(
        {},
        trip
    );
  }

  static parseDataToTrip(data) {
    data = Object.assign({}, data);
    data.isChange = false;
    return data;
  }
}
