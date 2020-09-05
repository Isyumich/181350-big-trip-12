import AbstractView from "./abstract.js";

export const createTripDaysItemTemplate = () => {
  return (`<li class="trip-days__item  day">
      <div class="day__info"></div>
      <ul class="trip-events__list">
      </ul>
    </li>`);
};


export default class TripDaysItemNoCount extends AbstractView {
  getTemplate() {
    return createTripDaysItemTemplate();
  }
}
