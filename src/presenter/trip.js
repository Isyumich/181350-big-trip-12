import NewEventItemView from "../view/new-event-item.js";
import TripEventsItemView from "../view/trip-events-item.js";
import {render, RenderPosition, replace, remove} from "../view/utils/trip.js";
import {UserAction, UpdateType} from "../const.js";
import {isTimeChange} from "../view/utils/trip.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Trip {
  constructor(tripListElement, changeData, changeMode) {
    this._tripListElement = tripListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._itemComponent = null;
    this._editItemComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(trip) {
    this._trip = trip;

    const prevEditItem = this._editItemComponent;
    const prevItem = this._itemComponent;

    this._editItemComponent = new NewEventItemView(trip);
    this._itemComponent = new TripEventsItemView(trip);

    this._itemComponent.setClickHandler(this._handleClick);
    this._editItemComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._editItemComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._editItemComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevItem === null || prevEditItem === null) {
      render(this._tripListElement, this._itemComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._itemComponent, prevItem);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._editItemComponent, prevEditItem);
    }

    remove(prevItem);
    remove(prevEditItem);
  }

  destroy() {
    remove(this._itemComponent);
    remove(this._editItemComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToTrip();
    }
  }

  _replaceTripToForm() {
    replace(this._editItemComponent, this._itemComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToTrip() {
    replace(this._itemComponent, this._editItemComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._editItemComponent.reset(this._itemComponent);
      this._replaceFormToTrip();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _handleClick() {
    this._replaceTripToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleFormSubmit(update) {
    const isMinorUpdate = isTimeChange(this._trip.dateFrom, update.dateFrom);
    this._changeData(
        UserAction.UPDATE_TRIP,
        isMinorUpdate ? UpdateType.PATCH : UpdateType.MINOR,
        update
    );
    this._replaceFormToTrip();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleDeleteClick(trip) {
    this._changeData(
        UserAction.DELETE_TRIP,
        UpdateType.MINOR,
        trip
    );
  }
}


