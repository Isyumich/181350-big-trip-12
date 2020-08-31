import TripDaysListView from "../view/trip-days-list.js";
import TripDaysItemView from "../view/trip-days-item.js";
import TripEventsItemView from "../view/trip-events-item.js";
import NewEventItemView from "../view/new-event-item.js";
import SortingView from "../view/sorting.js";
import {render, RenderPosition, replace} from "../view/utils/trip.js";

const ELEMENT_COUNT = 15;

export default class Board {
  constructor(eventsHeader) {
    this._eventsHeader = eventsHeader;

    this._daysListComponent = new TripDaysListView();
    this._sortingComponent = new SortingView();
  }

  init(tripEventsSection, trips) {
    this._renderSort();
    this._renderTripBoard(tripEventsSection, trips);
  }

  _renderSort() {
    render(this._eventsHeader, this._sortingComponent, RenderPosition.AFTEREND);
  }

  _renderTrip(tripListElement, trip) {
    const editItem = new NewEventItemView(trip);
    const item = new TripEventsItemView(trip);

    const replaceTripToForm = () => {
      replace(editItem, item);
    };

    const replaceFormToTrip = () => {
      replace(item, editItem);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToTrip();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    item.setClickHandler(() => {
      replaceTripToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    editItem.setEditClickHandler(() => {
      replaceFormToTrip();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(tripListElement, item, RenderPosition.BEFOREEND);
  }

  _renderTripBoard(tripEventsSection, trips) {
    const tripDaysList = this._daysListComponent;

    render(tripEventsSection, tripDaysList, RenderPosition.BEFOREEND);

    for (let i = 0; i < ELEMENT_COUNT; i++) {
      if (i === 0 || trips[i].startTime !== trips[i - 1].startTime) {
        const tripDayItem = new TripDaysItemView(i, trips[i]);
        render(tripDaysList, tripDayItem, RenderPosition.BEFOREEND);
        this._renderTrip(tripDayItem.getElement().querySelector(`.trip-events__list`), trips[i]);
      }
    }
  }
}


