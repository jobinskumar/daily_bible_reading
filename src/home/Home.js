import { useState, useEffect, useContext } from "react";
import ShowDailyVerses from "../dailyVerses/ShowDailyVerses";
import Calendar from "../calendar/Calendar";
import {
  getDailyStateFromDB,
  getISOLocalDateString,
  setDailyStateInDB,
} from "../utils/utils";
import { AuthContext } from "../auth/Auth";
import AppDailyNote from "../dailyNote/dailyNote";

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [dateString, setDateString] = useState(
    getISOLocalDateString(new Date()),
  );
  const [dailyStatus, setDailyStatus] = useState({});
  const [data, setData] = useState({});
  const { loggedInType } = useContext(AuthContext);

  useEffect(() => {
    if (loggedInType === "USER") {
      const dataFromLocalStorage = localStorage.getItem("dailyStatus");
      if (dataFromLocalStorage) {
        setData(JSON.parse(dataFromLocalStorage));
        setDailyStatus(JSON.parse(dataFromLocalStorage)[dateString.split("T")[0]]);
        return;
      }

      getDailyStateFromDB(() => {
        const dataString = localStorage.getItem("dailyStatus");
        setData(JSON.parse(dataString));
        setDailyStatus(JSON.parse(dataString)[dateString.split("T")[0]]);
      });
    } else if (loggedInType === "GUEST") {
      const dataString = localStorage.getItem("dailyStatusOfGuest") || "{}";
      setData(JSON.parse(dataString));
      setDailyStatus(JSON.parse(dataString)[dateString.split("T")[0]]);
    }
  }, [loggedInType]);

  function handleSelection({ day, month }) {
    if (day && month) {
      const dateString =
        currentYear + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
      setDailyStatus(data[dateString]);
      setDateString(dateString + "T00:00:00.000Z");
    }
  }

  function updateDailyStatusInCalendar(dateKey, newState) {
    setDailyStateInDB(dateKey, newState, (dailyStatusFullData) => {
      setDailyStatus(newState);
      setData(dailyStatusFullData);
    });
  }

  return (
    <div className="flex lg:gap-5 flex-col lg:flex-row justify-center">
      <div className="lg:max-w-[40%] grow">
        <div className="py-5">
          <ShowDailyVerses
            dateString={dateString}
            dailyStatusData={dailyStatus}
            onDailyStatusUpdate={updateDailyStatusInCalendar}
          />
        </div>
        <div className="py-5">
          <Calendar
            handleSelection={handleSelection}
            userBibleReadingData={data}
          />
        </div>
      </div>
      <div className="lg:max-w-[40%] grow">
        <div className="py-5">
          <AppDailyNote
            dateString={dateString}
            dailyStatusData={dailyStatus}
            onDailyStatusUpdate={updateDailyStatusInCalendar}
          />
        </div>
      </div>
    </div>
  );
}
