import RouteView from "./view/route.js";
import MenuView from "./view/menu.js";
import TripsModel from "./model/points";
import FilterModel from "./model/filter.js";
import {generateTrip} from "./mock/trip.js";
import {getDateAscendingSortedArray} from "./view/utils/common.js";
import {render, RenderPosition} from "./view/utils/trip.js";
import BoardPresenter from "./presenter/tripBoard";
import FilterPresenter from "./presenter/filter.js";

const ELEMENT_COUNT = 15;

const trips = [];

for (let i = 0; i <= ELEMENT_COUNT; i++) {
  trips.push(generateTrip());
}
const sortedTrips = getDateAscendingSortedArray(trips);

const tripsModel = new TripsModel();
tripsModel.setTrips(sortedTrips);
const filterModel = new FilterModel();

const pageHeaderContainer = document.querySelector(`.page-header__container`);
const tripMainContainer = pageHeaderContainer.querySelector(`.trip-main`);
const tripControlElement = pageHeaderContainer.querySelector(`.trip-controls`);
const switchFirstHeader = tripControlElement.querySelector(`h2`);

render(tripMainContainer, new RouteView(), RenderPosition.AFTERBEGIN);
render(switchFirstHeader, new MenuView(), RenderPosition.AFTEREND);

const filterPresenter = new FilterPresenter(tripControlElement, filterModel, tripsModel);

const pageMainContainer = document.querySelector(`.page-main`);
const tripEventsSection = pageMainContainer.querySelector(`.trip-events`);

const boardPresenter = new BoardPresenter(tripEventsSection, tripsModel, filterModel);

filterPresenter.init();

boardPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createEvent();
});
