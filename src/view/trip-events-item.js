import {convertTime} from "../util.js";

const getDiffTime = (startTime, finishTime) => {
  const MINUTE_IN_DAY = 1440;
  const MINUTE_IN_HOUR = 60;

  const diffMinute = Math.abs((finishTime.getTime() - startTime.getTime())) / 1000 / 60;
  const dayCount = Math.floor(diffMinute / MINUTE_IN_DAY);
  const dayCountRemains = diffMinute % MINUTE_IN_DAY;
  const hourCount = Math.floor(dayCountRemains / MINUTE_IN_HOUR);
  const minuteCount = dayCountRemains % MINUTE_IN_HOUR;

  let diffDate;
  if (dayCount > 1) {
    diffDate = convertTime(dayCount) + `D ` + convertTime(hourCount) + `H ` + convertTime(minuteCount) + `M `;
  } else if (hourCount > 1) {
    diffDate = convertTime(hourCount) + `H ` + convertTime(minuteCount) + `M `;
  } else {
    diffDate = convertTime(minuteCount) + `M `;
  }
  return diffDate;
};

export const createTripEventsItemTemplate = (trip) => {
  const {typeRoutPoint, city, price, startTime, finishTime, offers} = trip;

  const startHour = convertTime(startTime.getHours());
  const startMinute = convertTime(startTime.getMinutes());
  const finishHour = convertTime(finishTime.getHours());
  const finishMinute = convertTime(finishTime.getMinutes());
  let offersName;
  let offersPrice;

  if (offers === null) {
    offersName = ``;
  } else {
    offersName = offers[0].name;
  }

  if (offers === null) {
    offersPrice = ``;
  } else {
    offersPrice = offers[0].price;
  }

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeRoutPoint} to ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startTime.getFullYear()}-${convertTime(startTime.getMonth() + 1)}
            -${convertTime(startTime.getDate())}T${startHour}:${startMinute}">${startHour}:${startMinute}</time>
              &mdash;
            <time class="event__end-time" datetime="${startTime.getFullYear()}-${convertTime(startTime.getMonth() + 1)}
            -${convertTime(startTime.getDate())}T${finishHour}:${finishMinute}">${finishHour}:${finishMinute}</time>
          </p>
          <p class="event__duration">${getDiffTime(startTime, finishTime)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${offersName}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offersPrice}</span>
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
