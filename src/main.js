import RouteView from "./view/route.js";
import MenuView from "./view/menu.js";
import StatisticsView from "./view/statistics.js";
import TripsModel from "./model/points";
import FilterModel from "./model/filter.js";
import {generateTrip} from "./mock/trip.js";
import {getDateAscendingSortedArray} from "./view/utils/common.js";
import {render, RenderPosition, remove} from "./view/utils/trip.js";
import BoardPresenter from "./presenter/tripBoard";
import FilterPresenter from "./presenter/filter.js";
import {MenuItem} from "./const.js";

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
const siteTripEvents = document.querySelector(`.trip-events`);
const menuComponent = new MenuView();

render(tripMainContainer, new RouteView(), RenderPosition.AFTERBEGIN);
render(switchFirstHeader, menuComponent, RenderPosition.AFTEREND);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      boardPresenter.destroy();
      remove(statisticsComponent);
      boardPresenter.init();
      menuComponent.setMenuItem(MenuItem.TABLE);
      break;
    case MenuItem.STATISTICS:
      boardPresenter.destroy();
      remove(statisticsComponent);
      statisticsComponent = new StatisticsView(tripsModel.getTrips());
      menuComponent.setMenuItem(MenuItem.STATISTICS);
      render(siteTripEvents, statisticsComponent);
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);
menuComponent.setMenuItem(MenuItem.TABLE);

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
