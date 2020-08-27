import RoutView from "./view/rout.js";
import ControlView from "./view/control.js";
import FilterView from "./view/filter.js";
import SortingView from "./view/sorting.js";
import TripDaysListView from "./view/trip-days-list.js";
import TripDaysItemView from "./view/trip-days-item.js";
import TripEventsItemView from "./view/trip-events-item.js";
import NewEventItemView from "./view/new-event-item.js";
import {generateTrip} from "./mock/trip.js";
import {getAscendingSortedArray, render, convertTime, RenderPosition} from "./util.js";


const ELEMENT_COUNT = 15;

const trips = [];

for (let i = 0; i <= ELEMENT_COUNT; i++) {
  trips.push(generateTrip());
}

const sortedTrips = getAscendingSortedArray(trips);

const renderTrip = (tripListElement, trip) => {
  const editItem = new NewEventItemView(trip);
  const item = new TripEventsItemView(trip);

  const replaceTripToForm = () => {
    tripListElement.replaceChild(editItem.getElement(), item.getElement());
  };

  const replaceFormToTrip = () => {
    tripListElement.replaceChild(item.getElement(), editItem.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToTrip();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  item.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceTripToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  editItem.getElement().addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToTrip();
  });

  render(tripListElement, item.getElement(), RenderPosition.BEFOREEND);
};

const pageHeaderContainer = document.querySelector(`.page-header__container`);
const tripMainContainer = pageHeaderContainer.querySelector(`.trip-main`);
const tripControlElement = pageHeaderContainer.querySelector(`.trip-controls`);
const switchFirstHeader = tripControlElement.querySelector(`h2`);

render(tripMainContainer, new RoutView().getElement(), RenderPosition.AFTERBEGIN);
render(switchFirstHeader, new ControlView().getElement(), RenderPosition.AFTEREND);
render(tripControlElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

const pageMainContainer = document.querySelector(`.page-main`);
const tripEventsSection = pageMainContainer.querySelector(`.trip-events`);
const tripEventsHeader = tripEventsSection.querySelector(`h2`);

const tripDaysListNew = new TripDaysListView();

render(tripEventsHeader, new SortingView().getElement(), RenderPosition.AFTEREND);
render(tripEventsSection, tripDaysListNew.getElement(), RenderPosition.BEFOREEND);

// renderElement(tripDaysList, new NewEventItemView(sortedTrips[0]).getElement(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < ELEMENT_COUNT; i++) {
  const tripDaysContainersTime = tripEventsSection.querySelectorAll(`.day__date`);
  render(tripDaysListNew.getElement(), new TripDaysItemView(i, sortedTrips[i], tripDaysContainersTime).getElement(), RenderPosition.BEFOREEND);
}

const tripDaysContainers = tripEventsSection.querySelectorAll(`.trip-days__item`);

for (let j = 0; j < ELEMENT_COUNT; j++) {
  for (let container of tripDaysContainers) {
    const timeContainer = container.querySelector(`.day__date`);
    const tripEventList = container.querySelector(`.trip-events__list`);
    const date = sortedTrips[j].startTime.getFullYear() + `-` + convertTime(sortedTrips[j].startTime.getMonth())
      + `-` + convertTime(sortedTrips[j].startTime.getDate());
    if (timeContainer.dateTime === date) {
      renderTrip(tripEventList, sortedTrips[j]);
      // render(tripEventList, new TripEventsItemView(sortedTrips[j]).getElement(), RenderPosition.BEFOREEND);
    }
  }
}

