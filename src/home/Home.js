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
    getISOLocalDateString(new Date()),
  );
  const [dailyStatus, setDailyStatus] = useState({});
  const [data, setData] = useState({});
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (
      localStorage.getItem("dailyStatus") &&
      localStorage.getItem("isLoggedIn")
    ) {
      const dataString = localStorage.getItem("dailyStatus");
      setData(JSON.parse(dataString));
      setDailyStatus(JSON.parse(dataString)[dateString.split("T")[0]]);
      getDailyStateFromDB(() => {
        const dataString = localStorage.getItem("dailyStatus");
        setData(JSON.parse(dataString));
        setDailyStatus(JSON.parse(dataString)[dateString.split("T")[0]]);
      });
    } else {
      const dataString = localStorage.getItem("dailyStatusOfGuest") || "{}";
      setData(JSON.parse(dataString));
      setDailyStatus(JSON.parse(dataString)[dateString.split("T")[0]]);
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
    setDailyStateInDB(dateKey, newState, (dailyStatus) => {
      setDailyStatus(newState);
      setData(dailyStatus);
    });
  }

  return (
    <>
      <ShowDailyVerses
        dateString={dateString}
        dailyStatusData={dailyStatus}
        onDailyStatusUpdate={updateDailyStatusInCalendar}
      />
      <div className="my-10">
        <Calendar
          handleSelection={handleSelection}
          isDailyStatusUpdated={dailyStatus}
          userBibleReadingData={data}
        />
      </div>
    </>
  );
}
