export const createTripEventsItemTemplate = (trip) => {
  const {typeRoutPoint, city, price, startTime, finishTime, offers} = trip;
  const MINUTE_IN_DAY = 1440;
  const MINUTE_IN_HOUR = 60;

  const convertTime = (time) => {
    if (time < 10) {
      time = `0` + time;
    }
    return time;
  };

  const getDiffTime = () => {
    const diffMinute = Math.abs((finishTime.getTime() - startTime.getTime()) / 1000 / 60);
    const dayCount = Math.floor(diffMinute / MINUTE_IN_DAY);
    const dayCountRemains = diffMinute % MINUTE_IN_DAY;
    const hourCount = Math.floor(dayCountRemains / MINUTE_IN_HOUR);
    const hourCountRemains = dayCountRemains % MINUTE_IN_HOUR;
    const minuteCount = hourCountRemains;

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

  const diffDate = getDiffTime();
  const startYear = startTime.getFullYear();
  const startMonth = convertTime(startTime.getMonth() + 1);
  const startDay = convertTime(startTime.getDate());
  const startHour = convertTime(startTime.getHours());
  const startMinute = convertTime(startTime.getMinutes());
  const finishYear = startTime.getFullYear();
  const finishMonth = convertTime(startTime.getMonth() + 1);
  const finishDay = convertTime(startTime.getDate());
  const finishHour = convertTime(finishTime.getHours());
  const finishMinute = convertTime(finishTime.getMinutes());
  const nameOffer = offers[0].name;
  const priceOffer = offers[0].price;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeRoutPoint} to ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startYear}-${startMonth}-${startDay}T${startHour}:${startMinute}">${startHour}:${startMinute}</time>
              &mdash;
            <time class="event__end-time" datetime="${finishYear}-${finishMonth}-${finishDay}T${finishHour}:${finishMinute}">${finishHour}:${finishMinute}</time>
          </p>
          <p class="event__duration">${diffDate}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">${nameOffer}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${priceOffer}</span>
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
