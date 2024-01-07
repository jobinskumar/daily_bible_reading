export function getDailyStateFromLocalStorage(date) {
  const dailyStatus = JSON.parse(localStorage.getItem('dailyStatus')|| '{}');

  return dailyStatus[date];
}

export function setDailyStateInLocalStorage(date, data) {
  const dailyStatus = JSON.parse(localStorage.getItem('dailyStatus') || '{}');

  dailyStatus[date] = {
    ...dailyStatus[date],
    ...data
  };

  localStorage.setItem('dailyStatus', JSON.stringify(dailyStatus));
}

export function getISOLocalDateString(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dateString =
    year +
    "-" +
    (month + 1).toString().padStart(2, "0") +
    "-" +
    day.toString().padStart(2, "0") +
    "T00:00:00.000Z";

  return dateString;
}
