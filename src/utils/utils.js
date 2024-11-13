import { onValue, ref, set } from "firebase/database";
import { auth, database } from "../auth/Auth";

export function getDailyStateFromLocalStorage(date) {
  const dailyStatus = JSON.parse(localStorage.getItem("dailyStatus") || "{}");

  return dailyStatus[date];
}

export function setDailyStateInLocalStorage(date, data) {
  const dailyStatus = JSON.parse(localStorage.getItem("dailyStatus") || "{}");

  dailyStatus[date] = {
    ...dailyStatus[date],
    ...data,
  };

  localStorage.setItem("dailyStatus", JSON.stringify(dailyStatus));
}

export function getDailyStateFromDB(callback) {
  const uid = auth.currentUser?.uid;

  if (uid) {
    const myReadingRef = ref(database, `users/${uid}/my-reading`);

    const unsubscribe = onValue(myReadingRef, (snapshot) => {
      callback(snapshot.val(), myReadingRef);
      // TODO: move unsubscribe before callback
      unsubscribe();
    });
  }
}

export function setDailyStateInDB(date, data) {
  getDailyStateFromDB((dataFromDB, myReadingRef) => {
    let dailyStatus = dataFromDB;
    if (dailyStatus) {
      dailyStatus[date] = {
        ...dailyStatus[date],
        ...data,
      };
    } else {
      dailyStatus = {};
      dailyStatus[date] = { ...data };
    }
    set(myReadingRef, dailyStatus);
  });
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

// This function will convert date string 2024-02-25T00:00:00.000Z to 25-02-2024
export function formatDateString(dateString) {
  return dateString.split("T")[0].split("-").reverse().join("-");
}
