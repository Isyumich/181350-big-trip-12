import {createRoutTemplate} from "./view/rout.js";
import {createControlsTemplate} from "./view/control.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createTripDaysListTemplate} from "./view/trip-days-list.js";
import {createTripDaysItemTemplate} from "./view/trip-days-item.js";
import {createTripEventsListTemplate} from "./view/trip-events-list.js";
import {createTripEventsItemTemplate} from "./view/trip-events-item.js";
import {createNewEventItemTemplate} from "./view/new-event-item.js";
import {render} from "./view/util";
import {generateTrip} from "./mock/trip.js";

const trips = [];

for (let i = 0; i <= 15; i++) {
  trips.push(generateTrip());
}

const ELEMENT_COUNT = 3;

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
for (let i = 0; i < ELEMENT_COUNT; i++) {
  render(tripDaysList, createTripDaysItemTemplate(), `beforeend`);
}

const tripDaysItems = tripDaysList.querySelectorAll(`.trip-days__item`);
for (let item of tripDaysItems) {
  render(item, createTripEventsListTemplate(), `beforeend`);
}

const tripEventsLists = tripDaysList.querySelectorAll(`.trip-events__list`);
for (let list of tripEventsLists) {
  for (let j = 0; j < ELEMENT_COUNT; j++) {
    render(list, createTripEventsItemTemplate(trips[0]), `beforeend`);
  }
}

render(tripDaysList, createNewEventItemTemplate(), `afterbegin`);
