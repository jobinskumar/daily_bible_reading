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
      // if (!localStorage.getItem("dailyStatus")) {
        localStorage.setItem("dailyStatus", JSON.stringify(snapshot.val()));
      // }
      callback(snapshot.val(), myReadingRef);
      // TODO: move unsubscribe before callback
      unsubscribe();
    });
  }
}

export function setDailyStateInDB(date, data, callback) {
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

    localStorage.setItem("dailyStatus", JSON.stringify(dailyStatus));
    callback();

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

// This function will convert date string 2024-02-25T00:00:00.000Z to Feb 25, 2024
export function formatDateString(dateString) {
  const newDate = new Date(dateString);
  const options = {
    // year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(newDate);
}

export function getDayInWords(dateString) {
  const newDate = new Date(dateString);
  const options = { weekday: "long" };

  return new Intl.DateTimeFormat("en-US", options).format(newDate);
}
