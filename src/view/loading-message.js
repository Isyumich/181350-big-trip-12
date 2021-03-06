import AbstractView from "./abstract.js";

export const createLoadingMessageTemplate = () => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
    </p>`
  );
};

export default class LoadingMessage extends AbstractView {
  getTemplate() {
    return createLoadingMessageTemplate();
  }
}
