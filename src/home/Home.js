import { useState, useEffect } from "react";
import ShowDailyVerses from "../dailyVerses/ShowDailyVerses";
import Calendar from "../calendar/Calendar";
import { getISOLocalDateString } from "../utils/utils";
import { auth, database } from "../auth/Auth";
import { onValue, ref } from "firebase/database";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [dateString, setDateString] = useState(
    getISOLocalDateString(new Date())
  );
  const [dailyStatus, setDailyStatus] = useState({});
  const [data, setData] = useState(null);

  useEffect(() => {
    window.addEventListener("userLoggedIn", () => {
      const uid = auth.currentUser.uid;
      const myReadingRef = ref(database, `users/${uid}/my-reading`);

      onValue(myReadingRef, (snapshot) => {
        const data = snapshot.val();
        setData(data);
      });
    });
  }, []);

  function handleSelection({ day, month }) {
    if (day && month) {
      const dateString =
        currentYear +
        "-" +
        month.padStart(2, "0") +
        "-" +
        day.padStart(2, "0") +
        "T00:00:00.000Z";
      setDateString(dateString);
    }
  }

  function updateDailyStatusInCalendar(state) {
    setDailyStatus(state);
  }

  return (
    <>
      <ShowDailyVerses
        dateString={dateString}
        onDailyStatusUpdate={updateDailyStatusInCalendar}
      />
      <Calendar
        handleSelection={handleSelection}
        isDailyStatusUpdated={dailyStatus}
        userBibleReadingData={data}
      />
    </>
  );
}
