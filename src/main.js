import RouteView from "./view/route.js";
import MenuView from "./view/menu.js";
import FilterView from "./view/filter.js";
import {generateTrip} from "./mock/trip.js";
import {getDateAscendingSortedArray} from "./view/utils/common.js";
import {render, RenderPosition} from "./view/utils/trip.js";
import BoardPresenter from "./presenter/tripBoard";

const ELEMENT_COUNT = 15;

const trips = [];

for (let i = 0; i <= ELEMENT_COUNT; i++) {
  trips.push(generateTrip());
}
const sortedTrips = getDateAscendingSortedArray(trips);

const pageHeaderContainer = document.querySelector(`.page-header__container`);
const tripMainContainer = pageHeaderContainer.querySelector(`.trip-main`);
const tripControlElement = pageHeaderContainer.querySelector(`.trip-controls`);
const switchFirstHeader = tripControlElement.querySelector(`h2`);

render(tripMainContainer, new RouteView(), RenderPosition.AFTERBEGIN);
render(switchFirstHeader, new MenuView(), RenderPosition.AFTEREND);
render(tripControlElement, new FilterView(), RenderPosition.BEFOREEND);

const pageMainContainer = document.querySelector(`.page-main`);
const tripEventsSection = pageMainContainer.querySelector(`.trip-events`);

const boardPresenter = new BoardPresenter(tripEventsSection);

boardPresenter.init(sortedTrips);
