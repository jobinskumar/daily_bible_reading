import { useState, useEffect, useContext } from "react";
import ShowDailyVerses from "../dailyVerses/ShowDailyVerses";
import Calendar from "../calendar/Calendar";
import {
  getDailyStateFromDB,
  getISOLocalDateString,
  setDailyStateInDB,
} from "../utils/utils";
import { AuthContext } from "../auth/Auth";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [dateString, setDateString] = useState(
    getISOLocalDateString(new Date())
  );
  const [dailyStatus, setDailyStatus] = useState({});
  const [data, setData] = useState({});
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      getDailyStateFromDB((data) => {
        if (data) {
          setData(data);
          setDailyStatus(data[dateString.split("T")[0]]);
        }
      });
    } else {
      setData({});
      setDailyStatus({});
    }
  }, [isLoggedIn]);

  function handleSelection({ day, month }) {
    if (day && month) {
      const dateString =
        currentYear + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
      setDailyStatus(data[dateString]);
      setDateString(dateString + "T00:00:00.000Z");
    }
  }

  function updateDailyStatusInCalendar(dateKey, newState) {
    // TODO: return updated data and based on that data update calendar
    setDailyStateInDB(dateKey, newState);
    setDailyStatus(newState);
  }

  return (
    <>
      <ShowDailyVerses
        dateString={dateString}
        dailyStatusData={dailyStatus}
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
