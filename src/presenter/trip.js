import NewEventItemView from "../view/new-event-item";
import TripEventsItemView from "../view/trip-events-item";
import {render, RenderPosition, replace, remove} from "../view/utils/trip";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Trip {
  constructor(tripListElement, changeData, changeMode) {
    this._tripListElement = tripListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._item = null;
    this._editItem = null;
    this._mode = Mode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(trip) {
    this._trip = trip;

    const prevEditItem = this._editItem;
    const prevItem = this._item;

    this._editItem = new NewEventItemView(trip);
    this._item = new TripEventsItemView(trip);

    this._item.setClickHandler(this._handleClick);
    this._editItem.setFormSubmitHandler(this._handleFormSubmit);
    this._editItem.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevItem === null || prevEditItem === null) {
      render(this._tripListElement, this._item, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._item, prevItem);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._editItem, prevEditItem);
    }

    remove(prevItem);
    remove(prevEditItem);
  }

  destroy() {
    remove(this._item);
    remove(this._editItem);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToTrip();
    }
  }

  _replaceTripToForm() {
    replace(this._editItem, this._item);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToTrip() {
    replace(this._item, this._editItem);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._editItem.reset(this._item);
      this._replaceFormToTrip();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _handleClick() {
    this._replaceTripToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleFormSubmit(trip) {
    this._replaceFormToTrip();
    this._changeData(trip);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._trip,
            {
              isFavorite: !this._trip.isFavorite
            }
        )
    );
  }
}


