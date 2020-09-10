import TripDaysListView from "../view/trip-days-list.js";
import TripDaysItemView from "../view/trip-days-item.js";
import SortingView from "../view/sorting.js";
import NoPointsMessageView from "../view/no-points-message.js";
import {SortType} from "../const.js";
import {render, RenderPosition, sortPrice, sortTime} from "../view/utils/trip.js";
import TripDaysItemNoCountView from "../view/trip-days-item-no-count";
import TripPresenter from "./trip.js";
import {updateItem} from "../view/utils/common.js";
import AbstractView from "../view/abstract";

const ELEMENT_COUNT = 15;

export default class TripBoard {
  constructor(tripEventsSection) {
    this._tripEventsSection = tripEventsSection;
    this._currentSortType = SortType.EVENT;
    this._tripPresenter = {};

    this._daysListComponent = new TripDaysListView();
    this._sortingComponent = new SortingView();
    this._noPointsComponent = new NoPointsMessageView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleTripChange = this._handleTripChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(trips) {
    this._trips = trips.slice();
    this._sourcedTrips = trips.slice();

    this._renderSort();
    this._renderTripBoard(this._tripEventsSection, this._trips);
  }

  _handleModeChange() {
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleTripChange(updatedTrip) {
    this._boardTasks = updateItem(this._trips, updatedTrip);
    this._sourcedBoardTasks = updateItem(this._sourcedTrips, updatedTrip);
    this._tripPresenter[updatedTrip.id].init(updatedTrip);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._trips = this._trips.sort(sortTime);
        break;
      case SortType.PRICE:
        this._trips = this._trips.sort(sortPrice);
        break;
      default:
        this._trips = this._sourcedTrips.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearListEvents();
    this._renderTripBoard(this._tripEventsSection, this._trips, sortType);
  }

  _renderSort() {
    const tripEventsHeader = this._tripEventsSection.querySelector(`h2`);
    render(tripEventsHeader, this._sortingComponent, RenderPosition.AFTEREND);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearListEvents() {
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPresenter = {};
  }

  _renderTrip(tripListElement, trip) {
    const tripPresenter = new TripPresenter(tripListElement, this._handleTripChange, this._handleModeChange);
    tripPresenter.init(trip);

    this._tripPresenter[trip.id] = tripPresenter;
  }

  _renderTripBoard(tripEventsSection, trips, sortType) {
    if (trips.length === 0) {
      render(tripEventsSection, this._noPointsComponent, RenderPosition.BEFOREEND);
    } else {
      const tripDaysList = this._daysListComponent;
      render(tripEventsSection, tripDaysList, RenderPosition.BEFOREEND);
      if (sortType === SortType.TIME || sortType === SortType.PRICE) {
        const tripDayItemNoCount = new TripDaysItemNoCountView();
        console.log(tripDayItemNoCount.getTemplate());
        render(tripDaysList, tripDayItemNoCount, RenderPosition.BEFOREEND);
        for (let j = 0; j < ELEMENT_COUNT; j++) {
          this._renderTrip(tripDayItemNoCount.getElement().querySelector(`.trip-events__list`), trips[j]);
        }
      } else {
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
}
