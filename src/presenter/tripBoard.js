import TripDaysListView from "../view/trip-days-list.js";
import TripDaysItemView from "../view/trip-days-item.js";
import SortingView from "../view/sorting.js";
import NoPointsMessageView from "../view/no-points-message.js";
import {SortType, UserAction, UpdateType, FilterType} from "../const.js";
import {render, RenderPosition, sortPrice, sortTime, remove} from "../view/utils/trip.js";
import TripDaysItemNoCountView from "../view/trip-days-item-no-count";
import {filter} from "../view/utils/filter.js";
import TripPresenter from "./trip.js";
import TripNewPresenter from "./new-trip.js";

const ELEMENT_COUNT = 15;

export default class TripBoard {
  constructor(tripEventsSection, tripsModel, filterModel) {
    this._tripsModel = tripsModel;
    this._filterModel = filterModel;
    this._tripEventsSection = tripEventsSection;
    this._currentSortType = SortType.EVENT;
    this._tripPresenter = {};

    this._daysListComponent = new TripDaysListView();
    this._sortingComponent = null;
    this._noPointsComponent = new NoPointsMessageView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelTrip = this._handleModelTrip.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._tripsModel.addObserver(this._handleModelTrip);
    this._filterModel.addObserver(this._handleModelTrip);

    this._tripNewPresenter = new TripNewPresenter(this._tripsModel.getTrips(), this._tripEventsSection, this._handleViewAction);
  }

  init() {
    this._renderSort();
    this._renderTripBoard(this._tripEventsSection, this._getTrips(), SortType.EVENT);
  }

  createEvent() {
    this._currentSortType = SortType.EVENT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._tripNewPresenter.init();
  }

  _getTrips() {
    const filterType = this._filterModel.getFilter();
    const trips = this._tripsModel.getTrips();
    const filteredTrips = filter[filterType](trips);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredTrips.slice().sort(sortTime);
      case SortType.PRICE:
        return filteredTrips.slice().sort(sortPrice);
    }
    return filteredTrips;
  }

  _handleModeChange() {
    this._tripNewPresenter.destroy();
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TRIP:
        this._tripsModel.updateTrip(updateType, update);
        break;
      case UserAction.ADD_TRIP:
        this._tripsModel.addTrip(updateType, update);
        break;
      case UserAction.DELETE_TRIP:
        this._tripsModel.deleteTrip(updateType, update);
        break;
    }
  }

  _handleModelTrip(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._tripPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearListTrips();
        this._renderTripBoard(this._tripEventsSection, this._getTrips(), SortType.EVENT);
        break;
      case UpdateType.MAJOR:
        this._clearListTrips({resetSortType: true});
        this._renderTripBoard(this._tripEventsSection, this._getTrips(), SortType.EVENT);
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearListTrips({resetRenderedTripCount: true});
    remove(this._daysListComponent);
    this._renderTripBoard(this._tripEventsSection, this._getTrips(), sortType);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortingComponent = new SortingView();
    const tripEventsHeader = this._tripEventsSection.querySelector(`h2`);
    render(tripEventsHeader, this._sortingComponent, RenderPosition.AFTEREND);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearListTrips() {
    Object
      .values(this._tripPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPresenter = {};
  }

  _renderTrip(tripListElement, trip) {
    const tripPresenter = new TripPresenter(tripListElement, this._handleViewAction, this._handleModeChange);
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
        render(tripDaysList, tripDayItemNoCount, RenderPosition.BEFOREEND);
        for (let j = 0; j < ELEMENT_COUNT; j++) {
          this._renderTrip(tripDayItemNoCount.getElement().querySelector(`.trip-events__list`), trips[j]);
        }
      } else {
        for (let i = 0; i < ELEMENT_COUNT; i++) {
          if (i === 0 || trips[i].dateFrom !== trips[i - 1].dateFrom) {
            const tripDayItem = new TripDaysItemView(i, trips[i]);
            render(tripDaysList, tripDayItem, RenderPosition.BEFOREEND);
            this._renderTrip(tripDayItem.getElement().querySelector(`.trip-events__list`), trips[i]);
          }
        }
      }
    }
  }
}
