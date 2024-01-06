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