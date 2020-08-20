import {createRoutTemplate} from "./view/rout.js";
import {createControlsTemplate} from "./view/control.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createTripDaysListTemplate} from "./view/trip-days-list.js";
import {createTripDaysItemTemplate} from "./view/trip-days-item.js";
import {createTripEventsItemTemplate} from "./view/trip-events-item.js";
import {createNewEventItemTemplate} from "./view/new-event-item.js";
import {render} from "./view/util";
import {generateTrip} from "./mock/trip.js";
import {convertTime} from "./util";


const getAscSortedArray = function (array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minElement = array[i];

    for (let j = i + 1; j < array.length; j++) {
      if (array[j].startTime < minElement.startTime) {
        minElement = array[j];
        const swap = array[i];
        array[i] = minElement;
        array[j] = swap;
      }
    }
  }
  return array;
};

const ELEMENT_COUNT = 15;

const trips = [];

for (let i = 0; i <= ELEMENT_COUNT; i++) {
  trips.push(generateTrip());
}

const sortedTrips = getAscSortedArray(trips);

const pageHeaderContainer = document.querySelector(`.page-header__container`);
const tripMainContainer = pageHeaderContainer.querySelector(`.trip-main`);
const tripControlElement = pageHeaderContainer.querySelector(`.trip-controls`);
const switchFirstHeader = tripControlElement.querySelector(`h2`);

render(tripMainContainer, createRoutTemplate(), `afterbegin`);
render(switchFirstHeader, createControlsTemplate(), `afterend`);
render(tripControlElement, createFilterTemplate(), `beforeend`);

const pageMainContainer = document.querySelector(`.page-main`);
const tripEventsSection = pageMainContainer.querySelector(`.trip-events`);
const tripEventsHeader = tripEventsSection.querySelector(`h2`);

render(tripEventsHeader, createSortingTemplate(), `afterend`);
render(tripEventsSection, createTripDaysListTemplate(), `beforeend`);

const tripDaysList = tripEventsSection.querySelector(`.trip-days`);

render(tripDaysList, createNewEventItemTemplate(sortedTrips[0]), `afterbegin`);

for (let i = 1; i < ELEMENT_COUNT; i++) {
  const tripDaysContainersTime = tripDaysList.querySelectorAll(`.day__date`);
  render(tripDaysList, createTripDaysItemTemplate(i, sortedTrips[i], tripDaysContainersTime), `beforeend`);
}

const tripDaysContainers = tripDaysList.querySelectorAll(`.trip-days__item`);

for (let j = 1; j < ELEMENT_COUNT; j++) {
  for (let container of tripDaysContainers) {
    const timeContainer = container.querySelector(`.day__date`);
    const tripEventList = container.querySelector(`.trip-events__list`);
    const date = sortedTrips[j].startTime.getFullYear() + `-` + convertTime(sortedTrips[j].startTime.getMonth())
      + `-` + convertTime(sortedTrips[j].startTime.getDate());
    if (timeContainer.dateTime === date) {
      render(tripEventList, createTripEventsItemTemplate(sortedTrips[j]), `beforeend`);
    }
  }
}


