import NewEventItemView from "../view/new-event-item.js";
import {generateId} from "../mock/trip.js";
import {render, remove, RenderPosition} from "../view/utils/trip.js";
import {UserAction, UpdateType} from "../const.js";

export default class EventNew {
  constructor(tripListContainer, changeData) {
    this._tripListContainer = tripListContainer;
    this._changeData = changeData;

    this._tripEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._tripEditComponent !== null) {
      return;
    }

    this._tripEditComponent = new NewEventItemView();
    this._tripEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._tripListContainer, this._tripEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripEditComponent === null) {
      return;
    }

    remove(this._tripEditComponent);
    this._tripEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(trip) {
    this._changeData(
        UserAction.ADD_TRIP,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, trip)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
