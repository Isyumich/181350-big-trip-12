import {createElement} from "../utils";

export const createNoPointsMessageTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoPointsMessage {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoPointsMessageTemplate();
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
