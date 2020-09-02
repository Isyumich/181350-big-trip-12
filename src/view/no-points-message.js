import AbstractView from "./abstract.js";

export const createNoPointsMessageTemplate = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoPointsMessage extends AbstractView {
  getTemplate() {
    return createNoPointsMessageTemplate();
  }
}
