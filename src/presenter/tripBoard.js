import TripDaysListView from "../view/trip-days-list.js";
import TripDaysItemView from "../view/trip-days-item.js";
import TripEventsItemView from "../view/trip-events-item.js";
import NewEventItemView from "../view/new-event-item.js";
import SortingView from "../view/sorting.js";
import NoPointsMessageView from "../view/no-points-message.js";
import {render, RenderPosition, replace} from "../view/utils/trip.js";

const ELEMENT_COUNT = 15;

export default class TripBoard {
  constructor(tripEventsSection) {
    this._tripEventsSection = tripEventsSection;

    this._daysListComponent = new TripDaysListView();
    this._sortingComponent = new SortingView();
    this._noPointsComponent = new NoPointsMessageView();
  }

  init(trips) {
    this._trips = trips.slice();
    this._renderSort();
    this._renderTripBoard(this._tripEventsSection, this._trips);
  }

  _renderSort() {
    const tripEventsHeader = this._tripEventsSection.querySelector(`h2`);
    render(tripEventsHeader, this._sortingComponent, RenderPosition.AFTEREND);
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
    if (trips.length === 0) {
      render(tripEventsSection, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {
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
}


